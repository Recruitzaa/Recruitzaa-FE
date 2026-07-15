export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'SUPER_ADMIN';

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  photoURL?: string;
  phone?: string;
  location?: string;
  isCurrentlyEmployed?: boolean;
  currentCompany?: string;
  currentRole?: string;
  currentSalary?: string;
  noticePeriod?: string;
  summary?: string;
  skills?: string[];
  resumeFileName?: string;
  resumeFileSize?: string;
}
