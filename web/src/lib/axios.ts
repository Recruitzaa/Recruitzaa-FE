import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { auth } from '../config/firebase';
import { env } from '../config/env';
import { safeLocalStorage } from './safeStorage';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    /** Marks a request that already went through the 401 token-refresh retry, to avoid looping. */
    _authRetried?: boolean;
    /** Number of network/5xx retries already attempted for this request. */
    _retryCount?: number;
  }
}

const REQUEST_TIMEOUT_MS = 15000;
const MAX_RETRIES = 2;
const RETRY_STATUS_CODES = new Set([502, 503, 504]);

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach Firebase ID token ──────────────
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      // Fall through without an Authorization header rather than aborting the
      // request entirely; the backend will reply 401 and the response
      // interceptor's refresh flow (or the caller) can react to that.
      console.warn('Failed to attach Firebase ID token to request:', err);
    }
  }
  const activeRole = safeLocalStorage.getItem('recruitzaa_active_role');
  if (activeRole) {
    config.headers['X-Active-Role'] = activeRole;
  }
  return config;
});

const isRetryableNetworkError = (error: AxiosError) =>
  !error.response && error.code !== 'ECONNABORTED' && error.code !== 'ERR_CANCELED';

const isRetryableStatus = (error: AxiosError) =>
  error.response ? RETRY_STATUS_CODES.has(error.response.status) : false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Response interceptor: retry transient failures, refresh token on 401 ──
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._authRetried) {
      originalRequest._authRetried = true;
      const user = auth.currentUser;
      if (user) {
        try {
          const freshToken = await user.getIdToken(true); // force refresh
          originalRequest.headers.Authorization = `Bearer ${freshToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.warn('Firebase token refresh failed:', refreshError);
          // Fall through and reject with the original 401, not the refresh error.
        }
      }
      return Promise.reject(error);
    }

    if (
      (isRetryableNetworkError(error) || isRetryableStatus(error)) &&
      (originalRequest._retryCount ?? 0) < MAX_RETRIES
    ) {
      originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;
      await delay(2 ** originalRequest._retryCount * 250); // 500ms, 1000ms
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
