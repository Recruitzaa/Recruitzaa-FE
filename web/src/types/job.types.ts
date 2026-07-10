export type JobStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  workMode: 'REMOTE' | 'HYBRID' | 'ONSITE';
  description: string;
  tags: string[];
  postedAt: string;
  status: JobStatus;
  aiMatchScore?: number;
}

export interface PostedJob extends Job {
  employerId: string;
  applicantsCount: number;
  submittedAt: string;
  reviewNote?: string;
}

export interface JobFilter {
  keyword?: string;
  location?: string;
  jobType?: string;
  workMode?: string;
  minSalary?: number;
  maxSalary?: number;
  postedWithin?: number; // days
}
