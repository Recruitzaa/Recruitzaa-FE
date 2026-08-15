import api from '../lib/axios';

export interface ResumeVersion {
  url: string;
  filename: string;
  uploadedAt: string;
  isPrimary: boolean;
  fileSizeDisplay?: string;
}

export interface CandidateSkill {
  name: string;
  category?: string;
  yearsOfExperience?: number;
  isTopSkill?: boolean;
}

export interface CandidateExperience {
  company: string;
  role: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  skillsUsed?: string[];
}

export interface CandidateEducation {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  graduationYear?: number;
}

export interface CandidateProfileData {
  id: string;
  userId: string;
  displayName: string;
  headline?: string;
  bio?: string;
  summary?: string;
  skills: CandidateSkill[];
  skillsFlat: string[];
  experience: CandidateExperience[];
  education: CandidateEducation[];
  resumeVersions: ResumeVersion[];
  profileCompletionPct: number;
  availability?: string;
}

/**
 * Fetch candidate profile.
 */
export const getCandidateProfile = async (): Promise<CandidateProfileData> => {
  const { data } = await api.get<{ success: boolean; data: CandidateProfileData }>('/profile');
  return data.data;
};

/**
 * Update candidate profile.
 */
export const updateCandidateProfile = async (
  profileData: Partial<CandidateProfileData>
): Promise<CandidateProfileData> => {
  const { data } = await api.put<{ success: boolean; data: CandidateProfileData }>('/profile', profileData);
  return data.data;
};

/**
 * Upload resume file (multipart/form-data).
 */
export const uploadCandidateResume = async (file: File): Promise<ResumeVersion> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<{ success: boolean; data: ResumeVersion }>('/profile/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

/**
 * Delete resume version.
 */
export const deleteCandidateResume = async (versionId: string): Promise<void> => {
  await api.delete(`/profile/resume/${versionId}`);
};
