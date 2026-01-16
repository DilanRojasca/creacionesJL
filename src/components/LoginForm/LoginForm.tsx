
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: loginError } = await login(email, password);

      if (loginError) {
        // Manejar errores específicos de Supabase
        if (loginError.message.includes('Invalid login credentials')) {
          setError('Correo electrónico o contraseña incorrectos.');
        } else if (loginError.message.includes('Email not confirmed')) {
          setError('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
        } else {
          setError(loginError.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
        }
      } else {
        // Login exitoso - redirigir al home
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
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
          {error && <p className="error-message">{error}</p>}
          <Button type="submit" variant="secondary" disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando sesión...' : 'Entrar'}
          </Button>
      </form>
      <div className="login-form-footer">
              <p>¿Olvidaste tu contraseña? <a href="/forgot-password">Recuperar contraseña</a></p>
              <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
              <p><Link to="/" className="back-link">← Regresar al inicio</Link></p>
          </div>
    </div>
  );
};

export default LoginForm;

