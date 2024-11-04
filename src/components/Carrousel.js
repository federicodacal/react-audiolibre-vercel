import React, { useEffect, useState } from 'react';
import { getCarrousel } from '../services/carrouselService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Carrousel.css';

const Carrousel = () => {
    const [carrousel, setCarrousel] = useState([]);
    const navigate = useNavigate();

    // Función para obtener los datos de carrousel desde la API
    useEffect(() => {
        const fetchCarrousel = async () => {
            try {
                const data = await getCarrousel();
                setCarrousel(data);
            } catch (error) {
                console.error('Error al cargar carrousel:', error);
            }
        };

        fetchCarrousel();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/carrousel/${id}`); // Redirigir al formulario del elemento carrousel
    };

    const handleAddNewCarrouselElement = () => {
        navigate('/carrousel/nueva');
    };

    return (
        <div className="carrousel-container">
            <h2>Carrousel</h2>
            <button className="add-carrousel-btn" onClick={handleAddNewCarrouselElement}>Agregar Nueva Imagen Carrousel</button>

            <div className="carrousel-list">
                {carrousel.map((carrousel) => (
                    <div className="carrousel-card" key={carrousel._id}>
                        <h5 className="centered-text"><strong>{carrousel.titulo.toUpperCase()}</strong></h5>
                        <p><strong>ID</strong>: {carrousel.id}</p>
                        <p><strong>Título</strong>: {carrousel.titulo}</p>
                        <p><strong>Orden:</strong> {carrousel.orden}</p>
                        <p><strong>Descripción:</strong> {carrousel.descripcion}</p>
                        <p><strong>Ruta:</strong> {carrousel.file_id}</p>
                        <img crossorigin="anonymous" src={carrousel.imgUrl} alt={carrousel.titulo} style={{ width: '100%' }} />
                        <button className="view-details-btn" onClick={() => handleViewDetails(carrousel.id)}>
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carrousel;
