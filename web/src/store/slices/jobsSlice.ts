import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
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
import { safeLocalStorage } from '../../lib/safeStorage';

interface JobsState {
  jobsList: Job[];
}

const loadJobsState = (): Job[] | null => {
  try {
    const serialized = safeLocalStorage.getItem('recruitzaa_jobs');
    if (serialized === null) return null;
    return JSON.parse(serialized);
  } catch {
    return null;
  }
};

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
