export type PipelineStage = 'APPLIED' | 'SCREENING' | 'INTERVIEWING' | 'OFFERED' | 'REJECTED';

export interface ApplicationCard {
  id: string;
  companyName: string;
  jobTitle: string;
  salaryEstimate: string;
  updatedAt: string;
  stage: PipelineStage;
}
