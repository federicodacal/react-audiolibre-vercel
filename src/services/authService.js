import axios from 'axios';

const BASE_URL = 'https://admin-audiolibre-api.vercel.app/login';

export const login = async (user) => {
    try {
        const response = await axios.post(BASE_URL, user, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error en el servidor:', error);
        throw error;
    }
};