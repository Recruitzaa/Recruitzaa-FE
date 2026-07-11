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
  isLoading: true,   // true on start — Firebase resolves session async
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AppUser>) {
      state.appUser = action.payload;
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
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
