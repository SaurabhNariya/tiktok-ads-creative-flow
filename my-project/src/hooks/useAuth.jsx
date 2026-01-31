import { useState } from 'react';
import { exchangeToken } from '../services/api';

export const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem('tt_token') || null);
    const [authError, setAuthError] = useState(null);

    const login = async (code) => {
        setAuthError(null);
        try {
            const res = await exchangeToken(code);
            const accessToken = res.data.access_token;
            setToken(accessToken);
            localStorage.setItem('tt_token', accessToken); // Persisting token 
        } catch (err) {
            setAuthError(err.response?.data?.error || "Auth Failed");
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('tt_token');
    };

    return { token, authError, login, logout, setAuthError };
};