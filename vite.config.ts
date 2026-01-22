import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/app-sprint-chronoai-26/' : '/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    open: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
    open: true,
  },
})
