/**
 * Backend API service — calls Recruitzaa Auth Service endpoints.
 *
 * Uses the pre-configured axios instance from lib/axios.ts which
 * automatically attaches the Firebase ID token to every request.
 */
import api from '../lib/axios';
import type { AppUser } from '../types/auth.types';

// ─── Response shapes (match BE camelCase output) ─────────────────

interface AuthResponse {
  user: AppUser;
  message: string;
}

interface LogoutResponse {
  message: string;
}

// ─── Auth API calls ──────────────────────────────────────────────

/**
 * Register a new user on the Backend.
 * Called after Firebase signup to create the DB record.
 */
export const registerUser = async (
  firebaseToken: string,
  requestedRole: 'CANDIDATE' | 'EMPLOYER',
  displayName?: string
): Promise<AppUser> => {
  const { data } = await api.post<AuthResponse>('/auth/register', {
    firebaseToken,
    requestedRole,
    displayName,
  });
  return data.user;
};

/**
 * Verify an existing user's Firebase token on the Backend.
 * Called after Firebase sign-in to fetch the user's profile and roles.
 */
export const verifyUser = async (firebaseToken: string): Promise<AppUser> => {
  const { data } = await api.post<AuthResponse>('/auth/verify', {
    firebaseToken,
  });
  return data.user;
};

/**
 * Get the current authenticated user's profile.
 * Called by RoleGuard on page load to restore the session.
 */
export const getMe = async (): Promise<AppUser> => {
  const { data } = await api.get<AppUser>('/auth/me');
  return data;
};

/**
 * Update the current user's profile.
 */
export const updateProfile = async (
  profileData: Partial<AppUser>
): Promise<AppUser> => {
  const { data } = await api.put<AppUser>('/auth/me', profileData);
  return data;
};

/**
 * Logout — invalidate the Redis token cache on the Backend.
 */
export const logoutUser = async (): Promise<LogoutResponse> => {
  const { data } = await api.post<LogoutResponse>('/auth/logout');
  return data;
};
