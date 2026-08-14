import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { env } from './env';

const firebaseConfig = {
  apiKey: env.FIREBASE.API_KEY,
  authDomain: env.FIREBASE.AUTH_DOMAIN,
  projectId: env.FIREBASE.PROJECT_ID,
  storageBucket: env.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
  appId: env.FIREBASE.APP_ID,
  measurementId: env.FIREBASE.MEASUREMENT_ID,
};

// Prevent duplicate app initialization (Vite HMR safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const linkedinProvider = new OAuthProvider('oidc.linkedin');

// Analytics is browser-only and needs a real measurement ID; guard both so
// SSR/node environments and unconfigured (test/local) builds don't throw.
export const analytics =
  typeof window !== 'undefined' && env.FIREBASE.isConfigured && env.FIREBASE.MEASUREMENT_ID
    ? getAnalytics(app)
    : null;

export default app;
