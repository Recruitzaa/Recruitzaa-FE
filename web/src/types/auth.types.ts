export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'EXPERT' | 'EMPLOYEE' | 'SUPER_ADMIN';

export interface AppUser {
  id: string;
  email: string;
  firebaseUid?: string;
  role: UserRole; // Keeps backward compatibility with existing code
  availableRoles: UserRole[]; // Now required — comes from Backend
  activeRole?: UserRole;
  displayName: string;
  photoURL?: string;
  phone?: string;
  location?: string;
  bio?: string;
  isCurrentlyEmployed?: boolean;
  currentCompany?: string;
  currentRole?: string;
  currentSalary?: string;
  noticePeriod?: string;
  summary?: string;
  skills?: string[];
  resumeFileName?: string;
  resumeFileSize?: string;
  isActive?: boolean;
}
