import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubscriptionById, updateSubscription, deleteSubscription, createSubscription } from '../services/subscriptionService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/SubscriptionForm.css';

const SubscriptionForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState({
        tipo: '',
        duracion_meses: '',
        precio: '',
        porcentaje_plataforma: '',
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

    const handleDelete = async () => {
        try {
            await deleteSubscription(id);
            navigate('/suscripciones'); // Redirigir a la lista de suscripciones
        } catch (error) {
            console.error('Error al eliminar la suscripción:', error);
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
            {id && <h4>ID: {id}</h4>} 
            <form>
                <div>
                    <label>Tipo</label>
                    <input type="text" name="tipo" value={subscription.tipo} onChange={handleChange} />
                </div>
                <div>
                    <label>Duración (meses)</label>
                    <input type="number" name="duracion_meses" value={subscription.duracion_meses} onChange={handleChange} />
                </div>
                <div>
                    <label>Precio $</label>
                    <input type="number" name="precio" value={subscription.precio} onChange={handleChange} />
                </div>
                <div>
                    <label>Porcentaje Plataforma</label>
                    <input type="number" name="porcentaje_plataforma" value={subscription.porcentaje_plataforma} onChange={handleChange} />
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

export default SubscriptionForm;
