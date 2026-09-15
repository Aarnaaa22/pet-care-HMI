import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Ensures deployment on GitHub Pages / Vercel / Netlify / subpaths resolves relative assets correctly
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
})
