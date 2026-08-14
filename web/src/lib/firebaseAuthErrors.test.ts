import { describe, expect, it } from 'vitest';
import { isDismissedPopupError, mapFirebaseAuthError } from './firebaseAuthErrors';

describe('mapFirebaseAuthError', () => {
  it('maps known Firebase auth codes to plain language', () => {
    expect(mapFirebaseAuthError(new Error('auth/wrong-password'), 'fallback')).toBe(
      'Incorrect email or password.'
    );
    expect(mapFirebaseAuthError(new Error('auth/user-not-found'), 'fallback')).toBe(
      'Incorrect email or password.'
    );
    expect(
      mapFirebaseAuthError(new Error('Firebase: Error (auth/too-many-requests).'), 'fallback')
    ).toBe('Too many attempts. Please wait a moment and try again.');
  });

  it('falls back to the raw message for unmapped errors', () => {
    expect(mapFirebaseAuthError(new Error('Something weird happened'), 'fallback')).toBe(
      'Something weird happened'
    );
  });

  it('falls back to the provided fallback for empty/non-Error values', () => {
    expect(mapFirebaseAuthError(undefined, 'fallback')).toBe('fallback');
    expect(mapFirebaseAuthError(null, 'fallback')).toBe('fallback');
  });
});

describe('isDismissedPopupError', () => {
  it('recognizes user-dismissed popup errors', () => {
    expect(isDismissedPopupError('auth/popup-closed-by-user')).toBe(true);
    expect(isDismissedPopupError('auth/cancelled-popup-request')).toBe(true);
  });

  it('does not flag other errors as dismissed popups', () => {
    expect(isDismissedPopupError('auth/wrong-password')).toBe(false);
  });
});
