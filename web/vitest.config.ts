import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    css: true,
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
