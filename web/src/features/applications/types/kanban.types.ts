export type PipelineStage = 'APPLIED' | 'SCREENING' | 'INTERVIEWING' | 'OFFERED' | 'REJECTED';

export interface ApplicationCard {
  id: string;
  companyName: string;
  jobTitle: string;
  salaryEstimate: string;
  updatedAt: string;
  stage: PipelineStage;
  owner: string;
  expectedResponse: string;
  nextAction: string;
}
