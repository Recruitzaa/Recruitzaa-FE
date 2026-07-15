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
  status: 'Active' | 'Draft' | 'Closed';
}

interface JobsState {
  jobsList: Job[];
}

const loadJobsState = (): Job[] | null => {
  try {
    const serialized = localStorage.getItem('recruitzaa_jobs');
    if (serialized === null) return null;
    return JSON.parse(serialized);
  } catch (err) {
    return null;
  }
};

const initialJobs: Job[] = loadJobsState() || [
  {
    id: '1',
    title: 'Senior React Native Engineer',
    company: 'Infosys Limited',
    location: 'Bangalore, KA',
    type: 'Hybrid',
    salary: '₹18,00,000 - ₹26,00,000 LPA',
    postedAt: '2 hours ago',
    matchScore: 94,
    tags: ['React Native', 'TypeScript', 'Redux Toolkit', '5+ Years Exp'],
    avatarText: 'INF',
    avatarColor: '#0F172A',
    isPriority: true,
    status: 'Active',
  },
  {
    id: '2',
    title: 'Mobile Application Specialist',
    company: 'Zomato Media Pvt. Ltd.',
    location: 'Gurugram, HR',
    type: 'Remote',
    salary: '₹20,00,000 - ₹30,00,000 LPA',
    postedAt: '5 hours ago',
    matchScore: 91,
    tags: ['React Native', 'iOS Pipeline', 'GraphQL', 'Expo'],
    avatarText: 'ZOM',
    avatarColor: '#854D0E',
    isPriority: false,
    status: 'Active',
  },
  {
    id: '3',
    title: 'Lead Mobile Frontend Architect',
    company: 'Flipkart Internet Pvt. Ltd.',
    location: 'Bangalore, KA',
    type: 'On-Site',
    salary: '₹28,00,000 - ₹38,00,000 LPA',
    postedAt: '1 day ago',
    matchScore: 86,
    tags: ['React Native Architecture', 'Performance Tuning', 'Android / iOS', '7+ Years Exp'],
    avatarText: 'FLP',
    avatarColor: '#1E3A8A',
    isPriority: false,
    status: 'Active',
  },
];

const initialState: JobsState = {
  jobsList: initialJobs,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob(state, action: PayloadAction<Job>) {
      state.jobsList.unshift(action.payload);
      try {
        localStorage.setItem('recruitzaa_jobs', JSON.stringify(state.jobsList));
      } catch (err) {
        console.error('Failed to save jobs state:', err);
      }
    },
    updateJobStatus(
      state,
      action: PayloadAction<{ id: string; status: 'Active' | 'Draft' | 'Closed' }>
    ) {
      const job = state.jobsList.find((j) => j.id === action.payload.id);
      if (job) {
        job.status = action.payload.status;
        try {
          localStorage.setItem('recruitzaa_jobs', JSON.stringify(state.jobsList));
        } catch (err) {
          console.error('Failed to save jobs state:', err);
        }
      }
    },
    deleteJob(state, action: PayloadAction<string>) {
      state.jobsList = state.jobsList.filter((j) => j.id !== action.payload);
      try {
        localStorage.setItem('recruitzaa_jobs', JSON.stringify(state.jobsList));
      } catch (err) {
        console.error('Failed to save jobs state:', err);
      }
    },
  },
});

export const { addJob, updateJobStatus, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;
