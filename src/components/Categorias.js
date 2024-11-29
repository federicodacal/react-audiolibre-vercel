import React, { useEffect, useState } from 'react';
import { getCategorias } from '../services/categoriaService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Categorias.css';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    // Función para obtener los datos de categorias desde la API
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (error) {
                console.error('Error al cargar categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/categorias/${id}`); // Redirigir al formulario de la categoria
    };

    const handleAddNewCategoria = () => {
        navigate('/categorias/nuevo');
    };

    return (
        <div className="categoria-container">
            <h2>Categorias</h2>
            <button className="add-categoria-btn" onClick={handleAddNewCategoria}>Agregar Nueva Categoria</button>

            <div className="categoria-list">
                {categorias.map((categoria) => (
                    <div className="categoria-card" key={categoria._id}>
                        <h5 className="centered-text"><strong>{categoria.nombre.toUpperCase()}</strong></h5>
                        <p><strong>Nombre:</strong> {categoria.nombre}</p>
                        <p><strong>Fecha Creación:</strong> {new Date(categoria.fecha_creacion).toLocaleString()}</p>
                        <p><strong>Fecha Modificación:</strong> {new Date(categoria.fecha_modificacion).toLocaleString()}</p>
                        <button className="view-details-btn" onClick={() => handleViewDetails(categoria.id)}>
                            <FaSearch /> {/* Icono de lupa */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorias;
