export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'SUPER_ADMIN';

export interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}
