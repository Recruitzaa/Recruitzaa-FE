import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser, clearUser } from '../../store/slices/auth.slice';
import type { UserRole } from '../../types/auth.types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

/**
 * RoleGuard — Protects routes based on authentication state and user roles.
 * - Shows a spinning loader while the Firebase auth session is initializing.
 * - Resolves the Firebase ID token and custom role claims asynchronously.
 * - Navigates to `/auth` if the user is unauthenticated.
 * - Navigates to `/unauthorized` if the user lacks permissions.
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const dispatch = useAppDispatch();
  const { user, isInitializing } = useAuth();
  const appUser = useAppSelector((state) => state.auth.appUser);
  const location = useLocation();

  useEffect(() => {
    if (isInitializing) return;
    if (user && appUser && appUser.id === user.uid) return;

    const resolveRole = async () => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const savedRole = localStorage.getItem('selected_role');
          const role =
            (tokenResult.claims['role'] as UserRole) ??
            (savedRole === 'employer' ? 'EMPLOYER' : 'CANDIDATE');

          const savedProfileKey = `profile_override_${user.uid}`;
          let savedProfileData = {};
          try {
            const raw = localStorage.getItem(savedProfileKey);
            if (raw) savedProfileData = JSON.parse(raw);
          } catch (e) {}

          dispatch(
            setUser({
              id: user.uid,
              email: user.email ?? '',
              displayName: user.displayName ?? user.email ?? '',
              photoURL: user.photoURL ?? undefined,
              ...savedProfileData,
              // ⚠️ role MUST come after the spread — savedProfileData may contain
              // a stale role from a previous session. The freshly-resolved token
              // role always takes final precedence.
              role,
            })
          );
        } catch (err) {
          console.error('Error resolving user role:', err);
          dispatch(clearUser());
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
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!appUser || !allowedRoles.includes(appUser.activeRole || appUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
