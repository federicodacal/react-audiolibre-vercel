import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/Subscriptions.css';

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    // Función para obtener los datos de suscripciones desde la API
    useEffect(() => {
        fetch('http://localhost:5000/api/suscripciones')
            .then(response => response.json())
            .then(data => setSubscriptions(data))
            .catch(error => console.error('Error fetching subscriptions:', error));
    }, []);

    return (
        <div className="subscriptions-container">
            <h2>Suscripciones</h2>
            <button className="add-subscription-btn">Agregar Nueva Suscripción</button>

            <div className="subscriptions-list">
                {subscriptions.map((subscription) => (
                    <div className="subscription-card" key={subscription._id}>
                        <h5 className="centered-text"><strong>{subscription.tipo.toUpperCase()}</strong></h5>
                        <p><strong>ID</strong>: {subscription.id}</p>
                        <p><strong>Tipo:</strong> {subscription.tipo}</p>
                        <p><strong>Duración (meses):</strong> {subscription.duracion_meses}</p>
                        <p><strong>Porcentaje Plataforma:</strong> {subscription.porcentaje_plataforma}%</p>
                        <p><strong>Fecha Creación:</strong> {new Date(subscription.fecha_creacion).toLocaleString()}</p>
                        <p><strong>Fecha Modificación:</strong> {new Date(subscription.fecha_modificacion).toLocaleString()}</p>
                        <button className="view-details-btn">
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
