import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { MOCK_EXPERTS, type ExpertProfile } from '../../data/mockExperts';
import { safeLocalStorage } from '../../lib/safeStorage';

export interface BookedSession {
  id: string;
  expertId: string;
  expertName: string;
  serviceTierId: string;
  serviceTierName: string;
  price: number;
  dateTimeISO: string;
  timezone: string;
  preSessionBrief: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  bookedAtISO: string;
  candidateName?: string;
}

export interface ExpertSettings {
  maxSessionsPerWeek: number;
  googleCalendarConnected: boolean;
  outlookCalendarConnected: boolean;
  requirePreSessionBrief?: boolean;
}

interface ExpertState {
  directory: ExpertProfile[];
  bookings: BookedSession[];
  settings: ExpertSettings;
}

const loadState = <T>(key: string, fallback: T): T => {
  try {
    const serialized = safeLocalStorage.getItem(key);
    if (serialized === null) return fallback;
    return JSON.parse(serialized);
  } catch {
    return fallback;
  }
};

const saveState = <T>(key: string, value: T) => {
  try {
    const ok = safeLocalStorage.setItem(key, JSON.stringify(value));
    if (!ok) throw new Error('storage write failed');
  } catch (err) {
    console.error(`Failed to save key ${key}:`, err);
  }
};

const initialState: ExpertState = {
  directory: MOCK_EXPERTS,
  bookings: loadState<BookedSession[]>('recruitzaa_expert_bookings', [
    {
      id: 'bk1',
      expertId: 'exp1',
      expertName: 'Anjali Sharma',
      serviceTierId: 'st1_2',
      serviceTierName: 'Resume Review & Refactor',
      price: 2000,
      dateTimeISO: '2026-07-20T14:00:00.000Z',
      timezone: 'Asia/Kolkata',
      preSessionBrief: 'Need feedback on my Android architect resume projects.',
      status: 'Pending',
      bookedAtISO: '2026-07-16T12:00:00.000Z',
      candidateName: 'Arjun Kumar',
    },
  ]),
  settings: loadState<ExpertSettings>('recruitzaa_expert_settings', {
    maxSessionsPerWeek: 5,
    googleCalendarConnected: true,
    outlookCalendarConnected: false,
    requirePreSessionBrief: true,
  }),
};

const expertSlice = createSlice({
  name: 'expert',
  initialState,
  reducers: {
    bookSession(state, action: PayloadAction<BookedSession>) {
      state.bookings.unshift(action.payload);
      saveState('recruitzaa_expert_bookings', state.bookings);
    },
    cancelSession(state, action: PayloadAction<string>) {
      const idx = state.bookings.findIndex((b) => b.id === action.payload);
      if (idx !== -1) {
        state.bookings[idx].status = 'Cancelled';
        saveState('recruitzaa_expert_bookings', state.bookings);
      }
    },
    updateExpertSettings(state, action: PayloadAction<Partial<ExpertSettings>>) {
      state.settings = { ...state.settings, ...action.payload };
      saveState('recruitzaa_expert_settings', state.settings);
    },
    completeSession(state, action: PayloadAction<string>) {
      const idx = state.bookings.findIndex((b) => b.id === action.payload);
      if (idx !== -1) {
        state.bookings[idx].status = 'Completed';
        saveState('recruitzaa_expert_bookings', state.bookings);
      }
    },
  },
});

export const { bookSession, cancelSession, updateExpertSettings, completeSession } =
  expertSlice.actions;
export default expertSlice.reducer;
