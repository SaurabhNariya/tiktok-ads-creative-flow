import { useState } from 'react';
import { createAd } from '../services/api';

export const useAds = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // useAds.jsx - Updated version
const submitAd = async (formData, token) => {
    setLoading(true);
    
    try {
        const response = await createAd({ ...formData, token });
        setSuccess(true);
        
        // ✅ Ads save karo localStorage mein
        const savedAds = JSON.parse(localStorage.getItem('my_ads') || '[]');
        savedAds.push({
            ...formData,
            id: Date.now(),
            createdAt: new Date().toLocaleString()
        });
        localStorage.setItem('my_ads', JSON.stringify(savedAds));
        
        return response.data;
    } catch (err) {
        const errorMsg = err.response?.data?.error || "Failed to submit ad. Please try again.";
        setError(errorMsg);
        throw err;
    } finally {
        setLoading(false);
    }
};
  return { submitAd, loading, error, success, setError };
};