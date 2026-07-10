export type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'SUPER_ADMIN';

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  photoURL?: string;
}
