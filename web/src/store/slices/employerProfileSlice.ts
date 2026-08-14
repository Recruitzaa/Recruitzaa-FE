import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { safeLocalStorage } from '../../lib/safeStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CompanyProfile {
  // Hero
  companyName: string;
  tagline: string;
  foundedYear: string;
  logoUrl: string;

  // Overview
  industry: string;
  companySize: string;
  companyType: string;
  hqLocation: string;
  website: string;

  // About
  about: string;

  // Culture & Perks
  perks: string[];

  // Social
  linkedIn: string;
  twitter: string;
  github: string;
  glassdoor: string;

  // Hiring POC
  pocName: string;
  pocDesignation: string;
  pocEmail: string;
  pocPhone: string;
}

interface EmployerProfileState {
  profile: CompanyProfile;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const defaultProfile: CompanyProfile = {
  companyName: 'recruitZaa Technologies',
  tagline: 'Connecting great talent with great companies through AI-driven hiring.',
  foundedYear: '2022',
  logoUrl: '',

  industry: 'HR Technology / SaaS',
  companySize: '51–200 employees',
  companyType: 'Startup',
  hqLocation: 'Bangalore, India',
  website: 'https://recruitzaa.com',

  about:
    'recruitZaa is an AI-first recruitment platform that helps employers find, screen, and hire top talent efficiently. Our smart ATS, automated pipeline, and intelligent candidate matching cut time-to-hire by up to 60%.',

  perks: [
    'Remote-Friendly',
    'Health Insurance',
    'ESOP / Equity',
    'Flexible Hours',
    'Learning Budget',
    '5-Day Work Week',
  ],

  linkedIn: 'https://linkedin.com/company/recruitzaa',
  twitter: 'https://twitter.com/recruitzaa',
  github: 'https://github.com/recruitzaa',
  glassdoor: '',

  pocName: 'Priya Sharma',
  pocDesignation: 'Head of Talent Acquisition',
  pocEmail: 'hiring@recruitzaa.com',
  pocPhone: '+91 98765 43210',
};

// ─── Hydrate from localStorage ────────────────────────────────────────────────
const loadPersistedProfile = (): CompanyProfile => {
  try {
    const raw = safeLocalStorage.getItem('employer_profile_state');
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CompanyProfile>;
      return { ...defaultProfile, ...parsed };
    }
  } catch {
    /* ignore */
  }
  return defaultProfile;
};

const initialState: EmployerProfileState = {
  profile: loadPersistedProfile(),
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const employerProfileSlice = createSlice({
  name: 'employerProfile',
  initialState,
  reducers: {
    /**
     * updateCompanyProfile — Accepts a partial CompanyProfile and deep-merges
     * it into the current profile state. Handles perk array updates too.
     */
    updateCompanyProfile(state, action: PayloadAction<Partial<CompanyProfile>>) {
      state.profile = { ...state.profile, ...action.payload };
    },
    resetCompanyProfile(state) {
      state.profile = defaultProfile;
    },
  },
});

export const { updateCompanyProfile, resetCompanyProfile } = employerProfileSlice.actions;
export default employerProfileSlice.reducer;
