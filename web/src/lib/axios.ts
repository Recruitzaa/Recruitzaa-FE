import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach Firebase ID token ──────────────
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  const activeRole = localStorage.getItem('recruitzaa_active_role');
  if (activeRole) {
    config.headers['X-Active-Role'] = activeRole;
  }
  return config;
});

// ── Response interceptor: on 401 force-refresh token + retry ──
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retried) {
      originalRequest._retried = true;
      const user = auth.currentUser;
      if (user) {
        const freshToken = await user.getIdToken(true); // force refresh
        originalRequest.headers.Authorization = `Bearer ${freshToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
