
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './RegisterForm.css';
import Button from '../Button/Button';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressdetails, setAddressdetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
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

    setErrors({ ...newErrors, general: '' });

    if (isValid) {
      setIsSubmitting(true);
      setErrors({ ...newErrors, general: '' });

      try {
        // Registrar usuario usando el contexto de autenticación
        const { error } = await register(email, password, firstName, lastName);

        if (error) {
          // Manejar errores específicos de Supabase
          if (error.message.includes('already registered')) {
            setErrors({
              ...newErrors,
              email: 'Este correo electrónico ya está registrado.',
              general: '',
            });
          } else if (error.message.includes('Password')) {
            setErrors({
              ...newErrors,
              password: 'La contraseña debe tener al menos 6 caracteres.',
              general: '',
            });
          } else {
            setErrors({
              ...newErrors,
              general: error.message || 'Error al registrar. Por favor, intenta de nuevo.',
            });
          }
        } else {
          // Registro exitoso - limpiar formulario y redirigir
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setPhone('');
          setAddress('');
          setAddressdetails('');
          navigate('/login');
        }
      } catch (error: any) {
        console.error('Error al registrar:', error);
        setErrors({
          ...newErrors,
          general: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
        });
      } finally {
        setIsSubmitting(false);
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
      <div className="form-group">
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="addressdetails">Detalles de la dirección:</label>
        <input
          type="text"
          id="addressdetails"
          name="addressdetails"
          value={addressdetails}
          onChange={(e) => setAddressdetails(e.target.value)}
          required
        />
      </div>
      {errors.general && <p className="error-message">{errors.general}</p>}
      <Button type="submit" variant="tertiary" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </Button>
    </form>
    <div className="register-form-footer">
        <p><Link to="/login">Ya tienes cuenta? Inicia sesión</Link></p>
        <p><Link to="/" className="back-link">← Regresar al inicio</Link></p>
      </div>
    </div>
  );
};

export default RegisterForm;
