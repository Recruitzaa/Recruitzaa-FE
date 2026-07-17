import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ApplicationCard,
  PipelineStage,
} from '../../features/applications/types/kanban.types';
import { MOCK_KANBAN_APPLICATIONS } from '../../data/mockKanban';

interface KanbanState {
  applications: ApplicationCard[];
}

const initialState: KanbanState = {
  applications: MOCK_KANBAN_APPLICATIONS,
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
