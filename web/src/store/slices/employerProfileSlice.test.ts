import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('employerProfileSlice', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it('merges partial profile updates', async () => {
    const { default: reducer, updateCompanyProfile } = await import('./employerProfileSlice');
    const state = reducer(
      undefined,
      updateCompanyProfile({ companyName: 'Acme Labs', perks: ['Remote-Friendly'] })
    );
    expect(state.profile.companyName).toBe('Acme Labs');
    expect(state.profile.perks).toEqual(['Remote-Friendly']);
    expect(state.profile.website).toContain('recruitzaa.com');
  });

  it('hydrates persisted profile data on init', async () => {
    localStorage.setItem(
      'employer_profile_state',
      JSON.stringify({ companyName: 'Stored Co', tagline: 'Saved tagline' })
    );
    const { default: reducer } = await import('./employerProfileSlice');
    const state = reducer(undefined, { type: 'unknown' });
    expect(state.profile.companyName).toBe('Stored Co');
    expect(state.profile.tagline).toBe('Saved tagline');
  });

  it('resets to the default profile', async () => {
    const {
      default: reducer,
      resetCompanyProfile,
      updateCompanyProfile,
    } = await import('./employerProfileSlice');
    const updated = reducer(undefined, updateCompanyProfile({ companyName: 'Temporary' }));
    const reset = reducer(updated, resetCompanyProfile());
    expect(reset.profile.companyName).toBe('recruitZaa Technologies');
  });
});
