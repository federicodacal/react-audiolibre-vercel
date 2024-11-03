import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter como Router
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Subscriptions from './components/Subscriptions';
import SubscriptionForm from './components/SubscriptionForm';

const App = () => {
    return (
      <Router>
        <Navbar />
        <Routes>
            <Route path="/suscripciones" element={<Subscriptions />} />
            <Route path="/suscripciones/:id" element={<SubscriptionForm />} />
            <Route path="/suscripciones/nueva" element={<SubscriptionForm />} />
            {/* Aquí puedes agregar otras rutas */}
        </Routes>
      </Router>
    );
};

export default App;