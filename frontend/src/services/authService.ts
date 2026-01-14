import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Función para obtener el token del localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Crear instancia de axios con interceptores
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  // Interceptor para agregar el token a todas las peticiones
  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor para manejar errores 401 (token expirado)
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // El token expiró, limpiar localStorage y redirigir a login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user?: {
    id: string;
    email: string;
    nombre?: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirm: string;
  nombre?: string;
}

// Login
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  return response.data;
};

// Register
export const registerUser = async (data: RegisterRequest) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

// TODO: Implementar cuando se tenga el endpoint
export const logoutUser = async (): Promise<void> => {
  // await axiosInstance.post('/auth/logout');
  localStorage.removeItem('authToken');
};

// TODO: Implementar cuando se tenga el endpoint
export const refreshToken = async (): Promise<string> => {
  // const response = await axiosInstance.post<{ access_token: string }>('/auth/refresh');
  // return response.data.access_token;
  throw new Error('Not implemented');
};

// TODO: Implementar cuando se tenga el endpoint
export const validateToken = async (token: string): Promise<boolean> => {
  // try {
  //   await axiosInstance.post('/auth/validate', { token });
  //   return true;
  // } catch {
  //   return false;
  // }
  throw new Error('Not implemented');
};
