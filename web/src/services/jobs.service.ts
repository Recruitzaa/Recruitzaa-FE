import api from '../lib/axios';
import type { Job, JobFilter, PostedJob } from '../types/job.types';

export interface PaginatedJobs {
  items: Job[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CreateJobInput {
  title: string;
  description: string;
  requirements?: string[];
  location: string;
  jobType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  workMode?: 'REMOTE' | 'HYBRID' | 'ONSITE';
  salaryMin?: number;
  salaryMax?: number;
  tags?: string[];
}

export interface UpdateJobInput extends Partial<CreateJobInput> {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
}

/**
 * Search and filter active jobs.
 */
export const searchJobs = async (params: JobFilter & { page?: number; pageSize?: number } = {}): Promise<PaginatedJobs> => {
  const { data } = await api.get<{ success: boolean; data: PaginatedJobs }>('/jobs', {
    params: {
      keyword: params.keyword,
      location: params.location,
      job_type: params.jobType,
      work_mode: params.workMode,
      min_salary: params.minSalary,
      max_salary: params.maxSalary,
      posted_within: params.postedWithin,
      page: params.page ?? 1,
      page_size: params.pageSize ?? 20,
    },
  });
  return data.data;
};

/**
 * Fetch a single job details by ID.
 */
export const getJobById = async (jobId: string): Promise<Job> => {
  const { data } = await api.get<{ success: boolean; data: Job }>(`/jobs/${jobId}`);
  return data.data;
};

/**
 * Post a new job (Employer / Admin).
 */
export const createJob = async (input: CreateJobInput): Promise<PostedJob> => {
  const { data } = await api.post<{ success: boolean; data: PostedJob }>('/jobs', input);
  return data.data;
};

/**
 * Update an existing job (Employer / Admin).
 */
export const updateJob = async (jobId: string, input: UpdateJobInput): Promise<PostedJob> => {
  const { data } = await api.put<{ success: boolean; data: PostedJob }>(`/jobs/${jobId}`, input);
  return data.data;
};

/**
 * Close / Delete a job.
 */
export const deleteJob = async (jobId: string): Promise<void> => {
  await api.delete(`/jobs/${jobId}`);
};
