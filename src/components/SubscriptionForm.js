import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubscriptionById, updateSubscription, activateSuscripcion, deleteSuscripcion, createSubscription } from '../services/subscriptionService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/SubscriptionForm.css';

const SubscriptionForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const isEditing = id && id !== 'nuevo';
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState({
        titulo: '',
        duracion_dias: '',
        precio: '',
        porcentaje_plataforma: ''
    });

    useEffect(() => {
        if (id) {
            const fetchSubscription = async () => {
                try {
                    const data = await getSubscriptionById(id);
                    setSubscription(data);
                } catch (error) {
                    console.error('Error al cargar la suscripción:', error);
                }
            };

            fetchSubscription();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubscription({ ...subscription, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await updateSubscription(id, subscription);
            navigate('/suscripciones'); // Redirigir a la lista de suscripciones
        } catch (error) {
            console.error('Error al actualizar la suscripción:', error);
        }
    };

    const handleActivate = async () => {
        try {
            await activateSuscripcion(id);
            navigate('/suscripciones'); 
        } catch (error) {
            console.error('Error al eliminar el suscripcion:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteSuscripcion(id);
            navigate('/suscripciones'); 
        } catch (error) {
            console.error('Error al eliminar el suscripcion:', error);
        }
    };

    const handleCreate = async () => {
        try {
            await createSubscription(subscription);
            navigate('/suscripciones'); // Redirigir a la lista de suscripciones
        } catch (error) {
            console.error('Error al crear la suscripción:', error);
        }
    };

    return (
        <div className="subscription-form-container">
            <div className="back-button" onClick={() => navigate('/suscripciones')}>
                <FaArrowLeft /> Volver
            </div>
            <h2>{id ? 'Editar Suscripción' : 'Agregar Suscripción'}</h2>
            {id && <h4>{subscription.type}</h4>} 
            <form>
                <div>
                    <label>Titulo</label>
                    <input type="text" name="type" value={subscription.type} onChange={handleChange} />
                </div>
                <div>
                    <label>Duración (dias)</label>
                    <input type="number" name="renewal_time_in_days" value={subscription.renewal_time_in_days} onChange={handleChange} />
                </div>
                <div>
                    <label>Precio $ (costo mensual)</label>
                    <input type="number" name="monthly_price" value={subscription.monthly_price} onChange={handleChange} />
                </div>
                <div>
                    <label>Porcentaje Plataforma</label>
                    <input type="number" name="revenue_percentage" value={subscription.revenue_percentage} onChange={handleChange} />
                </div>
                <div className="button-container">
                    {isEditing ? (
                        <>
                            <button type="button" className="update-button" onClick={handleUpdate}>
                                Modificar
                            </button>
                            {subscription.state === 'created' || subscription.state === 'inactive' ? (
                                <button type="button" className="create-button" onClick={handleActivate}>
                                    Activar
                                </button>
                            ) : subscription.state === 'active' ? (
                                <button type="button" className="delete-button" onClick={handleDelete}>
                                    Desactivar
                                </button>
                            ) : null}
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

export default SubscriptionForm;
