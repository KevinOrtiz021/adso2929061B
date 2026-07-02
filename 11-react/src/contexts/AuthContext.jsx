// contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import authService from '../services/authService';

const AuthContext = createContext();

const SWAL_DARK = { background: '#121116', color: '#e0e0e0', confirmButtonColor: '#A69459' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Guardamos el token "de confianza" (el que entregó el login) en un ref.
  // Lo comparamos contra lo que haya en localStorage cada segundo; si alguien
  // lo edita desde la consola del navegador, deja de coincidir y detectamos
  // la manipulación sin depender de que se dispare una petición al backend.
  const trustedTokenRef = useRef(null);
  const loggingOutRef = useRef(false);

  useEffect(() => {
    const savedUser = authService.getStoredUser();
    if (savedUser) {
      setUser(savedUser);
      trustedTokenRef.current = authService.getToken();
    }
    setLoading(false);
  }, []);

  // Fuerza el cierre de sesión y avisa con SweetAlert. Se usa tanto para
  // manipulación de token detectada en el front, como para 401 del backend.
  const forceLogout = async (message) => {
    if (loggingOutRef.current) return; // evita alertas duplicadas
    loggingOutRef.current = true;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    trustedTokenRef.current = null;
    setUser(null);

    await Swal.fire({
      title: 'Sesión inválida',
      text: message || 'Tu sesión ya no es válida. Debes iniciar sesión nuevamente.',
      icon: 'error',
      confirmButtonText: 'Entendido',
      allowOutsideClick: false,
      allowEscapeKey: false,
      ...SWAL_DARK,
    });

    navigate('/login', { replace: true });
    loggingOutRef.current = false;
  };

  useEffect(() => {
    if (!user) return undefined;

    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken !== trustedTokenRef.current) {
        forceLogout('Se decto una modificacion en el token no es posible editar, ni eliminar ni consultar.');
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Escucha también 401 disparados por apiClient (token vencido o revocado
  // en el servidor, no solo manipulado en el navegador).
  useEffect(() => {
    function handleUnauthorized() {
      forceLogout('Tu sesión expiró o fue revocada por el servidor.');
    }
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authService.login(email, password);
      setUser(response.user);
      trustedTokenRef.current = response.token; // token válido de referencia
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    forceLogout,
    isAuthenticated: !!user || !!authService.getToken(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}