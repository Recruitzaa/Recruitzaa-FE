export interface RecommendedJob {
  id: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  matchedSkills: number;
}

export interface ActiveApplication {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  stageStatus: string;
  stageVariant: 'warning' | 'success' | 'error' | 'primary' | 'neutral';
  nextStep: string;
  isSuccessText?: boolean;
}
