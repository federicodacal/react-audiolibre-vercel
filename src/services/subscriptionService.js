import axios from 'axios';

const BASE_URL = 'https://pps-flask-api.vercel.app/subscriptions';

export const getSusbscriptions = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las suscripciones:', error);
        throw error;
    }
};

export const getSubscriptionById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la suscripcion:', error);
        throw error;
    }
};

export const createSubscription = async (subscription) => {
    try {
        const response = await axios.post(BASE_URL, subscription);
        return response.data;
    }
    catch (error) {
        console.error('Error al agregar la suscripcion:', error);
        throw error;
    }
};

export const updateSubscription = async (id, subscription) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, subscription);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar la suscripción:', error);
        throw error;
    }
};

export const deleteSuscripcion = async (id) => {
    try {
        const response = await axios.put(`${BASE_URL}/inactive/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al desactivar suscripcion:', error);
        throw error;
    }
};

export const activateSuscripcion = async (id) => {
    try {
        const response = await axios.put(`${BASE_URL}/active/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al activar suscripcion:', error);
        throw error;
    }
};