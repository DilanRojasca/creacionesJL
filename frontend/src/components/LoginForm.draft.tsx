import React from 'react';
import { Link } from 'react-router-dom';
import '../LoginForm.css';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  try {
    const response = await loginUser(email, password);
    
    // Extraer el token y datos del usuario
    const token = response.access_token;
    const user = response.user;
    
    // Guardar en AuthContext
    // const { login } = useAuth(); // Nota: Aquí habrá un problema con hooks, ver nota abajo
    // login(token, user);
    
    // Por ahora, guardar el token en localStorage
    localStorage.setItem('authToken', token);
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
    
    window.location.href = "/";
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    // TODO: Mostrar error en la UI
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

// NOTA: Para usar useAuth() correctamente dentro de handleLogin, se necesitaría refactorizar
// la función para que sea un hook. Ver ejemplo abajo:
/*

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      const response = await loginUser(email, password);
      const token = response.access_token;
      const user = response.user;
      
      login(token, user);
      window.location.href = "/";
    } catch (error) {
      setError("Error al iniciar sesión: " + (error as Error).message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          {error && <div className="error-message">{error}</div>}
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

*/
