// API endpoint to retrieve visitor analytics from Upstash Redis
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
        const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!upstashUrl || !upstashToken) {
            return res.status(500).json({ error: 'Upstash configuration missing' });
        }

        // Get visitor count
        const countResponse = await fetch(`${upstashUrl}/get/visitor_count`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${upstashToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Get recent visitors (last 50)
        const visitorsResponse = await fetch(`${upstashUrl}/lrange/visitors/0/49`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${upstashToken}`,
                'Content-Type': 'application/json'
            }
        });

        const countData = await countResponse.json();
        const visitorsData = await visitorsResponse.json();

        const totalCount = countData.result || 0;
        const visitors = visitorsData.result || [];

        // Parse and analyze visitor data
        const analytics = {
            totalVisitors: totalCount,
            recentVisitors: visitors.map(v => {
                try {
                    return typeof v === 'string' ? JSON.parse(v) : v;
                } catch {
                    return v;
                }
            }),
            deviceStats: getDeviceStats(visitors),
            browserStats: getBrowserStats(visitors),
            osStats: getOSStats(visitors)
        };

        res.status(200).json(analytics);
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to retrieve analytics' });
    }
}

function getDeviceStats(visitors) {
    const stats = {};
    visitors.forEach(visitor => {
        try {
            const data = typeof visitor === 'string' ? JSON.parse(visitor) : visitor;
            const device = data.device?.device || 'Unknown';
            stats[device] = (stats[device] || 0) + 1;
        } catch (e) {
            // Skip invalid entries
        }
    });
    return stats;
}

function getBrowserStats(visitors) {
    const stats = {};
    visitors.forEach(visitor => {
        try {
            const data = typeof visitor === 'string' ? JSON.parse(visitor) : visitor;
            const browser = data.device?.browser || 'Unknown';
            stats[browser] = (stats[browser] || 0) + 1;
        } catch (e) {
            // Skip invalid entries
        }
    });
    return stats;
}

function getOSStats(visitors) {
    const stats = {};
    visitors.forEach(visitor => {
        try {
            const data = typeof visitor === 'string' ? JSON.parse(visitor) : visitor;
            const os = data.device?.os || 'Unknown';
            stats[os] = (stats[os] || 0) + 1;
        } catch (e) {
            // Skip invalid entries
        }
    });
    return stats;
}
