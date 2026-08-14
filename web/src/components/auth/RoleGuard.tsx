import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser, clearUser } from '../../store/slices/auth.slice';
import type { UserRole } from '../../types/auth.types';
import { ROUTES } from '../../config/routes';
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
  const [resolutionError, setResolutionError] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);

  useEffect(() => {
    if (isInitializing) return;
    if (
      user &&
      appUser &&
      (appUser.firebaseUid === user.uid || appUser.email === user.email) &&
      appUser.id !== user.uid
    )
      return;

    const resolveRole = async () => {
      if (user) {
        setResolutionError(null);
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
              const registeredUser = await registerUser(
                token,
                requestedRole,
                user.displayName ?? undefined
              );
              dispatch(setUser(registeredUser));
            } catch (regErr) {
              console.error('Auto-registration failed:', regErr);
              dispatch(clearUser());
              setResolutionError(
                'We could not finish creating your Recruitzaa account. Check the API connection and try again.'
              );
            }
          } else if (err?.response?.status === 401) {
            // Unauthenticated on Backend
            dispatch(clearUser());
          } else {
            // Keep the protected route unresolved. A Firebase-only fallback can
            // silently discard server-managed roles and account status.
            dispatch(clearUser());
            setResolutionError(
              'We could not verify your Recruitzaa account. Check the API connection and try again.'
            );
          }
        }
      } else {
        dispatch(clearUser());
      }
    };

    resolveRole();
  }, [user, isInitializing, appUser, dispatch, retryNonce]);

  if (resolutionError) {
    return (
      <main
        className="grid min-h-screen place-items-center bg-slate-50 p-6 dark:bg-slate-900"
        tabIndex={-1}
      >
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Account verification failed
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{resolutionError}</p>
          <button
            type="button"
            className="mt-5 rounded-lg bg-[#c14f16] px-4 py-2 font-semibold text-white"
            onClick={() => setRetryNonce((value) => value + 1)}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

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
        to={`${ROUTES.AUTH.loginWithNext(`${location.pathname}${location.search}`)}`}
        replace
      />
    );
  }

  if (!appUser || !allowedRoles.includes(appUser.activeRole || appUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
