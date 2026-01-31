import axios from 'axios';

// Backend URL - Make sure your backend server is running on this port
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 1. OAuth: Exchange Auth Code for Access Token
 * Assignment Requirement: Handle token exchange logic [cite: 27]
 */
export const exchangeToken = async (code) => {
    return await api.post('/auth/exchange', { code });
};

/**
 * 2. Ads: Create a New Ad
 * Assignment Requirement: Call TikTok Ads API or mocked equivalent [cite: 72]
 */
export const createAd = async (adData) => {
    return await api.post('/ads/create', adData);
};

/**
 * 3. Optional: Validate Music ID
 * Assignment Requirement: Support Existing Music ID validation [cite: 56]
 */
export const validateMusic = async (musicId) => {
    return await api.get(`/ads/validate-music/${musicId}`);
};

export default api;``