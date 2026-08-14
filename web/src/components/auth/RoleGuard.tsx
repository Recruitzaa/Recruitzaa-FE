import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser, clearUser } from '../../store/slices/auth.slice';
import type { AppUser, UserRole } from '../../types/auth.types';
import { ROUTES } from '../../config/routes';
import { getMe, registerUser } from '../../services/api.service';
import { logOut } from '../../services/auth.service';
import { safeLocalStorage } from '../../lib/safeStorage';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

const SPINNER_TIMEOUT_MS = 15000;

type FirebaseLikeUser = {
  uid: string;
  displayName?: string | null;
  getIdToken: (forceRefresh?: boolean) => Promise<string>;
};

const isCanceled = (err: any) => err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError';

/**
 * Module-level, UID-keyed, deduplicated resolver. All RoleGuard instances in
 * the tree share one in-flight `/auth/me` (+ auto-register fallback) request
 * per Firebase UID, so mounting several guards at once for the same user
 * (e.g. during a route transition) never fires duplicate network calls.
 * Switching to a different UID aborts whatever was previously in flight.
 */
let pending: { uid: string; controller: AbortController; promise: Promise<AppUser> } | null = null;

function resolveBackendUser(user: FirebaseLikeUser): Promise<AppUser> {
  if (pending && pending.uid === user.uid) {
    return pending.promise;
  }
  pending?.controller.abort();

  const controller = new AbortController();
  const promise = (async (): Promise<AppUser> => {
    try {
      return await getMe(controller.signal);
    } catch (err: any) {
      if (err?.response?.status !== 404) throw err;
      // Backend has no record of this Firebase user yet — auto-register them.
      try {
        const token = await user.getIdToken(true);
        const savedRole = safeLocalStorage.getItem('selected_role');
        const requestedRole = savedRole === 'employer' ? 'EMPLOYER' : 'CANDIDATE';
        return await registerUser(
          token,
          requestedRole,
          user.displayName ?? undefined,
          controller.signal
        );
      } catch (regErr: any) {
        if (regErr && typeof regErr === 'object') regErr.isAutoRegisterFailure = true;
        throw regErr;
      }
    }
  })();

  // Use then(onFulfilled, onRejected) rather than .finally() here: .finally()
  // would produce a second, unhandled derived promise on the rejection path
  // since nothing else observes it.
  const clearIfCurrent = () => {
    if (pending?.promise === promise) pending = null;
  };
  promise.then(clearIfCurrent, clearIfCurrent);

  pending = { uid: user.uid, controller, promise };
  return promise;
}

/**
 * RoleGuard — Protects routes based on authentication state and user roles.
 * - Shows a spinning loader while the Firebase auth session is initializing.
 * - Calls the Backend GET /auth/me to fetch the real user profile and roles.
 * - Navigates to `/login` if the user is unauthenticated.
 * - Navigates to `/unauthorized` if the user lacks permissions.
 *
 * Resolution is keyed by Firebase UID, deduplicated across instances (see
 * `resolveBackendUser` above), and cancellable per-instance: if the signed-in
 * user changes (or this guard unmounts) while a resolution is in flight, its
 * result is discarded instead of racing a stale response against the current
 * user's state.
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const dispatch = useAppDispatch();
  const { user, isInitializing } = useAuth();
  const appUser = useAppSelector((state) => state.auth.appUser);
  const location = useLocation();
  const [resolutionError, setResolutionError] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);
  const [spinnerTimedOut, setSpinnerTimedOut] = useState(false);
  // Backend-driven terminal states that a retry can't fix: the request must
  // leave the "resolving" spinner and navigate away immediately.
  const [terminalRedirect, setTerminalRedirect] = useState<'login' | 'unauthorized' | null>(null);
  const currentUidRef = useRef<string | null>(null);

  useEffect(() => {
    if (isInitializing) return;
    if (
      user &&
      appUser &&
      (appUser.firebaseUid === user.uid || appUser.email === user.email) &&
      appUser.id !== user.uid
    )
      return;

    if (!user) {
      currentUidRef.current = null;
      dispatch(clearUser());
      return;
    }

    const uid = user.uid;
    currentUidRef.current = uid;
    const isStale = () => currentUidRef.current !== uid;

    const resolveRole = async () => {
      setResolutionError(null);
      setTerminalRedirect(null);
      try {
        const backendUser = await resolveBackendUser(user);
        if (isStale()) return;
        dispatch(setUser(backendUser));
      } catch (err: any) {
        if (isStale() || isCanceled(err)) return;
        console.error('Error fetching user from Backend:', err);

        const status = err?.response?.status;

        if (status === 401) {
          // Unauthenticated on Backend — force out of the stale Firebase
          // session instead of leaving the guard stuck on its spinner.
          dispatch(clearUser());
          void logOut().catch(() => undefined);
          setTerminalRedirect('login');
        } else if (status === 403) {
          // Authenticated, but the backend has explicitly denied this account
          // access (e.g. suspended). Retrying won't help — send them away.
          dispatch(clearUser());
          setTerminalRedirect('unauthorized');
        } else if (status === 429) {
          dispatch(clearUser());
          setResolutionError('Too many requests. Please wait a moment and try again.');
        } else if (err?.isAutoRegisterFailure) {
          // The initial getMe() 404'd and the auto-register fallback also failed.
          dispatch(clearUser());
          setResolutionError(
            'We could not finish creating your Recruitzaa account. Check the API connection and try again.'
          );
        } else {
          // Keep the protected route unresolved. A Firebase-only fallback can
          // silently discard server-managed roles and account status.
          dispatch(clearUser());
          setResolutionError(
            'We could not verify your Recruitzaa account. Check the API connection and try again.'
          );
        }
      }
    };

    resolveRole();

    return () => {
      if (currentUidRef.current === uid) currentUidRef.current = null;
    };
  }, [user, isInitializing, appUser, dispatch, retryNonce]);

  const isSpinning =
    isInitializing || (!!user && !appUser && !resolutionError && !terminalRedirect);

  useEffect(() => {
    if (!isSpinning) {
      setSpinnerTimedOut(false);
      return;
    }
    const timer = setTimeout(() => setSpinnerTimedOut(true), SPINNER_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isSpinning, retryNonce]);

  if (terminalRedirect === 'login') {
    return (
      <Navigate
        to={`${ROUTES.AUTH.loginWithNext(`${location.pathname}${location.search}`)}`}
        replace
      />
    );
  }

  if (terminalRedirect === 'unauthorized') {
    return <Navigate to="/unauthorized" replace />;
  }

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
  if (isSpinning) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="grid place-items-center min-h-screen bg-slate-50 p-6 text-center dark:bg-slate-900"
      >
        <div>
          <div className="mx-auto w-10 h-10 rounded-full border-4 border-slate-300 border-t-indigo-600 animate-spin" />
          <span className="sr-only">Verifying your account…</span>
          {spinnerTimedOut && (
            <div className="mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-300">
              <p>This is taking longer than expected.</p>
              <button
                type="button"
                className="mt-2 font-semibold text-[#c14f16] underline"
                onClick={() => setRetryNonce((value) => value + 1)}
              >
                Try again
              </button>
            </div>
          )}
        </div>
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
