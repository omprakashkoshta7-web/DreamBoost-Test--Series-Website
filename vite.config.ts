import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
      '@app': `${__dirname}/src/app`,
      '@features': `${__dirname}/src/features`,
      '@shared': `${__dirname}/src/shared`,
      '@store': `${__dirname}/src/store`,
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
    proxy: {
      '/api': {
        target: 'https://backend-microservices-testseries.onrender.com',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
