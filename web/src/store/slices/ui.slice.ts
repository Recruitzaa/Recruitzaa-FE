import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// A failing request loop (or a Promise.all rejecting several ways at once)
// can otherwise push unbounded toasts and fill the viewport.
const MAX_TOASTS = 4;

export type Audience = 'job_seeker' | 'employer' | null;

export interface UIState {
  toasts: Toast[];
  activeModal: string | null;
  isSidebarCollapsed: boolean;
  isMobileDrawerOpen: boolean;
  // Which side of the two-sided marketplace a guest has self-identified as
  // via the UtilityBar toggle. `null` until they choose, so first-time
  // visitors (including employers landing on the candidate homepage) still
  // see both audiences represented in the nav and homepage.
  audience: Audience;
}

export const initialState: UIState = {
  toasts: [],
  activeModal: null,
  isSidebarCollapsed: false,
  isMobileDrawerOpen: false,
  audience: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: {
      // `prepare` keeps ID generation out of the reducer: Date.now()
      // collided for toasts dispatched in the same millisecond, which
      // produced duplicate React keys and made removeToast delete both.
      prepare: (toast: Omit<Toast, 'id'>) => ({ payload: { ...toast, id: nanoid() } }),
      reducer(state, action: PayloadAction<Toast>) {
        const isDuplicate = state.toasts.some(
          (t) => t.message === action.payload.message && t.type === action.payload.type
        );
        if (isDuplicate) return;

        state.toasts.push(action.payload);
        if (state.toasts.length > MAX_TOASTS) state.toasts.shift();
      },
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    openModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setMobileDrawer(state, action: PayloadAction<boolean>) {
      state.isMobileDrawerOpen = action.payload;
    },
    setAudience(state, action: PayloadAction<Audience>) {
      state.audience = action.payload;
    },
  },
});

export const {
  addToast,
  removeToast,
  openModal,
  closeModal,
  toggleSidebar,
  setMobileDrawer,
  setAudience,
} = uiSlice.actions;

export default uiSlice.reducer;
