import axios from 'axios';

const BASE_URL = 'https://pps-flask-api.vercel.app/genres';

export const getGeneros = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los generos:', error);
        throw error;
    }
};

export const getGeneroById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el genero:', error);
        throw error;
    }
};

export const createGenero = async (genero) => {
    try {
        const response = await axios.post(BASE_URL, genero);
        return response.data;
    }
    catch (error) {
        console.error('Error al agregar el genero:', error);
        throw error;
    }
};

export const updateGenero = async (id, genero) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, genero);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar el genero:', error);
        throw error;
    }
};

export const deleteGenero = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar el genero:', error);
        throw error;
    }
};