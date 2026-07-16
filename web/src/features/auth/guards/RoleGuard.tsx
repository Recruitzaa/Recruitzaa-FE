import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { subscribeToAuthState } from '../../../services/auth.service';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setUser, clearUser } from '../../../store/slices/auth.slice';
import type { UserRole } from '../../../types/auth.types';
import { ROUTES } from '../../../config/routes';

interface RoleGuardProps {
  allowedRole: UserRole;
}

/**
 * RoleGuard — wraps protected portal routes.
 * - Shows nothing while Firebase resolves the session (isLoading).
 * - Redirects unauthenticated users to /auth.
 * - Redirects authenticated users with the wrong role to /unauthorized.
 * - Also bootstraps Firebase auth state into Redux on mount.
 */
export const RoleGuard = ({ allowedRole }: RoleGuardProps) => {
  const dispatch = useAppDispatch();
  const { appUser, isAuthenticated, isLoading } = useAppSelector((s) => s.auth);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (firebaseUser) => {
      if (firebaseUser) {
        // Get custom claims (role) from the ID token
        const tokenResult = await firebaseUser.getIdTokenResult();
        const role = (tokenResult.claims['role'] as UserRole) ?? 'CANDIDATE';

        const savedProfileKey = `profile_override_${firebaseUser.uid}`;
        let savedProfileData = {};
        try {
          const raw = localStorage.getItem(savedProfileKey);
          if (raw) savedProfileData = JSON.parse(raw);
        } catch (e) {}

        dispatch(
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email ?? '',
            role,
            displayName: firebaseUser.displayName ?? firebaseUser.email ?? '',
            photoURL: firebaseUser.photoURL ?? undefined,
            ...savedProfileData,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // While Firebase is resolving — show nothing (prevents flash)
  if (isLoading) {
    return (
      <div className="grid place-items-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="w-9 h-9 rounded-full border-[3px] border-slate-200 dark:border-slate-800 border-t-[#c14f16] animate-spin" />
      </div>
    );
  }

  // Not logged in → go to auth
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  // Wrong role → unauthorized
  if (appUser?.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
