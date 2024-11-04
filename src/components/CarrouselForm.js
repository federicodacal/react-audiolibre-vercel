import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarrouselElementById, updateCarrouselElement, deleteCarrouselElement, createCarrouselElement } from '../services/carrouselService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/CarrouselForm.css';

const CarrouselForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const navigate = useNavigate();
    const [carrousel, setCarrousel] = useState({
        titulo: '',
        orden: '',
        descripcion: '',
        img: null,
    });

    useEffect(() => {
        if (id) {
            const fetchCarrousel = async () => {
                try {
                    const data = await getCarrouselElementById(id);
                    setCarrousel(data);
                } catch (error) {
                    console.error('Error al cargar el elemnto del carrousel:', error);
                }
            };

            fetchCarrousel();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarrousel({ ...carrousel, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setCarrousel({ ...carrousel, img: file });
        } else {
            alert("Por favor, selecciona solo archivos de imagen (jpg, jpeg, png, etc.).");
            e.target.value = ""; // Resetea el input si el archivo no es una imagen
        }
    };

    const handleUpdate = async () => {
        try {
            await updateCarrouselElement(id, carrousel);
            navigate('/carrousel'); // Redirigir a la lista de carrousel
        } catch (error) {
            console.error('Error al actualizar carrousel:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCarrouselElement(id);
            navigate('/carrousel'); // Redirigir a la lista de carrousel
        } catch (error) {
            console.error('Error al eliminar elemento carrousel:', error);
        }
    };

    const handleCreate = async () => {

        if (!carrousel.img) {
            alert("Por favor, selecciona una imagen antes de enviar.");
            return;
        }
        
        try {
            await createCarrouselElement(carrousel);
            navigate('/carrousel'); // Redirigir a la lista de carrousel
        } catch (error) {
            console.error('Error al crear elemento carrousel:', error);
        }
    };


    return (
        <div className="carrousel-form-container">
            <div className="back-button" onClick={() => navigate('/carrousel')}>
                <FaArrowLeft /> Volver
            </div>
            <h2>{id ? 'Editar Elemento Carrousel' : 'Agregar Elemento Carrousel'}</h2>
            {id && <h4>ID: {id}</h4>} 
            <form>
                <div>
                    <label>Titulo</label>
                    <input type="text" name="titulo" value={carrousel.titulo} onChange={handleChange} />
                </div>
                <div>
                    <label>Orden</label>
                    <input type="number" name="orden" value={carrousel.orden} onChange={handleChange} />
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea type="text" name="descripcion" value={carrousel.descripcion} onChange={handleChange} />
                </div>
                <div>
                    <label>Ruta</label>
                    <p>{carrousel.file_id || 'No hay ruta disponible'}</p>
                </div>
                <div>
                    <label>Img:</label>
                    <input type="file" name="img" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="button-container">
                    {id ? (
                        <>
                            <button type="button" className="update-button" onClick={handleUpdate}>
                                Modificar
                            </button>
                            <button type="button" className="delete-button" onClick={handleDelete}>
                                Eliminar
                            </button>
                        </>
                    ) : (
                        <button type="button" className="create-button" onClick={handleCreate}>
                            Agregar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CarrouselForm;
