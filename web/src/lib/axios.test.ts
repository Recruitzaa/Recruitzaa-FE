import { AxiosError, AxiosHeaders, type AxiosAdapter } from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockAuth = vi.hoisted(() => ({
  currentUser: null as { getIdToken: (forceRefresh?: boolean) => Promise<string> } | null,
}));

vi.mock('../config/firebase', () => ({ auth: mockAuth }));

import api from './axios';

const okResponse = (config: Parameters<AxiosAdapter>[0]) => ({
  data: { ok: true },
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
});

describe('axios instance', () => {
  beforeEach(() => {
    localStorage.clear();
    mockAuth.currentUser = null;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const requestInterceptor = () => {
    const handlers = (
      api.interceptors.request as unknown as {
        handlers: Array<{ fulfilled: (config: unknown) => unknown }>;
      }
    ).handlers;
    return handlers[0].fulfilled;
  };

  it('attaches the Firebase ID token and active-role header to requests', async () => {
    mockAuth.currentUser = { getIdToken: vi.fn().mockResolvedValue('token-123') };
    localStorage.setItem('recruitzaa_active_role', 'EMPLOYER');

    const config = (await requestInterceptor()({ headers: new AxiosHeaders() })) as {
      headers: AxiosHeaders;
    };

    expect(config.headers.Authorization).toBe('Bearer token-123');
    expect(config.headers['X-Active-Role']).toBe('EMPLOYER');
  });

  it('continues without an Authorization header when getIdToken throws', async () => {
    mockAuth.currentUser = { getIdToken: vi.fn().mockRejectedValue(new Error('offline')) };

    const config = (await requestInterceptor()({ headers: new AxiosHeaders() })) as {
      headers: AxiosHeaders;
    };

    expect(config.headers.Authorization).toBeUndefined();
  });

  it('does not retry a non-retryable client error', async () => {
    const adapter: AxiosAdapter = vi.fn(async (config) => {
      throw new AxiosError(
        'Not Found',
        undefined,
        config,
        {},
        {
          status: 404,
          statusText: 'Not Found',
          data: {},
          headers: {},
          config,
        }
      );
    });
    api.defaults.adapter = adapter;

    await expect(api.get('/missing')).rejects.toMatchObject({ response: { status: 404 } });
    expect(adapter).toHaveBeenCalledTimes(1);
  });

  it('refreshes the Firebase token once on a 401 and retries the request', async () => {
    // Firebase caches the token after a forced refresh, so the retried
    // request's own (unforced) interceptor call also resolves to the fresh
    // token rather than issuing a second network fetch.
    mockAuth.currentUser = {
      getIdToken: vi.fn().mockResolvedValueOnce('stale-token').mockResolvedValue('fresh-token'),
    };

    let call = 0;
    const adapter: AxiosAdapter = vi.fn(async (config) => {
      call += 1;
      if (call === 1) {
        throw new AxiosError(
          'Unauthorized',
          undefined,
          config,
          {},
          {
            status: 401,
            statusText: 'Unauthorized',
            data: {},
            headers: {},
            config,
          }
        );
      }
      return okResponse(config);
    });
    api.defaults.adapter = adapter;

    const response = await api.get('/protected');

    expect(response.data).toEqual({ ok: true });
    expect(adapter).toHaveBeenCalledTimes(2);
    expect((adapter as ReturnType<typeof vi.fn>).mock.calls[1][0].headers.Authorization).toBe(
      'Bearer fresh-token'
    );
  });

  it('rejects with the original 401 when the token refresh itself fails', async () => {
    mockAuth.currentUser = {
      getIdToken: vi
        .fn()
        .mockResolvedValueOnce('stale-token')
        .mockRejectedValueOnce(new Error('refresh failed')),
    };

    const adapter: AxiosAdapter = vi.fn(async (config) => {
      throw new AxiosError(
        'Unauthorized',
        undefined,
        config,
        {},
        {
          status: 401,
          statusText: 'Unauthorized',
          data: {},
          headers: {},
          config,
        }
      );
    });
    api.defaults.adapter = adapter;

    await expect(api.get('/protected')).rejects.toMatchObject({ response: { status: 401 } });
    expect(adapter).toHaveBeenCalledTimes(1);
  });

  it('retries a transient network error with backoff before giving up', async () => {
    vi.useFakeTimers();
    const adapter: AxiosAdapter = vi.fn(async (config) => {
      throw new AxiosError('Network Error', 'ERR_NETWORK', config, {});
    });
    api.defaults.adapter = adapter;

    const pending = api.get('/flaky');
    const assertion = expect(pending).rejects.toMatchObject({ code: 'ERR_NETWORK' });

    await vi.runAllTimersAsync();
    await assertion;

    // Initial attempt + MAX_RETRIES (2) retries = 3 total calls.
    expect(adapter).toHaveBeenCalledTimes(3);
  });
});
