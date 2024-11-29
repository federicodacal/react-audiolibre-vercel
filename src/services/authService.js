import axios from 'axios';

const BASE_URL = 'http://localhost:5000/login';

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