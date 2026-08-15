/**
 * Maps Firebase Auth error codes (which arrive embedded in `Error.message`,
 * e.g. "Firebase: Error (auth/wrong-password).") to plain-language copy.
 * Falls back to the raw message so genuinely unexpected errors are still
 * visible rather than silently replaced with a generic string.
 */
const FIREBASE_AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Contact support for help.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/account-exists-with-different-credential':
    'An account already exists with this email using a different sign-in method.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Choose a stronger password (at least 6 characters).',
  'auth/requires-recent-login': 'Please sign in again to continue.',
  'auth/operation-not-allowed': 'This sign-in method is not currently available.',
};

/** Popup dismissals the user initiated on purpose — never worth surfacing as an error. */
export const isDismissedPopupError = (message: string) =>
  message.includes('popup-closed-by-user') || message.includes('cancelled-popup-request');

export function mapFirebaseAuthError(err: unknown, fallback: string): string {
  const message = err instanceof Error ? err.message : typeof err === 'string' ? err : '';
  const matchedCode = Object.keys(FIREBASE_AUTH_ERROR_MESSAGES).find((code) =>
    message.includes(code)
  );
  if (matchedCode) return FIREBASE_AUTH_ERROR_MESSAGES[matchedCode];
  return message || fallback;
}
