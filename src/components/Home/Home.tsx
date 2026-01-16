import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Home.css';

const Home: React.FC = () => {
  const images = [
    '/shirt%201.jpeg',
    '/shirt%202.jpeg',
    '/shirt%203.jpeg',
    '/shirt%204.jpeg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container">
      {/* Carrusel de imágenes de fondo */}
      <div className="home-background">
        {images.map((image, index) => (
          <div
            key={index}
            className={`background-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      
      {/* Overlay con degradado */}
      <div className="home-overlay"></div>
      
      {/* Contenido */}
      <div className="home-content">
        <h1 className="home-title">Creaciones JL</h1>
        <p className="home-tagline">Creamos tus ideas</p>
        <p className="home-description">
          Tienda especializada en accesorios exclusivos para mujeres. 
          Ofrecemos scrunchies, fundas, moños y gorros en satín de alta calidad. 
          Confeccionamos kimonos personalizados para novias y quinceañeras, 
          además de gorros en microfibra, satín y térmicos.
        </p>
        <p className="home-highlight">
          Venta al por mayor y al detal
        </p>
        <div className="home-buttons">
          <Button to="/catalog" variant="primary" size="large">
            Ver Nuestro Catálogo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
