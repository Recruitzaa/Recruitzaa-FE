import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface UIState {
  toasts: Toast[];
  activeModal: string | null;
  isSidebarCollapsed: boolean;
  isMobileDrawerOpen: boolean;
}

const initialState: UIState = {
  toasts: [],
  activeModal: null,
  isSidebarCollapsed: false,
  isMobileDrawerOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
      state.toasts.push({
        ...action.payload,
        id: Date.now().toString(),
      });
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
  },
});

export const {
  addToast,
  removeToast,
  openModal,
  closeModal,
  toggleSidebar,
  setMobileDrawer,
} = uiSlice.actions;

export default uiSlice.reducer;
