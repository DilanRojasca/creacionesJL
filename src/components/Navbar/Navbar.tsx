import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.svg" alt="Creaciones JL Logo" className="navbar-logo-img" />
          <span>Creaciones JL</span>
        </Link>
        <div className="navbar-buttons">
          <Button to="/login" variant="tertiary" size="medium">
            Iniciar Sesión
          </Button>
          <Button to="/register" variant="primary" size="medium">
            Registrarse
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
