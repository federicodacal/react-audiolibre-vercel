import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGeneroById, updateGenero, deleteGenero, createGenero } from '../services/generoService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/GeneroForm.css';

const GeneroForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const isEditing = id && id !== 'nueva';
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [genero, setGenero] = useState({
        nombre: ''
    });

    useEffect(() => {
        if (isEditing) {
            const fetchGenero = async () => {
                try {
                    const data = await getGeneroById(id);
                    setGenero(data);
                } catch (error) {
                    console.error('Error al cargar genero:', error);
                }
            };

            fetchGenero();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenero({ ...genero, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        if (!genero.nombre || genero.nombre === '') newErrors.nombre = "El genero es obligatorio.";
        else if (genero.nombre.length < 1 || genero.length > 15)
        newErrors.nombre = "El genero debe contener entre 1 y 15 caracteres.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleUpdate = async () => {
        try {
            if(!validate()) return;

            await updateGenero(id, genero);
            navigate('/generos'); 
        } catch (error) {
            console.error('Error al actualizar el genero:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteGenero(id);
            navigate('/generos'); 
        } catch (error) {
            console.error('Error al eliminar el genero:', error);
        }
    };

    const handleCreate = async () => {
        try {

            if(!validate()) return
            
            await createGenero(genero);
            navigate('/generos'); 
        } catch (error) {
            console.error('Error al crear el genero:', error);
        }
    };

    return (
        <div className="genero-form-container">
            <div className="back-button" onClick={() => navigate('/generos')}>
                <FaArrowLeft /> Volver
            </div>
            <h2>{isEditing ? 'Editar Genero' : 'Agregar Genero'}</h2>
            {isEditing && <h4>{genero.nombre}</h4>} {/* Mostrar ID solo cuando esté editando */}
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={genero.nombre} onChange={handleChange} />
                    {errors.nombre && <p className="text-red-500 font-bold">{errors.nombre}</p>}
                </div>
                <div className="button-container">
                    {isEditing ? (
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

export default GeneroForm;
