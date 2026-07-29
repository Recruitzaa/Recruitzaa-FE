import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser, clearUser } from '../../store/slices/auth.slice';
import type { UserRole } from '../../types/auth.types';
import { getMe, registerUser } from '../../services/api.service';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

/**
 * RoleGuard — Protects routes based on authentication state and user roles.
 * - Shows a spinning loader while the Firebase auth session is initializing.
 * - Calls the Backend GET /auth/me to fetch the real user profile and roles.
 * - Navigates to `/login` if the user is unauthenticated.
 * - Navigates to `/unauthorized` if the user lacks permissions.
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const dispatch = useAppDispatch();
  const { user, isInitializing } = useAuth();
  const appUser = useAppSelector((state) => state.auth.appUser);
  const location = useLocation();

  useEffect(() => {
    if (isInitializing) return;
    if (user && appUser && (appUser.firebaseUid === user.uid || appUser.email === user.email)) return;

    const resolveRole = async () => {
      if (user) {
        try {
          // Fetch the real user profile and roles from the Backend
          const backendUser = await getMe();
          dispatch(setUser(backendUser));
        } catch (err: any) {
          console.error('Error fetching user from Backend:', err);

          // If Backend returns 404 (user not registered yet), auto-register them
          if (err?.response?.status === 404) {
            try {
              const token = await user.getIdToken(true);
              const savedRole = localStorage.getItem('selected_role');
              const requestedRole = savedRole === 'employer' ? 'EMPLOYER' : 'CANDIDATE';
              const registeredUser = await registerUser(token, requestedRole, user.displayName ?? undefined);
              dispatch(setUser(registeredUser));
            } catch (regErr) {
              console.error('Auto-registration failed:', regErr);
              // Fallback to Firebase-only data
              const savedRole = localStorage.getItem('selected_role');
              const role: UserRole = savedRole === 'employer' ? 'EMPLOYER' : 'CANDIDATE';
              dispatch(
                setUser({
                  id: user.uid,
                  email: user.email ?? '',
                  displayName: user.displayName ?? user.email ?? '',
                  photoURL: user.photoURL ?? undefined,
                  role,
                  availableRoles: [role],
                })
              );
            }
          } else if (err?.response?.status === 401) {
            // Unauthenticated on Backend
            dispatch(clearUser());
          } else {
            // Other errors (e.g. Network error) — Fallback to Firebase data so user is not locked out
            const savedRole = localStorage.getItem('selected_role');
            const role: UserRole = savedRole === 'employer' ? 'EMPLOYER' : 'CANDIDATE';
            dispatch(
              setUser({
                id: user.uid,
                email: user.email ?? '',
                displayName: user.displayName ?? user.email ?? '',
                photoURL: user.photoURL ?? undefined,
                role,
                availableRoles: [role],
              })
            );
          }
        }
      } else {
        dispatch(clearUser());
      }
    };

    resolveRole();
  }, [user, isInitializing, appUser, dispatch]);

  // Show loading spinner if Firebase is initializing or if a user is logged in
  // but their Redux state (appUser) containing the resolved role is not yet loaded.
  if (isInitializing || (user && !appUser)) {
    return (
      <div className="grid place-items-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`}
        replace
      />
    );
  }

  if (!appUser || !allowedRoles.includes(appUser.activeRole || appUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
