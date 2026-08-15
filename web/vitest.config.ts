import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    css: true,
    // Deterministic, non-secret stand-ins for the VITE_* vars `src/config/env.ts`
    // reads. Without these, `import.meta.env.VITE_API_BASE_URL` is unset in any
    // environment without a local `.env` (e.g. CI), so it falls back to the
    // relative `/api` default — which throws `ERR_INVALID_URL` when RTK Query's
    // fetchBaseQuery constructs a URL from it under Node's fetch. Similarly,
    // an empty Firebase API key makes `getAuth()` throw synchronously on import,
    // which crashes any test that renders a route touching auth. Tests should
    // never depend on real secrets — these values are never used to reach a
    // real network or Firebase project.
    env: {
      VITE_API_BASE_URL: 'http://localhost:8000',
      VITE_FIREBASE_API_KEY: 'test-api-key',
      VITE_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com',
      VITE_FIREBASE_PROJECT_ID: 'test-project',
      VITE_FIREBASE_STORAGE_BUCKET: 'test-project.appspot.com',
      VITE_FIREBASE_MESSAGING_SENDER_ID: '000000000000',
      VITE_FIREBASE_APP_ID: '1:000000000000:web:0000000000000000000000',
    },
    coverage: {
      all: false,
      exclude: [
        'src/main.tsx',
        'src/routes/lazyPages.ts',
        'src/utils/safeLazy.ts',
        'src/lib/axios.ts',
        'src/services/auth.service.ts',
        'src/components/layout/DashboardLayout.tsx',
        'src/components/layout/DashboardLayoutUtils.ts',
        'src/components/layout/PortalLayout/**',
        'src/components/layout/AdminLayout/**',
        'src/components/layout/RecoveryShell/**',
        'src/pages/auth/AuthPage.tsx',
        'src/components/layout/Navbar/**',
        'src/components/layout/Footer/**',
        'src/pages/public/JobListingsPage.tsx',
        'src/pages/public/JobDetailPage.tsx',
      ],
      thresholds: {
        statements: 85,
        branches: 75,
        functions: 85,
        lines: 85,
      },
    },
  },
});
