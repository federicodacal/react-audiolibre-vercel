import React, { useEffect, useState } from 'react';
import { getGeneros } from '../services/generoService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Generos.css';

const Generos = () => {
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();

    // Función para obtener los datos de generos desde la API
    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const data = await getGeneros();
                setGeneros(data);
            } catch (error) {
                console.error('Error al cargar generos:', error);
            }
        };

        fetchGeneros();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/generos/${id}`); // Redirigir al formulario de el genero
    };

    const handleAddNewGenero = () => {
        navigate('/generos/nuevo');
    };

    return (
        <div className="genero-container">
            <h2>Generos</h2>
            <button className="add-genero-btn" onClick={handleAddNewGenero}>Agregar Nuevo Genero</button>

            <div className="genero-list">
                {generos.map((genero) => (
                    <div className="genero-card" key={genero._id}>
                        <h5 className="centered-text"><strong>{genero.nombre.toUpperCase()}</strong></h5>
                        <p><strong>Nombre:</strong> {genero.nombre}</p>
                        <p><strong>Fecha Creación:</strong> {new Date(genero.fecha_creacion).toLocaleString()}</p>
                        <p><strong>Fecha Modificación:</strong> {new Date(genero.fecha_modificacion).toLocaleString()}</p>
                        <button className="view-details-btn" onClick={() => handleViewDetails(genero.id)}>
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Generos;
