import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/suscripciones';

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
        console.error('Error al obtener las suscripciones:', error);
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
        const response = await axios.put(`${BASE_URL}/modificar/${id}`, subscription);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar la suscripción:', error);
        throw error;
    }
};

export const deleteSubscription = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/eliminar/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar la suscripción:', error);
        throw error;
    }
};