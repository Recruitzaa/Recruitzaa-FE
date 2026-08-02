import api from '../lib/axios';
import type { UserRole } from '../types/auth.types';

export interface AdminUser {
  id: string;
  email: string;
  firebaseUid: string;
  primaryRole: UserRole;
  availableRoles: UserRole[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
  photoUrl?: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  resumeFileName?: string;
  resumeFileSize?: string;
}

export interface AdminUserInput {
  primaryRole: UserRole;
  availableRoles: UserRole[];
  isActive: boolean;
  displayName?: string;
  phone?: string;
  location?: string;
  bio?: string;
}

export interface AdminUserCreateInput extends AdminUserInput {
  email: string;
  password: string;
  displayName: string;
}

export interface AdminUserPage {
  items: AdminUser[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ListAdminUsersParams {
  page: number;
  pageSize: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}

export const listAdminUsers = async (params: ListAdminUsersParams): Promise<AdminUserPage> => {
  const { data } = await api.get<AdminUserPage>('/admin/users', {
    params: {
      page: params.page,
      page_size: params.pageSize,
      search: params.search || undefined,
      role: params.role,
      is_active: params.isActive,
    },
  });
  return data;
};

export const updateAdminUserRoles = async (
  userId: string,
  primaryRole: UserRole,
  availableRoles: UserRole[]
): Promise<AdminUser> => {
  const { data } = await api.put<AdminUser>(`/admin/users/${userId}/roles`, {
    primaryRole,
    availableRoles,
  });
  return data;
};

export const updateAdminUserStatus = async (
  userId: string,
  isActive: boolean
): Promise<AdminUser> => {
  const { data } = await api.put<AdminUser>(`/admin/users/${userId}/status`, {
    isActive,
  });
  return data;
};

export const getAdminUser = async (userId: string): Promise<AdminUser> => {
  const { data } = await api.get<AdminUser>(`/admin/users/${userId}`);
  return data;
};

export const createAdminUser = async (input: AdminUserCreateInput): Promise<AdminUser> => {
  const { data } = await api.post<AdminUser>('/admin/users', input);
  return data;
};

export const updateAdminUser = async (
  userId: string,
  input: AdminUserInput
): Promise<AdminUser> => {
  const { data } = await api.put<AdminUser>(`/admin/users/${userId}`, input);
  return data;
};

export const deleteAdminUser = async (userId: string): Promise<void> => {
  await api.delete(`/admin/users/${userId}`);
};
