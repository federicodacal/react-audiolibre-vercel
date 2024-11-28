import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter como Router
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Subscriptions from './components/Subscriptions';
import SubscriptionForm from './components/SubscriptionForm';
import Carrousel from './components/Carrousel';
import CarrouselForm from './components/CarrouselForm';

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

        </Routes>
      </Router>
    );
};

export default App;