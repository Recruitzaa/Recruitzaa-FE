import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  // Use root base for custom domain deployments
  base: '/',
  server: {
    allowedHosts: true as const,
  }
}))
