import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { subscribeToAuthState } from '../services/auth.service';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * useAuth — subscribes to Firebase auth state changes.
 * Returns { user, loading, error }.
 * `loading` is true until Firebase resolves the initial session.
 */
export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setState({ user, loading: false, error: null });
    });

    return () => unsubscribe();
  }, []);

  return state;
};
