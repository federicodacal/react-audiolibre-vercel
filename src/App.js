import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter como Router
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Subscriptions from './components/Subscriptions';
import SubscriptionForm from './components/SubscriptionForm';
import Carrousel from './components/Carrousel';
import CarrouselForm from './components/CarrouselForm';
import Moderador from './components/Moderadores';
import ModeradorForm from './components/ModeradorForm';
import Categoria from './components/Categorias';
import CategoriaForm from './components/CategoriaForm';
import Genero from './components/Generos';
import GeneroForm from './components/GeneroForm';
import Moderadores from './components/Moderadores';
import PrivateRoute from './components/PrivateRoute';
import ReportsPage from './components/Reports';

const App = () => {
    return (
      <Router>
          <AuthProvider>
          <Navbar />
          <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/suscripciones" element=
                {
                  <PrivateRoute>
                    <Subscriptions />
                  </PrivateRoute>
                } 
              />

              <Route path="/suscripciones/:id" element=
                {
                  <PrivateRoute>
                    <SubscriptionForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/suscripciones/nueva" element=
                {
                  <PrivateRoute>
                    <SubscriptionForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/carrousel" element=
                {
                  <PrivateRoute>
                    <Carrousel />
                  </PrivateRoute>
                } 
              />

              <Route path="/carrousel/:id" element=
                {
                  <PrivateRoute>
                    <CarrouselForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/carrousel/nueva" element=
                {
                  <PrivateRoute>
                    <CarrouselForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/moderadores" element=
                {
                  <PrivateRoute>
                    <Moderador />
                  </PrivateRoute>
                } 
              />

              <Route path="/moderadores/:id" element=
                {
                  <PrivateRoute>
                    <ModeradorForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/moderadores/nuevo" element=
                {
                  <PrivateRoute>
                    <ModeradorForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/categorias" element=
                {
                  <PrivateRoute>
                    <Categoria />
                  </PrivateRoute>
                } 
              />

              <Route path="/categorias/:id" element=
                {
                  <PrivateRoute>
                    <CategoriaForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/categorias/nueva" element=
                {
                  <PrivateRoute>
                    <CategoriaForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/generos" element=
                {
                  <PrivateRoute>
                    <Genero />
                  </PrivateRoute>
                } 
              />

              <Route path="/generos/:id" element=
                {
                  <PrivateRoute>
                    <GeneroForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/generos/nuevo" element=
                {
                  <PrivateRoute>
                    <GeneroForm />
                  </PrivateRoute>
                } 
              />

              <Route path="/reportes" element=
                {
                  <PrivateRoute>
                    <ReportsPage />
                  </PrivateRoute>
                } 
              />
          </Routes>
      </AuthProvider>
      </Router>
    );
};

export default App;