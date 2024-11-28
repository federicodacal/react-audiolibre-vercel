import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter como Router
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Subscriptions from './components/Subscriptions';
import SubscriptionForm from './components/SubscriptionForm';
import Carrousel from './components/Carrousel';
import CarrouselForm from './components/CarrouselForm';
import Moderador from './components/Moderadores';
import ModeradorForm from './components/ModeradorForm';
import Categoria from './components/Categorias';
import CategoriaForm from './components/CategoriaForm';
//import Genero from './components/Genero';
//import GeneroForm from './components/GeneroForm';

const App = () => {
    return (
      <Router>
        <Navbar />
        <Routes>
            <Route path="/suscripciones" element={<Subscriptions />} />
            <Route path="/suscripciones/:id" element={<SubscriptionForm />} />
            <Route path="/suscripciones/nueva" element={<SubscriptionForm />} />

            <Route path="/carrousel" element={<Carrousel />} />
            <Route path="/carrousel/:id" element={<CarrouselForm />} />
            <Route path="/carrousel/nueva" element={<CarrouselForm />} />

            <Route path="/moderadores" element={<Moderador />} />
            <Route path="/moderadores/:id" element={<ModeradorForm />} />
            <Route path="/moderadores/nuevo" element={<ModeradorForm />} />

            <Route path="/categorias" element={<Categoria />} />
            <Route path="/categorias/:id" element={<CategoriaForm />} />
            <Route path="/categorias/nuevo" element={<CategoriaForm />} />

            { /*  
            <Route path="/generos" element={<Categoria />} />
            <Route path="/generos/:id" element={<CategoriaForm />} />
            <Route path="/generos/nuevo" element={<CategoriaForm />} />
            */ }
            

        </Routes>
      </Router>
    );
};

export default App;