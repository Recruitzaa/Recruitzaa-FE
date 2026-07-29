import { beforeEach, describe, expect, it, vi } from 'vitest';

import reducer, {
  bookSession,
  cancelSession,
  completeSession,
  updateExpertSettings,
  type BookedSession,
} from './expertSlice';

const session: BookedSession = {
  id: 'bk2',
  expertId: 'exp2',
  expertName: 'Expert Two',
  serviceTierId: 'st2',
  serviceTierName: 'Mock Interview',
  price: 1500,
  dateTimeISO: '2026-08-01T10:00:00.000Z',
  timezone: 'Asia/Kolkata',
  preSessionBrief: 'Need help with system design.',
  status: 'Pending',
  bookedAtISO: '2026-07-30T00:00:00.000Z',
};

describe('expertSlice', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('books, completes, and cancels sessions while persisting bookings', () => {
    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, bookSession(session));
    expect(state.bookings[0]).toEqual(session);
    expect(localStorage.getItem('recruitzaa_expert_bookings')).toContain('bk2');

    state = reducer(state, completeSession('bk2'));
    expect(state.bookings[0].status).toBe('Completed');

    state = reducer(state, cancelSession('bk2'));
    expect(state.bookings[0].status).toBe('Cancelled');
  });

  it('ignores cancel and complete when the booking id is missing', () => {
    const state = reducer(undefined, cancelSession('missing'));
    expect(state.bookings.every((booking) => booking.status === 'Pending')).toBe(true);
  });

  it('updates expert settings and persists them', () => {
    const state = reducer(
      undefined,
      updateExpertSettings({ maxSessionsPerWeek: 8, outlookCalendarConnected: true })
    );
    expect(state.settings.maxSessionsPerWeek).toBe(8);
    expect(state.settings.outlookCalendarConnected).toBe(true);
    expect(localStorage.getItem('recruitzaa_expert_settings')).toContain('"maxSessionsPerWeek":8');
  });

  it('falls back when localStorage write fails', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const state = reducer(undefined, updateExpertSettings({ requirePreSessionBrief: false }));
    expect(state.settings.requirePreSessionBrief).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to save key recruitzaa_expert_settings:',
      expect.any(Error)
    );
  });

  it('falls back when localStorage contains invalid JSON', async () => {
    localStorage.setItem('recruitzaa_expert_bookings', '{bad-json');
    vi.resetModules();
    const { default: freshReducer } = await import('./expertSlice');
    const state = freshReducer(undefined, { type: 'unknown' });
    expect(state.bookings[0]?.expertName).toBe('Anjali Sharma');
  });
});
