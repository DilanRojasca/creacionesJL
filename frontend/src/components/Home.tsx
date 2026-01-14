import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenido a Creaciones JL</h1>
        <p className="home-subtitle">Empresa de conflecciones</p>
        <div className="home-buttons">
          <Link to="/login" className="home-btn primary-btn">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="home-btn secondary-btn">
            Crear Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
