import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Panel Administrador</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/suscripciones">Suscripciones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrousel">Carrousel</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/moderadores">Moderadores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/generos">Géneros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categorias">Categorías</Link>
                        </li>
                        <li className="nav-item logout-item">
                            <Link className="nav-link" to="/logout">Logout</Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
