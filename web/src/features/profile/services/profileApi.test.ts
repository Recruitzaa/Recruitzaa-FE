import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { profileApi } from './profileApi';

const profile = {
  userId: 'user-1',
  basicInfo: {
    name: 'Alex',
    phone: '123',
    email: 'alex@example.com',
    location: 'Hyderabad',
  },
  education: [],
  experience: [],
  skills: ['React'],
  preferences: {
    desiredRole: 'Engineer',
    locations: ['Remote'],
    salaryRange: { min: 10, max: 20 },
    workMode: 'remote' as const,
  },
};

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

describe('profileApi', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('loads and updates profile data with auth headers', async () => {
    localStorage.setItem('accessToken', 'token-123');
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = input instanceof Request ? input : new Request(input, init);
      const body = request.method === 'PATCH' ? { ...profile, ...(await request.json()) } : profile;
      return jsonResponse(body);
    });
    vi.stubGlobal('fetch', fetchMock);

    const store = configureStore({
      reducer: { [profileApi.reducerPath]: profileApi.reducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware),
    });

    const loaded = await store.dispatch(profileApi.endpoints.getProfile.initiate());
    expect(loaded.data?.basicInfo.name).toBe('Alex');

    const updated = await store.dispatch(
      profileApi.endpoints.updateProfile.initiate({
        basicInfo: { ...profile.basicInfo, location: 'Bangalore' },
      })
    );
    expect(updated.data?.basicInfo.location).toBe('Bangalore');

    expect(fetchMock).toHaveBeenCalled();
    const firstCall = fetchMock.mock.calls[0]?.[0];
    const request = firstCall instanceof Request ? firstCall : new Request(firstCall as string);
    expect(request.url).toContain('/profile/me');
    expect(request.headers.get('Authorization')).toBe('Bearer token-123');
  });
});
