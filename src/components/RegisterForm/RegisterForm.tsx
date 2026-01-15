
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterForm.css';
// import { registerUser as registerUserAPI } from '../../services/api';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    // Expresión regular para validar el formato de email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    // Validación de campos vacíos
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Repetir contraseña es obligatorio.';
      isValid = false;
    }

    // Validación de formato de email solo si no está vacío
    if (email && !validateEmail(email)) {
      newErrors.email = 'El formato del correo electrónico no es válido.';
      isValid = false;
    }

    // Validación de coincidencia de contraseñas solo si ambas no están vacías
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      isValid = false;
    }

    console.log('Errores antes de setErrors:', newErrors); // Debugging
    setErrors(newErrors);

    if (isValid) {
      try {
        // await registerUserAPI(firstName, lastName, email, password);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        window.location.href = '/login';
      } catch (error) {
        console.error('Error al registrar:', error);
      }
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
      <h2>Registrarse</h2>
      <div className="form-group">
        <label htmlFor="firstName">Nombre:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Repetir Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Registrarse</button>
    </form>
    <div className="register-form-footer">
        <p><Link to="/login">Ya tienes cuenta? Inicia sesión</Link></p>
        <p><Link to="/" className="back-link">← Regresar al inicio</Link></p>
      </div>
    </div>
  );
};

export default RegisterForm;
