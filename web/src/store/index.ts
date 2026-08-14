import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import uiReducer, { type Audience } from './slices/ui.slice';
import kanbanReducer from './slices/kanbanSlice';
import jobsReducer from './slices/jobsSlice';
import profileReducer from './slices/profileSlice';
import expertReducer from './slices/expertSlice';
import employerProfileReducer from './slices/employerProfileSlice';
import { profileApi } from '../features/profile/services/profileApi';
import { safeLocalStorage } from '../lib/safeStorage';

// ─── LocalStorage Persistence ─────────────────────────────────────
const loadKanbanState = () => {
  try {
    const serializedState = safeLocalStorage.getItem('kanban_state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

const persistedKanban = loadKanbanState();

const AUDIENCE_STORAGE_KEY = 'recruitzaa-audience-v1';
const loadAudience = (): Audience => {
  const stored = safeLocalStorage.getItem(AUDIENCE_STORAGE_KEY);
  return stored === 'job_seeker' || stored === 'employer' ? stored : null;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    kanban: kanbanReducer,
    profile: profileReducer,
    jobs: jobsReducer,
    expert: expertReducer,
    employerProfile: employerProfileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  preloadedState: {
    ...(persistedKanban ? { kanban: persistedKanban } : {}),
    ui: {
      toasts: [],
      activeModal: null,
      isSidebarCollapsed: false,
      isMobileDrawerOpen: false,
      audience: loadAudience(),
    },
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const saveKanbanState = (state: RootState['kanban']) => {
  try {
    const serializedState = JSON.stringify(state);
    const ok = safeLocalStorage.setItem('kanban_state', serializedState);
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error('Failed to serialize kanban state:', err);
  }
};

const saveJobsState = (jobsState: RootState['jobs']) => {
  try {
    const serialized = JSON.stringify(jobsState.jobsList);
    const ok = safeLocalStorage.setItem('recruitzaa_jobs', serialized);
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error('Failed to serialize jobs state:', err);
  }
};

const saveEmployerProfileState = (state: RootState) => {
  try {
    const ok = safeLocalStorage.setItem(
      'employer_profile_state',
      JSON.stringify(state.employerProfile.profile)
    );
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error('Failed to save employer profile:', err);
  }
};

const saveAudience = (audience: RootState['ui']['audience']) => {
  if (audience) {
    safeLocalStorage.setItem(AUDIENCE_STORAGE_KEY, audience);
  } else {
    safeLocalStorage.removeItem(AUDIENCE_STORAGE_KEY);
  }
};

store.subscribe(() => {
  saveKanbanState(store.getState().kanban);
  saveJobsState(store.getState().jobs);
  saveEmployerProfileState(store.getState());
  saveAudience(store.getState().ui.audience);
});
