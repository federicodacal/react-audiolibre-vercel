import React, { useEffect, useState } from 'react';
import { getModeradores } from '../services/moderadorService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Moderador.css';

const Moderadores = () => {
    const [moderadores, setModeradores] = useState([]);
    const navigate = useNavigate();

    // Función para obtener los datos de suscripciones desde la API
    useEffect(() => {
        const fetchModeradores = async () => {
            try {
                const data = await getModeradores();
                setModeradores(data);
            } catch (error) {
                console.error('Error al cargar moderadores:', error);
            }
        };

        fetchModeradores();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/moderadores/${id}`); // Redirigir al formulario del moderador
    };

    const handleAddNewModerador = () => {
        navigate('/moderadores/nuevo');
    };

    return (
        <div className="moderador-container">
            <h2>Moderadores</h2>
            <button className="add-moderador-btn" onClick={handleAddNewModerador}>Agregar Nuevo Moderador</button>

            <div className="moderador-list">
                {moderadores.map((moderador) => (
                    <div className="moderador-card" key={moderador._id}>
                        <h5 className="centered-text"><strong>{moderador.full_name.toUpperCase()}</strong></h5>
                        <p><strong>Nombre completo:</strong> {moderador.full_name}</p>
                        <p><strong>Email:</strong> {moderador.email}</p>
                        <p><strong>Telefono:</strong> {moderador.phone_number}</p>
                        <p><strong>Estado:</strong> {moderador.state}</p>
                        <p><strong>Fecha Creación:</strong> {new Date(moderador.fecha_creacion).toLocaleString()}</p>
                        <p><strong>Fecha Modificación:</strong> {new Date(moderador.fecha_modificacion).toLocaleString()}</p>
                        <button className="view-details-btn" onClick={() => handleViewDetails(moderador.id)}>
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Moderadores;
