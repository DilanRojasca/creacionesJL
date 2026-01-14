import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Creaciones JL
        </Link>
        <div className="navbar-buttons">
          <Link to="/login" className="navbar-btn login-btn">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="navbar-btn register-btn">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
