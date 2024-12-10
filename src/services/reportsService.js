import axios from 'axios';

const BASE_URL = 'https://pps-flask-api.vercel.app/reports';

export const getReportPurchases = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/purchases`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener reporte purchases:', error);
        throw error;
    }
};

export const getReportUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener reporte users:', error);
        throw error;
    }
};

export const getReportAudios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/audios`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener reporte audios:', error);
        throw error;
    }
};

export const getReportCreators = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/creators`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener reporte creators:', error);
        throw error;
    }
};