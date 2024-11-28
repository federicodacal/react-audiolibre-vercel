import React, { useEffect, useState } from 'react';
import { getSusbscriptions } from '../services/subscriptionService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Subscriptions.css';

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    // Función para obtener los datos de suscripciones desde la API
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const data = await getSusbscriptions();
                setSubscriptions(data);
            } catch (error) {
                console.error('Error al cargar suscripciones:', error);
            }
        };

        fetchSubscriptions();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/suscripciones/${id}`); // Redirigir al formulario de la suscripción
    };

    const handleAddNewSubscription = () => {
        navigate('/suscripciones/nueva');
    };

    return (
        <div className="subscriptions-container">
            <h2>Suscripciones</h2>
            <button className="add-subscription-btn" onClick={handleAddNewSubscription}>Agregar Nueva Suscripción</button>

            <div className="subscriptions-list">
                {subscriptions.map((subscription) => (
                    <div className="subscription-card" key={subscription._id}>
                        <h5 className="centered-text"><strong>{subscription.titulo.toUpperCase()}</strong></h5>
                        <p><strong>Titulo:</strong> {subscription.titulo}</p>
                        <p><strong>Duración (dias):</strong> {subscription.duracion_dias}</p>
                        <p><strong>Precio $ (costo mensual):</strong> {subscription.precio}</p>
                        <p><strong>Porcentaje Plataforma:</strong> {subscription.porcentaje_plataforma}%</p>
                        <p><strong>Fecha Creación:</strong> {new Date(subscription.fecha_creacion).toLocaleString()}</p>
                        <p><strong>Fecha Modificación:</strong> {new Date(subscription.fecha_modificacion).toLocaleString()}</p>
                        <button className="view-details-btn" onClick={() => handleViewDetails(subscription.id)}>
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
