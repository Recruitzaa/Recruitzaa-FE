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
      const rawUser = action.payload;
      const savedProfile =
        typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
          ? localStorage.getItem(`profile_override_${rawUser.id}`)
          : null;
      const profileData = savedProfile ? { ...rawUser, ...JSON.parse(savedProfile) } : rawUser;

      // Dev Override ("God Mode") Sandbox: Force availableRoles to include all 5 workspaces only in development
      const availableRoles: UserRole[] = import.meta.env.DEV
        ? ['CANDIDATE', 'EMPLOYER', 'EXPERT', 'EMPLOYEE', 'SUPER_ADMIN']
        : profileData.availableRoles || [profileData.role || 'CANDIDATE'];
      const activeRole = profileData.activeRole || profileData.role || 'CANDIDATE';

      state.appUser = {
        ...profileData,
        availableRoles,
        activeRole,
        role: activeRole, // sync legacy role field
      };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearUser(state) {
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
