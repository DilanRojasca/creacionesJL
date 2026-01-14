
import React from 'react';
import { Link } from 'react-router-dom';
import '../LoginForm.css';
import { loginUser } from '../services/api';

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await loginUser(email, password);
    window.location.href = "/";
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

const LoginForm: React.FC = () => {
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Entrar</button>
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

