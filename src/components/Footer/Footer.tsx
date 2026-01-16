import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section-left">
          <h3 className="footer-title">Enlaces Rápidos</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <span className="disabled">Catálogo</span>
            </li>
            <li>
              <span className="disabled">Sobre Nosotros</span>
            </li>
            <li>
              <span className="disabled">Contacto</span>
            </li>
          </ul>
        </div>

        <div className="footer-section-center">
          <h3 className="footer-title">Creaciones JL</h3>
          <p className="footer-tagline">Creamos tus ideas</p>
          <p className="footer-description">
            Accesorios en satín - Scrunchies - Fundas - Moños - Gorros
          </p>
          <p className="footer-description">
            Kimonos para novias y quinceañeras
          </p>
          <p className="footer-description">
            Gorros en microfibra, satín y térmicos
          </p>
          <p className="footer-highlight">Al por mayor y al detal</p>
        </div>

        <div className="footer-section-right">
          <h3 className="footer-title">Contáctanos</h3>
          <div className="footer-contact">
            <a 
              href="https://www.instagram.com/creacioness_jl/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              <img src="/instagram-logo.svg" alt="Instagram" className="contact-icon" />
              <span>@creacioness_jl</span>
            </a>
            <a 
              href="https://wa.me/573225656724" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              <img src="/whatsapp.svg" alt="WhatsApp" className="contact-icon" />
              <span>+57 322 5656724</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Creaciones JL. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
