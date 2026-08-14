import { z } from 'zod';

/**
 * Typed, validated environment variables — the single source of truth for
 * every consumer (axios base URL, Firebase config, RTK Query base URL).
 * Other modules used to read `import.meta.env.VITE_*` directly with their
 * own ad-hoc fallbacks, which quietly drifted into three different API base
 * URLs across the app. Everything should import `env` instead.
 */
const envSchema = z.object({
  VITE_API_BASE_URL: z.string().trim().min(1).optional(),
  VITE_FIREBASE_API_KEY: z.string().trim().min(1).optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().trim().min(1).optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().trim().min(1).optional(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().trim().min(1).optional(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().trim().min(1).optional(),
  VITE_FIREBASE_APP_ID: z.string().trim().min(1).optional(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().trim().min(1).optional(),
  VITE_APP_NAME: z.string().trim().min(1).optional(),
  VITE_APP_ENV: z.enum(['development', 'production', 'test']).optional(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);
if (!parsedEnv.success) {
  console.error(
    'Invalid environment configuration, falling back to defaults:',
    parsedEnv.error.flatten().fieldErrors
  );
}
const raw = parsedEnv.success ? parsedEnv.data : {};

const isProd = Boolean(import.meta.env.PROD);

const firebaseConfigured = Boolean(
  raw.VITE_FIREBASE_API_KEY && raw.VITE_FIREBASE_PROJECT_ID && raw.VITE_FIREBASE_APP_ID
);

if (isProd && !firebaseConfigured) {
  console.error(
    'Firebase environment variables are missing in a production build — authentication will not work.'
  );
}

export const env = {
  API_BASE_URL: raw.VITE_API_BASE_URL || '/api',
  FIREBASE: {
    API_KEY: raw.VITE_FIREBASE_API_KEY || '',
    AUTH_DOMAIN: raw.VITE_FIREBASE_AUTH_DOMAIN || '',
    PROJECT_ID: raw.VITE_FIREBASE_PROJECT_ID || '',
    STORAGE_BUCKET: raw.VITE_FIREBASE_STORAGE_BUCKET || '',
    MESSAGING_SENDER_ID: raw.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    APP_ID: raw.VITE_FIREBASE_APP_ID || '',
    MEASUREMENT_ID: raw.VITE_FIREBASE_MEASUREMENT_ID || '',
    isConfigured: firebaseConfigured,
  },
  APP_NAME: raw.VITE_APP_NAME || 'Recruitzaa',
  APP_ENV: raw.VITE_APP_ENV || 'development',
  isDev: Boolean(import.meta.env.DEV),
  isProd,
};
