const express = require('express');
const router = express.Router();
const axios = require('axios'); // Axios install kr lena: npm install axios

router.post('/exchange', async (req, res) => {
    const { code } = req.body;

    // 1. Basic Validation [cite: 31, 32]
    if (!code) {
        return res.status(400).json({ error: "Invalid request: Authorization code is missing." });
    }

    // 2. Mock Mode for India Testing [cite: 89]
    if (process.env.MOCK_MODE === 'true') {
        return res.json({ 
            access_token: "premium_mock_token_xyz123", 
            scope: "ads.manage", 
            expires_in: 3600 
        });
    }

    // 3. Real TikTok API Integration [cite: 21, 27]
    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/', {
            client_id: process.env.TIKTOK_CLIENT_ID,
            client_secret: process.env.TIKTOK_CLIENT_SECRET,
            code: code,
            grant_type: "authorization_code"
        });

        // TikTok returns data in 'data' object
        if (response.data.code !== 0) {
            throw new Error(response.data.message);
        }

        res.json(response.data.data);
    } catch (error) {
        // Handle Geo-restriction or Invalid credentials [cite: 35, 78]
        const status = error.response?.status || 500;
        const message = status === 403 
            ? "Geo-restriction: TikTok Ads API is not available in your region." 
            : "Failed to connect with TikTok: " + (error.response?.data?.message || error.message);
        
        res.status(status).json({ error: message });
    }
});

module.exports = router;