import { describe, expect, it } from 'vitest';
import { env } from './env';

describe('env', () => {
  it('exposes a single API_BASE_URL with a same-origin fallback', () => {
    expect(typeof env.API_BASE_URL).toBe('string');
    expect(env.API_BASE_URL.length).toBeGreaterThan(0);
  });

  it('reports whether Firebase is fully configured', () => {
    expect(typeof env.FIREBASE.isConfigured).toBe('boolean');
    expect(env.FIREBASE.isConfigured).toBe(
      Boolean(env.FIREBASE.API_KEY && env.FIREBASE.PROJECT_ID && env.FIREBASE.APP_ID)
    );
  });

  it('normalizes APP_ENV to one of the known environments', () => {
    expect(['development', 'production', 'test']).toContain(env.APP_ENV);
  });
});
