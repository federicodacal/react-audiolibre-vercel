import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubscriptionById, updateSubscription, activateSuscripcion, deleteSuscripcion, createSubscription } from '../services/subscriptionService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/SubscriptionForm.css';

const SubscriptionForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const isEditing = id && id !== 'nuevo';
    const [errors, setErrors] = useState({});
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

    const validate = () => {
        const newErrors = {};

        if (!subscription.type || subscription.type === '') {
            newErrors.type = "El título es obligatorio.";
        } else if (subscription.type.length < 1 || subscription.type.length > 20) {
            newErrors.type = "El título debe contener entre 1 y 20 caracteres.";
        }

        if (!subscription.renewal_time_in_days || subscription.renewal_time_in_days <= 0) {
            newErrors.renewal_time_in_days = "La duración debe ser un número mayor a 0.";
        }
 
        if (!subscription.monthly_price || subscription.monthly_price <= 0) {
            newErrors.monthly_price = "El precio debe ser un número mayor a 0.";
        }

        if (!subscription.revenue_percentage || subscription.revenue_percentage < 0 || subscription.revenue_percentage > 100) {
            newErrors.revenue_percentage = "El porcentaje debe estar entre 0 y 100.";
        }

        console.log(newErrors); 
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        try {

            if(!validate()) return;

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

            if(!validate()) return;

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
                    {errors.type && <p className="text-red-500 font-bold">{errors.type}</p>}
                </div>
                <div>
                    <label>Duración (dias)</label>
                    <input type="number" name="renewal_time_in_days" value={subscription.renewal_time_in_days} onChange={handleChange} />
                    {errors.renewal_time_in_days && <p className="text-red-500 font-bold">{errors.renewal_time_in_days}</p>}
                </div>
                <div>
                    <label>Precio $ (costo mensual)</label>
                    <input type="number" name="monthly_price" value={subscription.monthly_price} onChange={handleChange} />
                    {errors.monthly_price && <p className="text-red-500 font-bold">{errors.monthly_price}</p>}
                </div>
                <div>
                    <label>Porcentaje Creador</label>
                    <input type="number" name="revenue_percentage" value={subscription.revenue_percentage} onChange={handleChange} />
                    {errors.revenue_percentage && <p className="text-red-500 font-bold">{errors.revenue_percentage}</p>}
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
