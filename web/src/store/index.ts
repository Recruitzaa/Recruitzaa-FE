import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import uiReducer from './slices/ui.slice';
import kanbanReducer from './slices/kanban.slice';
import jobsReducer from './slices/jobs.slice';
import { profileApi } from '../features/profile/services/profileApi';

// ─── LocalStorage Persistence ─────────────────────────────────────
const loadKanbanState = () => {
  try {
    const serializedState = localStorage.getItem('kanban_state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveKanbanState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('kanban_state', serializedState);
  } catch (err) {
    console.error('Failed to serialize kanban state:', err);
  }
};

const persistedKanban = loadKanbanState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    kanban: kanbanReducer,
    jobs: jobsReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  preloadedState: persistedKanban ? { kanban: persistedKanban } : undefined,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware),
});

store.subscribe(() => {
  saveKanbanState(store.getState().kanban);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
