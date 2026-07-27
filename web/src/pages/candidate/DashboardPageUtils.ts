import type { ApplicationCard } from '../../features/applications/types/kanban.types';
import type { ActiveApplication } from '../../data/mockDashboard';

export const mapReduxAppToActiveApp = (app: ApplicationCard): ActiveApplication => {
  let stageStatus = 'Applied';
  let stageVariant: ActiveApplication['stageVariant'] = 'neutral';
  let nextStep = 'Review in progress';
  let isSuccessText = false;

  switch (app.stage) {
    case 'APPLIED':
      stageStatus = 'Applied';
      stageVariant = 'primary';
      nextStep = 'Under initial review';
      break;
    case 'SCREENING':
      stageStatus = 'Screening';
      stageVariant = 'warning';
      nextStep = 'Resume screening';
      break;
    case 'INTERVIEWING':
      stageStatus = 'Interviewing';
      stageVariant = 'warning';
      nextStep =
        app.updatedAt.includes('Scheduled') || app.updatedAt.includes('Round')
          ? app.updatedAt
          : 'Interview session';
      break;
    case 'OFFERED':
      stageStatus = 'Offer Received';
      stageVariant = 'success';
      nextStep = app.updatedAt.includes('Deadline') ? app.updatedAt : 'Offer decision pending';
      isSuccessText = true;
      break;
    case 'REJECTED':
      stageStatus = 'Rejected';
      stageVariant = 'error';
      nextStep = 'Position closed';
      break;
  }

  return {
    id: app.id,
    company: app.companyName,
    role: app.jobTitle,
    appliedDate:
      app.updatedAt.includes('ago') || app.updatedAt.includes('now') ? 'Recent' : app.updatedAt,
    stageStatus,
    stageVariant,
    nextStep,
    isSuccessText,
  };
};
