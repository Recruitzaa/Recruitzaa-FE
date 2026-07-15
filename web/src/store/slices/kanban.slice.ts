import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ApplicationCard,
  PipelineStage,
} from '../../features/applications/types/kanban.types';

interface KanbanState {
  applications: ApplicationCard[];
}

const initialState: KanbanState = {
  applications: [
    {
      id: 'a1',
      companyName: 'Microsoft',
      jobTitle: 'Sr. React Native Engineer',
      salaryEstimate: '₹28 – 38 LPA',
      updatedAt: 'Saved 2d ago',
      stage: 'APPLIED',
    },
    {
      id: 'a2',
      companyName: 'Amazon',
      jobTitle: 'Mobile App Engineer',
      salaryEstimate: '₹24 – 32 LPA',
      updatedAt: 'Saved 4d ago',
      stage: 'APPLIED',
    },
    {
      id: 'a3',
      companyName: 'Infosys Limited',
      jobTitle: 'Senior React Native Developer',
      salaryEstimate: '₹18 – 26 LPA',
      updatedAt: 'Submitted Jul 1',
      stage: 'SCREENING',
    },
    {
      id: 'a4',
      companyName: 'TCS Digital',
      jobTitle: 'React Native Lead',
      salaryEstimate: '₹22 – 32 LPA',
      updatedAt: 'Call Scheduled Jul 14',
      stage: 'INTERVIEWING',
    },
    {
      id: 'a5',
      companyName: 'Zomato Media',
      jobTitle: 'Senior Mobile Engineer',
      salaryEstimate: '₹20 – 30 LPA',
      updatedAt: 'Round 2 Jul 18',
      stage: 'INTERVIEWING',
    },
    {
      id: 'a6',
      companyName: 'Razorpay',
      jobTitle: 'Staff Mobile Engineer',
      salaryEstimate: '₹32 LPA Fixed',
      updatedAt: 'Deadline Jul 20',
      stage: 'OFFERED',
    },
  ],
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    updateApplicationStage(state, action: PayloadAction<{ id: string; stage: PipelineStage }>) {
      const { id, stage } = action.payload;
      const application = state.applications.find((app) => app.id === id);
      if (application) {
        application.stage = stage;
        application.updatedAt = 'Moved just now';
      }
    },
    addApplication(state, action: PayloadAction<Omit<ApplicationCard, 'stage' | 'updatedAt'>>) {
      const { id, companyName, jobTitle, salaryEstimate } = action.payload;
      // Prevent duplicate applications
      if (state.applications.some((app) => app.id === id)) return;
      state.applications.unshift({
        id,
        companyName,
        jobTitle,
        salaryEstimate,
        updatedAt: 'Submitted just now',
        stage: 'APPLIED',
      });
    },
  },
});

export const { updateApplicationStage, addApplication } = kanbanSlice.actions;
export default kanbanSlice.reducer;
