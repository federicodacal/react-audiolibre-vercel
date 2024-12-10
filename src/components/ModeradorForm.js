import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModById, updateModerador, deleteModerador, createMod, activateModerador } from '../services/moderadorService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/ModeradorForm.css';

const ModeradorForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const isEditing = id && id !== 'nuevo';
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [moderador, setModerador] = useState({
        full_name: '',
        email: '',
        pwd: '',
        phone_number: '',
        username: '',
        personal_ID: '',
        state: ''
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
                        personal_ID: data.user_detail?.personal_ID || '',
                        state: data.state || ''
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


    const validate = () => {
        const newErrors = {};

        if (!moderador.full_name || moderador.full_name === '') newErrors.full_name = "El nombre completo es obligatorio.";
        else if (moderador.full_name.length < 1 || moderador.length > 50)
        newErrors.full_name = "El nombre debe contener entre 1 y 50 caracteres.";

        if (!moderador.email || moderador.email === '') newErrors.email = "El email completo es obligatorio.";
        else if (moderador.email && !/\S+@\S+\.\S+/.test(moderador.email))
        newErrors.email = "El correo electrónico no es válido.";
        else if (moderador.email.length < 1 || moderador.length > 50)
        newErrors.email = "El email debe contener entre 1 y 50 caracteres.";

        if (!moderador.username) newErrors.username = "El nombre de usuario es obligatorio.";
        else if(moderador.username.length > 25) newErrors.username = "El nombre de usuario no puede superar los 25 caracteres";

        if (!moderador.pwd) newErrors.pwd = "La contraseña es obligatoria.";
        else if(moderador.pwd.length < 4) newErrors.pwd = "La clave debe contener mas de 4 caracteres";

        if (!moderador.phone_number) {
            newErrors.phone_number = "El teléfono es obligatorio.";
        } else if (!/^\(?\d{2,5}\)?[-.\d]?\d{4}[-.\d]?\d{4}$/.test(moderador.phone_number)) {
            newErrors.phone_number = "El número de teléfono no es válido. Ejemplos válidos: 11-34254334, (11)34254334";
        }
        if (!moderador.personal_ID) {
            newErrors.personal_ID = "El DNI es obligatorio.";
        } else if (!/^\d{7,11}$/.test(moderador.personal_ID)) { 
            newErrors.personal_ID = "El DNI debe ser un número válido de entre 7 y 11 dígitos.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleUpdate = async () => {
        try {

            if(!validate()) return;

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

    const handleActivate = async () => {
        try {
            await activateModerador(id);
            navigate('/moderadores'); 
        } catch (error) {
            console.error('Error al eliminar el moderador:', error);
        }
    };

    const handleCreate = async () => {
        try {

            if(!validate()) return;

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
                    {errors.full_name && <p className="text-red-500 font-bold">{errors.full_name}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={moderador.email} onChange={handleChange} readOnly={isEditing}/>
                    {errors.email && <p className="text-red-500 font-bold">{errors.email}</p>}
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={moderador.username} onChange={handleChange} />
                    {errors.username && <p className="text-red-500 font-bold">{errors.username}</p>}
                </div>
                <div>
                {!isEditing ? (
                        <>
                    <label>Contraseña:</label>
                    <input type="password" name="pwd" value={moderador.pwd} onChange={handleChange} />
                    {errors.pwd && <p className="text-red-500 font-bold">{errors.pwd}</p>}
                        </>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div>
                    <label>Telefono:</label>
                    <input type="text" name="phone_number" value={moderador.phone_number} onChange={handleChange} />
                    {errors.phone_number && <p className="text-red-500 font-bold">{errors.phone_number}</p>}
                </div>
                <div>
                    <label>DNI:</label>
                    <input type="text" name="personal_ID" value={moderador.personal_ID} onChange={handleChange} />
                    {errors.personal_ID && <p className="text-red-500 font-bold">{errors.personal_ID}</p>}
                </div>
                <div className="button-container">
                    {isEditing ? (
                        <>
                            <button type="button" className="update-button" onClick={handleUpdate}>
                                Modificar
                            </button>
                            {moderador.state === 'created' || moderador.state === 'inactive' ? (
                                <button type="button" className="create-button" onClick={handleActivate}>
                                    Activar
                                </button>
                            ) : moderador.state === 'active' ? (
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

export default ModeradorForm;
