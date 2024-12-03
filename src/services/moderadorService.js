import axios from 'axios';

//const BASE_URL = 'http://localhost:5000/api/moderadores';
const BASE_URL = 'https://pps-flask-api.vercel.app/users';

export const getModeradores = async () => {
    try {
        const response = await axios.get(BASE_URL);
        const mods = response.data.filter(user => user.type === 'mod');
        console.log(mods);
        return mods;
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
        moderador.type = "mod";
        const response = await axios.post(BASE_URL, moderador);
        return response.data;
    }
    catch (error) {
        console.error('Error al agregar el moderador:', error);
        throw error;
    }
};

export const updateModerador = async (id, moderador) => {
    try {
        moderador.type = "mod";
        const response = await axios.put(`${BASE_URL}/${id}`, moderador);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar moderador:', error);
        throw error;
    }
};

export const deleteModerador = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/approval/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar moderador:', error);
        throw error;
    }
};

export const activateModerador = async (id) => {
    try {
        const response = await axios.post(`${BASE_URL}/approval/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar moderador:', error);
        throw error;
    }
};