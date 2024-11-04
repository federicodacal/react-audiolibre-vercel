import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/carrousel';

export const getCarrousel = async () => {
    try {
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el carrousel:', error);
        throw error;
    }
};

export const getCarrouselElementById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        console.log('Get by id:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el elemento del carrousel:', error);
        throw error;
    }
};

export const createCarrouselElement = async (carrouselElement) => {
    try {
        const formData = new FormData();
        formData.append("img", carrouselElement.img); // Archivo de imagen
        formData.append("titulo", carrouselElement.titulo);
        formData.append("orden", carrouselElement.orden);
        formData.append("descripcion", carrouselElement.descripcion);

        console.log(carrouselElement.img);

        const response = await axios.post(BASE_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }
    catch (error) {
        console.error('Error al agregar el elemento al carrousel:', error);
        throw error;
    }
};

export const updateCarrouselElement = async (id, carrouselElement) => {
    try {
        const response = await axios.put(`${BASE_URL}/modificar/${id}`, carrouselElement);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar el elemento del carrousel:', error);
        throw error;
    }
};

export const deleteCarrouselElement = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/eliminar/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar el elemento del carrousel:', error);
        throw error;
    }
};
