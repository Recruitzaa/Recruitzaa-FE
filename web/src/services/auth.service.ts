import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, linkedinProvider } from '../config/firebase';

// ─── Social Providers Sign-In ─────────────────────────────────────
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signInWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  return result.user;
};

export const signInWithLinkedIn = async () => {
  const result = await signInWithPopup(auth, linkedinProvider);
  return result.user;
};

// ─── Email / Password ────────────────────────────────────────────
export const signInWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const registerWithEmail = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

// ─── Sign Out ────────────────────────────────────────────────────
export const logOut = async () => {
  await signOut(auth);
};

// ─── Auth State Observer ─────────────────────────────────────────
export const subscribeToAuthState = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

// ─── Get fresh ID token (for API calls) ─────────────────────────
export const getIdToken = async (forceRefresh = false) => {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken(forceRefresh);
};
