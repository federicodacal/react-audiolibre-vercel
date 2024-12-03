import React, { useEffect, useState } from 'react';
import { getModeradores } from '../services/moderadorService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Moderador.css';

const Moderadores = () => {
    const [moderadores, setModeradores] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModeradores = async () => {
            try {
                const data = await getModeradores();
                setModeradores(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar moderadores:', error);
                setLoading(false);
            }
        };
        
        fetchModeradores();
        setLoading(false);
    }, []);

    const handleViewDetails = (ID) => {
        navigate(`/moderadores/${ID}`); // Redirigir al formulario del moderador
    };

    const handleAddNewModerador = () => {
        navigate('/moderadores/nuevo');
    };

    if(loading) {
        <p>Cargando...</p>
    }

    return (
        <div className="moderador-container">
            <h2>Moderadores</h2>
            <button className="add-moderador-btn" onClick={handleAddNewModerador}>Agregar Nuevo Moderador</button>

            <div className="moderador-list">
                {moderadores.map((moderador) => (
                    <div className="moderador-card" key={moderador.ID}>
                        <h5 className="centered-text"><strong>{moderador.user_detail.full_name}</strong></h5>
                        <p><strong>Nombre completo:</strong> {moderador.user_detail.full_name}</p>
                        <p><strong>Email:</strong> {moderador.email}</p>
                        <p><strong>Telefono:</strong> {moderador.user_detail.phone_number}</p>
                        <p><strong>DNI:</strong> {moderador.user_detail.personal_ID}</p>
                        <p><strong>Estado:</strong> {moderador.state}</p>
                        <p><strong>Fecha Creación:</strong> {new Date(moderador.created_at).toLocaleString()}</p>
                        <p><strong>Fecha Modificación:</strong> {new Date(moderador.modified_at).toLocaleString()}</p>
                        <button className="view-details-btn" onClick={() => handleViewDetails(moderador.ID)}>
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Moderadores;
