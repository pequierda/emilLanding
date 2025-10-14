// Vercel API endpoint for visitor count using Upstash Redis
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
        const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!upstashUrl || !upstashToken) {
            return res.status(500).json({ error: 'Upstash configuration missing' });
        }

        // Get referrer from request body
        let referrer = 'Direct';
        let referrerDomain = 'Direct';
        let referrerPath = '';
        
        if (req.method === 'POST' && req.body?.referrer) {
            referrer = req.body.referrer;
            
            // Parse referrer to extract domain and path
            try {
                const url = new URL(referrer);
                referrerDomain = url.hostname.replace('www.', '');
                const fullPath = url.pathname + url.search;
                referrerPath = (fullPath === '/' || fullPath === '') ? 'Homepage' : fullPath;
            } catch (e) {
                referrerDomain = referrer;
            }
        }

        // Get visitor information
        const ip = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection?.remoteAddress || 
                   req.socket?.remoteAddress ||
                   'unknown';
        
        const userAgent = req.headers['user-agent'] || 'unknown';
        const timestamp = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        // Extract device info from user agent
        const deviceInfo = {
            browser: getBrowserName(userAgent),
            os: getOSName(userAgent),
            device: getDeviceType(userAgent),
            userAgent: userAgent
        };

        // Increment visitor count
        const countResponse = await fetch(`${upstashUrl}/incr/visitor_count`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${upstashToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!countResponse.ok) {
            throw new Error(`Upstash API error: ${countResponse.status}`);
        }

        const countData = await countResponse.json();
        const count = countData.result || 0;

        // Store visitor details
        const visitorData = {
            ip: ip.split(',')[0].trim(),
            device: deviceInfo,
            timestamp: timestamp,
            count: count,
            referrer: referrer,
            referrerDomain: referrerDomain,
            referrerPath: referrerPath
        };

        // Store visitor info in Redis (optional - for analytics)
        await fetch(`${upstashUrl}/lpush/visitors`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${upstashToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(visitorData)
        });

        res.status(200).json({ 
            count,
            visitor: {
                ip: visitorData.ip,
                device: deviceInfo.device,
                browser: deviceInfo.browser,
                os: deviceInfo.os,
                referrer: referrer,
                referrerDomain: referrerDomain,
                referrerPath: referrerPath
            }
        });
    } catch (error) {
        console.error('Visitor count error:', error);
        res.status(500).json({ error: 'Failed to update visitor count' });
    }
}

// Helper functions to parse user agent
function getBrowserName(userAgent) {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
}

function getOSName(userAgent) {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
}

function getDeviceType(userAgent) {
    if (userAgent.includes('Mobile') || userAgent.includes('Android')) return 'Mobile';
    if (userAgent.includes('Tablet') || userAgent.includes('iPad')) return 'Tablet';
    return 'Desktop';
}
