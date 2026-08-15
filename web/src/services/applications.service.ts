import api from '../lib/axios';
import type { Application, KanbanColumnId } from '../types/application.types';

export interface ApplyJobPayload {
  resumeUrl?: string;
  coverNote?: string;
}

/**
 * Apply to a job listing.
 */
export const applyToJob = async (jobId: string, payload: ApplyJobPayload = {}): Promise<Application> => {
  const { data } = await api.post<{ success: boolean; data: Application }>(`/jobs/${jobId}/apply`, payload);
  return data.data;
};

/**
 * Fetch candidate's applications list.
 */
export const getMyApplications = async (stage?: KanbanColumnId): Promise<Application[]> => {
  const { data } = await api.get<{ success: boolean; data: Application[] }>('/applications', {
    params: { stage },
  });
  return data.data;
};

/**
 * Update application stage.
 */
export const updateApplicationStage = async (applicationId: string, stage: KanbanColumnId): Promise<Application> => {
  const { data } = await api.patch<{ success: boolean; data: Application }>(`/applications/${applicationId}/stage`, {
    stage,
  });
  return data.data;
};

/**
 * Withdraw an active application.
 */
export const withdrawApplication = async (applicationId: string): Promise<void> => {
  await api.post(`/applications/${applicationId}/withdraw`);
};
