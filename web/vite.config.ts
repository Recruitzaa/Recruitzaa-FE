import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use root base during dev and repo-subpath for production builds
  base: command === 'serve' ? '/' : '/Recruitzaa-FE/',
}))
