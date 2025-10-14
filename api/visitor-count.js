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

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
        const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!upstashUrl || !upstashToken) {
            return res.status(500).json({ error: 'Upstash configuration missing' });
        }

        // Increment visitor count in Upstash Redis
        const response = await fetch(`${upstashUrl}/incr/visitor_count`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${upstashToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Upstash API error: ${response.status}`);
        }

        const data = await response.json();
        const count = data.result || 0;

        res.status(200).json({ count });
    } catch (error) {
        console.error('Visitor count error:', error);
        res.status(500).json({ error: 'Failed to update visitor count' });
    }
}
