const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/create', async (req, res) => {
    const { campaignName, objective, adText, musicOption, musicId, token } = req.body;

    // 1. Server-side Validation [cite: 9, 41, 46]
    if (!campaignName || campaignName.length < 3) {
        return res.status(400).json({ error: "Campaign name must be at least 3 characters." });
    }
    if (adText.length > 100) {
        return res.status(400).json({ error: "Ad text exceeds 100 characters." });
    }

    // 2. Conditional Music Logic (Key Requirement) [cite: 51, 67, 68]
    if (musicOption === 'C' && objective === 'Conversions') {
        return res.status(400).json({ error: "Music is mandatory when the objective is set to Conversions." });
    }

    // 3. Mock/Real Submission [cite: 72]
    if (process.env.MOCK_MODE === 'true') {
        // Simulate potential Music ID failure [cite: 57, 77]
        if (musicOption === 'A' && musicId === 'invalid') {
            return res.status(400).json({ error: "The provided Music ID is invalid or rejected by TikTok." });
        }
        return res.json({ success: true, message: "Ad created successfully (Mock Mode)!" });
    }

    try {
        // Real TikTok Ad Creation API call
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/ad/create/', 
        { /* TikTok Payload Structure */ },
        { headers: { "Access-Token": token } });

        res.json(response.data);
    } catch (error) {
        // Handle Token Expiry [cite: 34, 74]
        res.status(error.response?.status || 500).json({ 
            error: error.response?.data?.message || "Failed to submit ad to TikTok." 
        });
    }
});

module.exports = router;