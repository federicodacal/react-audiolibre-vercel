import React, { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginAuth } from '../services/authService';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/LoginForm.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        pwd: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            console.log(user)
            const response = await loginAuth(user);
            if(response.token) {
                login(response.token);
            }
        } catch (error) {
            console.error('Error al intentar logear:', error);
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="login-form-container">
            <div className="back-button" onClick={() => navigate('/')}>
                <FaArrowLeft /> Volver
            </div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Clave:</label>
                    <input type="password" name="pwd" value={user.pwd} onChange={handleChange} />
                </div>
                <div className="button-container">
                    <button type="submit" className="create-button">
                        Aceptar
                    </button>
                </div>
                {error && <p className="error">{error}</p>}
            </form>
        </div>  
    );
};

export default Login;
