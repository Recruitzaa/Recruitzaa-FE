import { useAppSelector } from '../../../store/hooks';
import type { UserRole } from '../types/auth.types';

/**
 * useAuth hook — accesses the global Redux auth state.
 * Returns the authentication status, active user role, and loading state.
 */
export const useAuth = () => {
  const { appUser, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  return {
    isAuthenticated,
    userRole: appUser?.role ?? (null as UserRole | null),
    isLoading,
  };
};
