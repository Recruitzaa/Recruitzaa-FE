import { beforeEach, describe, expect, it, vi } from 'vitest';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../lib/axios', () => ({ default: api }));

import {
  createAdminUser,
  deleteAdminUser,
  getAdminUser,
  listAdminUsers,
  updateAdminUser,
  updateAdminUserRoles,
  updateAdminUserStatus,
} from './admin-users.service';

describe('admin users service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lists users with server-side filters', async () => {
    api.get.mockResolvedValue({ data: { items: [], total: 0 } });
    await listAdminUsers({
      page: 2,
      pageSize: 20,
      search: 'alex',
      role: 'EMPLOYER',
      isActive: false,
    });
    expect(api.get).toHaveBeenCalledWith('/admin/users', {
      params: {
        page: 2,
        page_size: 20,
        search: 'alex',
        role: 'EMPLOYER',
        is_active: false,
      },
    });
  });

  it('uses detail, atomic update, create, and delete contracts', async () => {
    const input = {
      email: 'user@example.com',
      password: 'password123',
      displayName: 'User',
      primaryRole: 'CANDIDATE' as const,
      availableRoles: ['CANDIDATE' as const],
      isActive: true,
    };
    api.get.mockResolvedValue({ data: { id: '1' } });
    api.post.mockResolvedValue({ data: { id: '1' } });
    api.put.mockResolvedValue({ data: { id: '1' } });
    api.delete.mockResolvedValue({ data: undefined });

    await getAdminUser('1');
    await createAdminUser(input);
    await updateAdminUser('1', input);
    await deleteAdminUser('1');

    expect(api.get).toHaveBeenCalledWith('/admin/users/1');
    expect(api.post).toHaveBeenCalledWith('/admin/users', input);
    expect(api.put).toHaveBeenCalledWith('/admin/users/1', input);
    expect(api.delete).toHaveBeenCalledWith('/admin/users/1');
  });

  it('updates legacy role and status endpoints', async () => {
    api.put.mockResolvedValue({ data: { id: '1' } });
    await updateAdminUserRoles('1', 'EMPLOYER', ['EMPLOYER']);
    await updateAdminUserStatus('1', false);
    expect(api.put).toHaveBeenCalledWith('/admin/users/1/roles', {
      primaryRole: 'EMPLOYER',
      availableRoles: ['EMPLOYER'],
    });
    expect(api.put).toHaveBeenCalledWith('/admin/users/1/status', { isActive: false });
  });
});
