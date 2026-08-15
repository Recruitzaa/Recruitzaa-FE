/**
 * Backend API service — calls Recruitzaa Auth Service endpoints.
 *
 * Uses the pre-configured axios instance from lib/axios.ts which
 * automatically attaches the Firebase ID token to every request.
 */
import { z } from 'zod';
import api from '../lib/axios';
import type { AppUser } from '../types/auth.types';

// ─── Response shapes (match BE camelCase output) ─────────────────

const userRoleSchema = z.enum(['CANDIDATE', 'EMPLOYER', 'EXPERT', 'EMPLOYEE', 'SUPER_ADMIN']);

// Kept in sync with types/auth.types.ts#AppUser by hand — this is the
// boundary that actually needs to know if the backend's response drifted.
const appUserSchema: z.ZodType<AppUser> = z.object({
  id: z.string(),
  email: z.string(),
  firebaseUid: z.string().optional(),
  role: userRoleSchema,
  availableRoles: z.array(userRoleSchema),
  activeRole: userRoleSchema.optional(),
  displayName: z.string(),
  photoUrl: z.string().nullish(),
  phone: z.string().nullish(),
  location: z.string().nullish(),
  bio: z.string().nullish(),
  isCurrentlyEmployed: z.boolean().nullish(),
  currentCompany: z.string().nullish(),
  currentRole: z.string().nullish(),
  currentSalary: z.string().nullish(),
  noticePeriod: z.string().nullish(),
  summary: z.string().nullish(),
  skills: z.array(z.string()).nullish(),
  resumeFileName: z.string().nullish(),
  resumeFileSize: z.string().nullish(),
  isActive: z.boolean().nullish(),
});

const authResponseSchema = z.object({
  user: appUserSchema,
  message: z.string(),
});

const logoutResponseSchema = z.object({
  message: z.string(),
});

/** Validates a response against its schema, throwing a readable error (not a raw ZodError) on mismatch. */
function parseApiResponse<T>(schema: z.ZodType<T>, data: unknown, context: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`Unexpected response shape from ${context}:`, result.error.flatten());
    throw new Error(`The server returned an unexpected response from ${context}.`);
  }
  return result.data;
}

// ─── Auth API calls ──────────────────────────────────────────────

/**
 * Register a new user on the Backend.
 * Called after Firebase signup to create the DB record.
 */
export const registerUser = async (
  firebaseToken: string,
  requestedRole: 'CANDIDATE' | 'EMPLOYER',
  displayName?: string,
  signal?: AbortSignal
): Promise<AppUser> => {
  const { data } = await api.post(
    '/auth/register',
    { firebaseToken, requestedRole, displayName },
    { signal }
  );
  return parseApiResponse(authResponseSchema, data, 'POST /auth/register').user;
};

/**
 * Verify an existing user's Firebase token on the Backend.
 * Called after Firebase sign-in to fetch the user's profile and roles.
 */
export const verifyUser = async (firebaseToken: string): Promise<AppUser> => {
  const { data } = await api.post('/auth/verify', {
    firebaseToken,
  });
  return parseApiResponse(authResponseSchema, data, 'POST /auth/verify').user;
};

/**
 * Get the current authenticated user's profile.
 * Called by RoleGuard on page load to restore the session.
 */
export const getMe = async (signal?: AbortSignal): Promise<AppUser> => {
  const { data } = await api.get('/auth/me', { signal });
  return parseApiResponse(appUserSchema, data, 'GET /auth/me');
};

/**
 * Update the current user's profile.
 */
export const updateProfile = async (profileData: Partial<AppUser>): Promise<AppUser> => {
  const { data } = await api.put('/auth/me', profileData);
  return parseApiResponse(appUserSchema, data, 'PUT /auth/me');
};

/**
 * Logout — invalidate the Redis token cache on the Backend.
 */
export const logoutUser = async (): Promise<{ message: string }> => {
  const { data } = await api.post('/auth/logout');
  return parseApiResponse(logoutResponseSchema, data, 'POST /auth/logout');
};
