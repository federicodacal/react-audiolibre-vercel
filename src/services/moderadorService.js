import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/moderadores';

export const getModeradores = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los moderadores:', error);
        throw error;
    }
};

export const getModById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el moderador:', error);
        throw error;
    }
};

export const createMod = async (moderador) => {
    try {
        const response = await axios.post(BASE_URL, moderador);
        return response.data;
    }
    catch (error) {
        console.error('Error al agregar la suscripcion:', error);
        throw error;
    }
};

export const updateModerador = async (id, moderador) => {
    try {
        const response = await axios.put(`${BASE_URL}/modificar/${id}`, moderador);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar moderador:', error);
        throw error;
    }
};

export const deleteModerador = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/eliminar/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar moderador:', error);
        throw error;
    }
};