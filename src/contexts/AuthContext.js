import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const isExpired = isTokenExpired(storedToken);
            if (isExpired) {
                setToken(null);
            } else {
                setToken(storedToken);
            }
        }
    }, []); 


    const isTokenExpired = (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            const expiration = decoded.exp;
            const currentTime = Date.now() / 1000;
            return expiration < currentTime;
        } catch (error) {
            return true;
        }
    };

    const login = (newToken) => {
        setToken(newToken);
        navigate('/'); 
    };

    const logout = () => {
        setToken(null); 
        navigate('/login'); 
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;