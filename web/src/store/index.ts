import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import uiReducer, { initialState as uiInitialState } from './slices/ui.slice';
import kanbanReducer from './slices/kanbanSlice';
import jobsReducer from './slices/jobsSlice';
import profileReducer, { type ProfileState } from './slices/profileSlice';
import expertReducer from './slices/expertSlice';
import employerProfileReducer from './slices/employerProfileSlice';
import { loadPersisted, savePersisted, removePersisted } from '../lib/persist';
import {
  AUDIENCE_STORAGE_KEY,
  AUDIENCE_STORAGE_VERSION,
  EMPLOYER_PROFILE_STORAGE_KEY,
  EMPLOYER_PROFILE_STORAGE_VERSION,
  JOBS_STORAGE_KEY,
  JOBS_STORAGE_VERSION,
  KANBAN_STORAGE_KEY,
  KANBAN_STORAGE_VERSION,
  PROFILE_STORAGE_KEY,
  PROFILE_STORAGE_VERSION,
  audienceSchema,
  identityMigrate,
  kanbanStateSchema,
  profileStateSchema,
} from './persistedState.schemas';

// ─── LocalStorage Persistence ─────────────────────────────────────
const loadKanbanState = () =>
  loadPersisted({
    key: KANBAN_STORAGE_KEY,
    version: KANBAN_STORAGE_VERSION,
    schema: kanbanStateSchema,
    migrate: identityMigrate,
  });

const persistedKanban = loadKanbanState();

const loadAudience = () =>
  loadPersisted({
    key: AUDIENCE_STORAGE_KEY,
    version: AUDIENCE_STORAGE_VERSION,
    schema: audienceSchema,
    migrate: identityMigrate,
  }) ?? null;

const loadProfileState = () =>
  loadPersisted({
    key: PROFILE_STORAGE_KEY,
    version: PROFILE_STORAGE_VERSION,
    schema: profileStateSchema,
    migrate: identityMigrate,
  });

const persistedProfile = loadProfileState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    kanban: kanbanReducer,
    profile: profileReducer,
    jobs: jobsReducer,
    expert: expertReducer,
    employerProfile: employerProfileReducer,
  },
  preloadedState: {
    // Cast needed: feeding a concretely-typed (Zod-inferred) value into a
    // single slice of `preloadedState` confuses RTK's `configureStore`
    // generic inference (it starts comparing unrelated instantiations of its
    // own internal `Reducer`/`GetDefaultMiddleware` types). The runtime
    // value is still fully schema-validated by loadPersisted() above.
    kanban: (persistedKanban ?? undefined) as never,
    profile: (persistedProfile ?? undefined) as never,
    ui: {
      ...uiInitialState,
      audience: loadAudience(),
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const saveKanbanState = (state: RootState['kanban']) => {
  try {
    const ok = savePersisted(KANBAN_STORAGE_KEY, KANBAN_STORAGE_VERSION, state);
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error('Failed to serialize kanban state:', err);
  }
};

const saveJobsState = (jobsState: RootState['jobs']) => {
  try {
    const ok = savePersisted(JOBS_STORAGE_KEY, JOBS_STORAGE_VERSION, jobsState.jobsList);
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error('Failed to serialize jobs state:', err);
  }
};

const saveEmployerProfileState = (state: RootState) => {
  try {
    const ok = savePersisted(
      EMPLOYER_PROFILE_STORAGE_KEY,
      EMPLOYER_PROFILE_STORAGE_VERSION,
      state.employerProfile.profile
    );
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error('Failed to save employer profile:', err);
  }
};

const saveAudience = (audience: RootState['ui']['audience']) => {
  if (audience) {
    savePersisted(AUDIENCE_STORAGE_KEY, AUDIENCE_STORAGE_VERSION, audience);
  } else {
    removePersisted(AUDIENCE_STORAGE_KEY);
  }
};

const saveProfileState = (profile: ProfileState) => {
  try {
    const ok = savePersisted(PROFILE_STORAGE_KEY, PROFILE_STORAGE_VERSION, profile);
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
};

// Dirty-check against the previous reference for each persisted slice so a
// dispatch anywhere in the app (a toast, an unrelated profile edit, an RTK
// Query cache update) doesn't re-serialize and re-write every persisted key
// on every single action.
let lastKanban = store.getState().kanban;
let lastJobs = store.getState().jobs;
let lastEmployerProfile = store.getState().employerProfile.profile;
let lastAudience = store.getState().ui.audience;
let lastProfile = store.getState().profile;

store.subscribe(() => {
  const state = store.getState();

  if (state.kanban !== lastKanban) {
    lastKanban = state.kanban;
    saveKanbanState(state.kanban);
  }
  if (state.jobs !== lastJobs) {
    lastJobs = state.jobs;
    saveJobsState(state.jobs);
  }
  if (state.employerProfile.profile !== lastEmployerProfile) {
    lastEmployerProfile = state.employerProfile.profile;
    saveEmployerProfileState(state);
  }
  if (state.ui.audience !== lastAudience) {
    lastAudience = state.ui.audience;
    saveAudience(state.ui.audience);
  }
  if (state.profile !== lastProfile) {
    lastProfile = state.profile;
    saveProfileState(state.profile);
  }
});
