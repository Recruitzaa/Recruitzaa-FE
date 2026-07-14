import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppUser } from '../../types/auth.types';

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
      const savedProfile = localStorage.getItem(`profile_override_${action.payload.id}`);
      if (savedProfile) {
        state.appUser = { ...action.payload, ...JSON.parse(savedProfile) };
      } else {
        state.appUser = action.payload;
      }
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
        localStorage.setItem(`profile_override_${state.appUser.id}`, JSON.stringify(state.appUser));
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

export const { setUser, clearUser, updateUserProfile, setAuthLoading, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
