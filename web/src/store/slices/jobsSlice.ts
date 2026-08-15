import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/** Where the role is worked from — Remote / Hybrid / On-Site. Distinct from `employmentType`. */
export type Workplace = 'Remote' | 'Hybrid' | 'On-Site';

/** The actual employment arrangement, independent of `workplace`. */
export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'TEMPORARY';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  /** Remote / Hybrid / On-Site — kept as a free-form string for legacy/demo data tolerance. */
  workplace: string;
  employmentType: EmploymentType;
  /** Display string, e.g. "₹18,00,000 - ₹26,00,000 LPA". */
  salary: string;
  /** Structured salary bounds (annual, same currency as `salary`) for real sorting/filtering. */
  salaryMin: number;
  salaryMax: number;
  /** Display string, e.g. "2 hours ago". */
  postedAt: string;
  /** ISO 8601 timestamp — the source of truth for "Newest" sorting. */
  postedAtIso: string;
  /** Minimum/maximum years of experience expected, for structured filtering. */
  experienceMin: number;
  experienceMax: number;
  matchScore: number;
  tags: string[];
  avatarText: string;
  avatarColor: string;
  isPriority: boolean;
  description?: string;
  source?: string;
  verifiedAt?: string;
  requirements?: string[];
  status: 'Active' | 'Draft' | 'Closed';
}

import { MOCK_JOBS } from '../../data/mockJobs';
import { loadPersisted } from '../../lib/persist';
import {
  JOBS_STORAGE_KEY,
  JOBS_STORAGE_VERSION,
  identityMigrate,
  jobsListSchema,
} from '../persistedState.schemas';

interface JobsState {
  jobsList: Job[];
}

const loadJobsState = (): Job[] | null =>
  loadPersisted({
    key: JOBS_STORAGE_KEY,
    version: JOBS_STORAGE_VERSION,
    schema: jobsListSchema,
    migrate: identityMigrate,
  });

const initialJobs: Job[] = loadJobsState() || MOCK_JOBS;

const initialState: JobsState = {
  jobsList: initialJobs,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addNewJob(state, action: PayloadAction<Job>) {
      state.jobsList.unshift(action.payload);
    },
    updateJobStatus(
      state,
      action: PayloadAction<{ id: string; status: 'Active' | 'Draft' | 'Closed' }>
    ) {
      const job = state.jobsList.find((j) => j.id === action.payload.id);
      if (job) {
        job.status = action.payload.status;
      }
    },
    deleteJob(state, action: PayloadAction<string>) {
      state.jobsList = state.jobsList.filter((j) => j.id !== action.payload);
    },
  },
});

export const { addNewJob, updateJobStatus, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;
