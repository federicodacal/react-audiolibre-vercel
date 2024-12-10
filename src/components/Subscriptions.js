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
                        <h5 className="centered-text"><strong>{subscription.type.toUpperCase()}</strong></h5>
                        <p><strong>Titulo:</strong> {subscription.type}</p>
                        <p><strong>Duración (dias):</strong> {subscription.renewal_time_in_days}</p>
                        <p><strong>Precio $ (costo mensual):</strong> {subscription.monthly_price}</p>
                        <p><strong>Porcentaje Plataforma:</strong> {subscription.revenue_percentage}%</p>
                        <p><strong>Estado:</strong> {subscription.state}</p>
                        <p><strong>Fecha Creación:</strong> {new Date(subscription.created_at).toLocaleString()}</p>
                        <p><strong>Fecha Modificación:</strong> {new Date(subscription.modified_at).toLocaleString()}</p>
                        <button className="view-details-btn" onClick={() => handleViewDetails(subscription.ID)}>
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
