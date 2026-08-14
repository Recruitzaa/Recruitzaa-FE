import { beforeEach, describe, expect, it, vi } from 'vitest';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../lib/axios', () => ({ default: api }));

import { getMe, logoutUser, registerUser, updateProfile, verifyUser } from './api.service';

const validUser = {
  id: 'user-1',
  email: 'jane@example.com',
  role: 'CANDIDATE',
  availableRoles: ['CANDIDATE'],
  displayName: 'Jane Doe',
};

describe('api.service response validation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns the user from a well-formed register response', async () => {
    api.post.mockResolvedValue({ data: { user: validUser, message: 'ok' } });
    await expect(registerUser('token', 'CANDIDATE')).resolves.toEqual(validUser);
  });

  it('returns the user from a well-formed verify response', async () => {
    api.post.mockResolvedValue({ data: { user: validUser, message: 'ok' } });
    await expect(verifyUser('token')).resolves.toEqual(validUser);
  });

  it('returns the user from a well-formed getMe response', async () => {
    api.get.mockResolvedValue({ data: validUser });
    await expect(getMe()).resolves.toEqual(validUser);
  });

  it('returns the user from a well-formed updateProfile response', async () => {
    api.put.mockResolvedValue({ data: validUser });
    await expect(updateProfile({ displayName: 'Jane Doe' })).resolves.toEqual(validUser);
  });

  it('returns the message from a well-formed logout response', async () => {
    api.post.mockResolvedValue({ data: { message: 'logged out' } });
    await expect(logoutUser()).resolves.toEqual({ message: 'logged out' });
  });

  it('rejects with a readable error when the backend response is missing required fields', async () => {
    api.get.mockResolvedValue({ data: { id: 'user-1' } }); // missing email, role, etc.
    await expect(getMe()).rejects.toThrow(/unexpected response/i);
  });

  it('rejects when the register response has an invalid role', async () => {
    api.post.mockResolvedValue({
      data: { user: { ...validUser, role: 'NOT_A_ROLE' }, message: 'ok' },
    });
    await expect(registerUser('token', 'CANDIDATE')).rejects.toThrow(/unexpected response/i);
  });
});
