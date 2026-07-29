import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppUser, UserRole } from '../../types/auth.types';

interface AuthState {
  appUser: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  appUser: null,
  isAuthenticated: false,
  isLoading: true, // true on start — Firebase resolves session async
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AppUser>) {
      const user = action.payload;
      
      // Restore last active role on refresh
      const savedActiveRole = typeof localStorage !== 'undefined' 
        ? localStorage.getItem(`active_role_${user.id}`) as UserRole | null 
        : null;
      const activeRole = savedActiveRole || user.activeRole || user.role || 'CANDIDATE';

      state.appUser = {
        ...user,
        availableRoles: user.availableRoles || [activeRole],
        activeRole,
        role: activeRole, // sync legacy role field
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearUser(state) {
      if (state.appUser) {
        localStorage.removeItem(`active_role_${state.appUser.id}`);
      }
      state.appUser = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    updateUserProfile(state, action: PayloadAction<Partial<AppUser>>) {
      if (state.appUser) {
        state.appUser = { ...state.appUser, ...action.payload };
      }
    },
    switchActiveRole(state, action: PayloadAction<UserRole>) {
      if (state.appUser) {
        state.appUser.activeRole = action.payload;
        state.appUser.role = action.payload; // sync legacy role field
        localStorage.setItem(`active_role_${state.appUser.id}`, action.payload);
      }
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setUser,
  clearUser,
  updateUserProfile,
  switchActiveRole,
  setAuthLoading,
  setAuthError,
} = authSlice.actions;
export default authSlice.reducer;
