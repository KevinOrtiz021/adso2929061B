// services/apiClient.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    },
    withCredentials: false,
});

// Interceptor para agregar el token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Si el backend responde 401 (token vencido, revocado, o inválido),
// avisamos al AuthProvider mediante un evento global para que muestre
// el SweetAlert y cierre sesión de forma centralizada, en vez de repetir
// esa lógica en cada componente que llama a la API.
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('auth:unauthorized'));
        }
        return Promise.reject(error);
    }
);

export default apiClient;