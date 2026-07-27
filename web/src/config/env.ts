/**
 * Typed environment variables helper.
 * Validates variables are set or falls back to sensible defaults.
 */
export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://your-backend-api.com/api',
  FIREBASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || '',
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || '',
    MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  },
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Recruitzaa',
  APP_ENV: (import.meta.env.VITE_APP_ENV as 'development' | 'production' | 'test') || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
