import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      // All /api/* requests will be forwarded to the Express backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,  // Fixes the Host header so the server accepts it
        secure: false,       // Allow non-HTTPS targets during development
      }
    }
  }
})
