export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'EXPERT' | 'EMPLOYEE' | 'SUPER_ADMIN';

export interface AppUser {
  id: string;
  email: string;
  role: UserRole; // Keeps backward compatibility with existing code
  availableRoles?: UserRole[];
  activeRole?: UserRole;
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
