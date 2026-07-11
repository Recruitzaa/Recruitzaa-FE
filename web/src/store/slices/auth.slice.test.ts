import { describe, it, expect } from 'vitest';
import authReducer, { setUser, clearUser, setAuthLoading } from './auth.slice';
import type { AppUser } from '../../types/auth.types';

describe('Auth Slice', () => {
  const initialState = {
    appUser: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  };

  const mockUser: AppUser = {
    id: '123',
    email: 'test@example.com',
    role: 'CANDIDATE',
    displayName: 'Test User',
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const actual = authReducer(initialState, setUser(mockUser));
    expect(actual.appUser).toEqual(mockUser);
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBeNull();
  });

  it('should handle clearUser', () => {
    // First set a user
    const loggedInState = authReducer(initialState, setUser(mockUser));
    // Then clear it
    const actual = authReducer(loggedInState, clearUser());
    
    expect(actual.appUser).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.isLoading).toBe(false);
  });

  it('should handle setAuthLoading', () => {
    const actual = authReducer(initialState, setAuthLoading(false));
    expect(actual.isLoading).toBe(false);
  });
});
