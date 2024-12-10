import axios from 'axios';

const BASE_URL = 'https://pps-flask-api.vercel.app/categories';

export const getCategorias = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
        throw error;
    }
};

export const getCategoriaById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la categoria:', error);
        throw error;
    }
};

export const createCategoria = async (categoria) => {
    try {
        console.log('response: ')
        const response = await axios.post(BASE_URL, categoria);
        return response.data;
    }
    catch (error) {
        console.error('Error al agregar la categoria:', error);
        throw error;
    }
};

export const updateCategoria = async (id, categoria) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, categoria);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        throw error;
    }
};

export const deleteCategoria = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        throw error;
    }
};