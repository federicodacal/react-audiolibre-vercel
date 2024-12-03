import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModById, updateModerador, deleteModerador, createMod } from '../services/moderadorService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/ModeradorForm.css';

const ModeradorForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const isEditing = id && id !== 'nuevo';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [moderador, setModerador] = useState({
        full_name: '',
        email: '',
        pwd: '',
        phone_number: '',
        username: '',
        personal_ID: ''
    });

    useEffect(() => {
        if (id) {
            const fetchModerador = async () => {
                try {
                    const data = await getModById(id);
                    setModerador({
                        full_name: data.user_detail?.full_name || '',
                        email: data.email || '',
                        pwd: data.pwd || '',
                        phone_number: data.user_detail?.phone_number || '',
                        username: data.user_detail?.username || '',
                        personal_ID: data.user_detail?.personal_ID || ''
                    });
                    setLoading(false);
                } catch (error) {
                    console.error('Error al cargar el moderador:', error);
                    setLoading(false);
                }
            };

            fetchModerador();
        }
        else {
            setLoading(false); 
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModerador({ ...moderador, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            console.log('mod update ', moderador);
            await updateModerador(id, moderador);
            navigate('/moderadores'); 
        } catch (error) {
            console.error('Error al actualizar el moderador:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteModerador(id);
            navigate('/moderadores'); 
        } catch (error) {
            console.error('Error al eliminar el moderador:', error);
        }
    };

    const handleCreate = async () => {
        try {
            await createMod(moderador);
            navigate('/moderadores'); 
        } catch (error) {
            console.error('Error al crear el moderador:', error);
        }
    };

    if (isEditing && loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="moderador-form-container">
            <div className="back-button" onClick={() => navigate('/moderadores')}>
                <FaArrowLeft /> Volver
            </div>
            <h2>{isEditing ? 'Editar Moderador' : 'Agregar Moderador'}</h2>
            {isEditing && <h4>{moderador.full_name}</h4>} 
            <form>
                <div>
                    <label>Nombre completo:</label>
                    <input type="text" name="full_name" value={moderador.full_name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={moderador.email} onChange={handleChange} readOnly={isEditing}/>
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={moderador.username} onChange={handleChange} />
                </div>
                <div>
                {!isEditing ? (
                        <>
                    <label>Contraseña:</label>
                    <input type="password" name="pwd" value={moderador.pwd} onChange={handleChange} />
                        </>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div>
                    <label>Telefono:</label>
                    <input type="text" name="phone_number" value={moderador.phone_number} onChange={handleChange} />
                </div>
                <div>
                    <label>DNI:</label>
                    <input type="text" name="personal_ID" value={moderador.personal_ID} onChange={handleChange} />
                </div>
                <div className="button-container">
                    {isEditing ? (
                        <>
                            <button type="button" className="update-button" onClick={handleUpdate}>
                                Modificar
                            </button>
                            {/*
                                <button type="button" className="delete-button" onClick={handleDelete}>
                                    Eliminar
                                </button>
                                */
                            }
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

export default ModeradorForm;
