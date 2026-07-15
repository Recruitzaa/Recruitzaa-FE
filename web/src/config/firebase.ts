import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyCzBFu6igl5PAxPo5MgSWAXbV0Bkd3nN3w',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'recruitzaa.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'recruitzaa',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'recruitzaa.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '800150217027',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:800150217027:web:96eb7929d82bad17bd4ff6',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? 'G-PM2WSH079Q',
};

// Prevent duplicate app initialization (Vite HMR safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const linkedinProvider = new OAuthProvider('oidc.linkedin');

// Analytics is browser-only; guard for SSR/node environments
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
