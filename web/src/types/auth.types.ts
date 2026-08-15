export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'EXPERT' | 'EMPLOYEE' | 'SUPER_ADMIN';

export interface AppUser {
  id: string;
  email: string;
  firebaseUid?: string;
  role: UserRole; // Keeps backward compatibility with existing code
  availableRoles: UserRole[]; // Now required — comes from Backend
  activeRole?: UserRole;
  displayName: string;
  photoUrl?: string | null;
  phone?: string | null;
  location?: string | null;
  bio?: string | null;
  isCurrentlyEmployed?: boolean | null;
  currentCompany?: string | null;
  currentRole?: string | null;
  currentSalary?: string | null;
  noticePeriod?: string | null;
  summary?: string | null;
  skills?: string[] | null;
  resumeFileName?: string | null;
  resumeFileSize?: string | null;
  isActive?: boolean | null;
}
