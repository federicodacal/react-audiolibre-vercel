import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoriaById, updateCategoria, deleteCategoria, createCategoria } from '../services/categoriaService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/CategoriaForm.css';

const CategoriaForm = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const isEditing = id && id !== 'nueva';
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        nombre: ''
    });

    useEffect(() => {
        if (id) {
            const fetchCategoria = async () => {
                try {
                    const data = await getCategoriaById(id);
                    setCategoria(data);
                } catch (error) {
                    console.error('Error al cargar la categoria:', error);
                }
            };

            fetchCategoria();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({ ...categoria, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        if (!categoria.nombre || categoria.nombre === '') newErrors.nombre = "El categoria es obligatoria.";
        else if (categoria.nombre.length < 1 || categoria.length > 15)
        newErrors.nombre = "La categoria debe contener entre 1 y 15 caracteres.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleUpdate = async () => {
        try {
            if(!validate()) return;

            await updateCategoria(id, categoria);
            navigate('/categorias'); 
        } catch (error) {
            console.error('Error al actualizar la categoria:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCategoria(id);
            navigate('/categorias'); 
        } catch (error) {
            console.error('Error al eliminar la categoria:', error);
        }
    };

    const handleCreate = async () => {
        try {
            if(!validate()) return;

            await createCategoria(categoria);
            navigate('/categorias'); 
        } catch (error) {
            console.error('Error al crear la categoria:', error);
        }
    };

    return (
        <div className="categoria-form-container">
            <div className="back-button" onClick={() => navigate('/categorias')}>
                <FaArrowLeft /> Volver
            </div>
            <h2>{id ? 'Editar Categoria' : 'Agregar Categoria'}</h2>
            {id && <h4>{categoria.nombre}</h4>} 
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={categoria.nombre} onChange={handleChange} />
                    {errors.nombre && <p className="text-red-500 font-bold">{errors.nombre}</p>}
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

export default CategoriaForm;
