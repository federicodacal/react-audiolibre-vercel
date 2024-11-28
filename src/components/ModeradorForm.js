import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModById, updateModerador, deleteModerador, createMod } from '../services/moderadorService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/ModeradorForm.css';

const ModeradorForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const navigate = useNavigate();
    const [moderador, setModerador] = useState({
        full_name: '',
        email: '',
        pwd: '',
        phone_number: '',
        state: ''
    });

    useEffect(() => {
        if (id) {
            const fetchModerador = async () => {
                try {
                    const data = await getModById(id);
                    setModerador(data);
                } catch (error) {
                    console.error('Error al cargar el moderador:', error);
                }
            };

            fetchModerador();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModerador({ ...moderador, [name]: value });
    };

    const handleUpdate = async () => {
        try {
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

    return (
        <div className="moderador-form-container">
            <div className="back-button" onClick={() => navigate('/moderadores')}>
                <FaArrowLeft /> Volver
            </div>
            <h2>{id ? 'Editar Moderador' : 'Agregar Moderador'}</h2>
            {id && <h4>ID: {id}</h4>} 
            <form>
                <div>
                    <label>Nombre completo:</label>
                    <input type="text" name="full_name" value={moderador.full_name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={moderador.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="pwd" value={moderador.pwd} onChange={handleChange} />
                </div>
                <div>
                    <label>Telefono:</label>
                    <input type="text" name="phone_number" value={moderador.phone_number} onChange={handleChange} />
                </div>
                <div>
                    <label>Estado:</label>
                    <input type="text" name="state" value={moderador.state} onChange={handleChange} />
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

export default ModeradorForm;
