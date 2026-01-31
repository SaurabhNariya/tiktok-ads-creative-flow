const axios = require('axios');

exports.handleTokenExchange = async (req, res) => {
    const { code } = req.body;

    // 1. Requirement: Handle missing credentials/code [cite: 32]
    if (!code) {
        return res.status(400).json({ error: "Invalid client ID / secret or missing authorization code." });
    }

    // 2. Mock Mode for India-based Development
    if (process.env.MOCK_MODE === 'true') {
        return res.json({
            access_token: "premium_mock_token_12345",
            expires_in: 3600,
            scope: "ads.manage",
            status: "success"
        });
    }

    // 3. Real TikTok API Call [cite: 27]
    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/', {
            client_id: process.env.TIKTOK_CLIENT_ID,
            client_secret: process.env.TIKTOK_CLIENT_SECRET,
            code: code,
            grant_type: "authorization_code"
        });

        if (response.data.code !== 0) throw new Error(response.data.message);
        res.json(response.data.data);
    } catch (error) {
        // Requirement: Handle Geo-restriction (403) [cite: 35, 78]
        const status = error.response?.status || 500;
        const message = status === 403 
            ? "Geo-restriction: This API is not available in your region." 
            : "OAuth Error: " + (error.response?.data?.message || "Failed to exchange token");
        
        res.status(status).json({ error: message });
    }
};