import api from '../lib/axios';
import type { KanbanColumnId } from '../types/application.types';

export interface KanbanCardItem {
  id: string;
  applicationId?: string;
  candidateId: string;
  jobId: string;
  jobTitle: string;
  company: string;
  stage: KanbanColumnId;
  position: number;
  aiMatchScore?: number;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  updatedAt?: string;
  appliedAt?: string;
}

export interface KanbanBoardResponse {
  SAVED: KanbanCardItem[];
  APPLIED: KanbanCardItem[];
  SCREENING: KanbanCardItem[];
  INTERVIEW: KanbanCardItem[];
  OFFER: KanbanCardItem[];
  REJECTED: KanbanCardItem[];
}

/**
 * Fetch candidate's Kanban board grouped into 6 columns.
 */
export const getKanbanBoard = async (): Promise<KanbanBoardResponse> => {
  const { data } = await api.get<{ success: boolean; data: KanbanBoardResponse }>('/kanban');
  return data.data;
};

/**
 * Move a card to a new stage and/or position.
 */
export const moveKanbanCard = async (
  applicationId: string,
  toStage: KanbanColumnId,
  position?: number
): Promise<KanbanCardItem> => {
  const { data } = await api.put<{ success: boolean; data: KanbanCardItem }>('/kanban/move', {
    applicationId,
    toStage,
    position: position ?? 0,
  });
  return data.data;
};

/**
 * Bookmark/Save a job to the SAVED column.
 */
export const saveJobToKanban = async (jobId: string): Promise<KanbanCardItem> => {
  const { data } = await api.post<{ success: boolean; data: KanbanCardItem }>('/kanban/save', {
    jobId,
  });
  return data.data;
};

/**
 * Remove a job from SAVED column.
 */
export const removeSavedJobFromKanban = async (jobId: string): Promise<void> => {
  await api.delete(`/kanban/save/${jobId}`);
};
