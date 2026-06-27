// ─── Auth Service — conexión real con Laravel API ────────────────────────────
import apiClient from './apiClient';

const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  logout: async () => {
    try {
      await apiClient.post('/logout');
    } catch {
      // Si falla el logout en el servidor, igual limpiamos local
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getStoredUser: () => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  getToken: () => localStorage.getItem('token'),
};

export default authService;