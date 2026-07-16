import { describe, it, expect } from 'vitest';
import authReducer, {
  setUser,
  clearUser,
  setAuthLoading,
  updateUserProfile,
  setAuthError,
} from './auth.slice';
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
    availableRoles: ['CANDIDATE', 'EMPLOYER', 'EXPERT', 'EMPLOYEE', 'SUPER_ADMIN'],
    activeRole: 'CANDIDATE',
    displayName: 'Test User',
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser without profile override', () => {
    localStorage.clear();
    const actual = authReducer(initialState, setUser(mockUser));
    expect(actual.appUser).toEqual(mockUser);
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBeNull();
  });

  it('should handle setUser with profile override', () => {
    localStorage.setItem(
      'profile_override_123',
      JSON.stringify({ displayName: 'Overridden Name' })
    );
    const actual = authReducer(initialState, setUser(mockUser));
    expect(actual.appUser).toEqual({ ...mockUser, displayName: 'Overridden Name' });
    expect(actual.isAuthenticated).toBe(true);
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

  it('should handle updateUserProfile when appUser is set', () => {
    localStorage.clear();
    const loggedInState = authReducer(initialState, setUser(mockUser));
    const actual = authReducer(loggedInState, updateUserProfile({ displayName: 'New Name' }));

    expect(actual.appUser?.displayName).toBe('New Name');
    expect(localStorage.getItem('profile_override_123')).toBe(JSON.stringify(actual.appUser));
  });

  it('should not update profile if appUser is null', () => {
    localStorage.clear();
    const actual = authReducer(initialState, updateUserProfile({ displayName: 'New Name' }));
    expect(actual.appUser).toBeNull();
    expect(localStorage.getItem('profile_override_123')).toBeNull();
  });

  it('should handle setAuthLoading', () => {
    const actual = authReducer(initialState, setAuthLoading(false));
    expect(actual.isLoading).toBe(false);
  });

  it('should handle setAuthError', () => {
    const actual = authReducer(initialState, setAuthError('Failed to sign in'));
    expect(actual.error).toBe('Failed to sign in');
    expect(actual.isLoading).toBe(false);
  });
});
