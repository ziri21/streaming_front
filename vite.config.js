import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',  // Fix Node global
  },
  resolve: {
    alias: {
      cookie: false  // Désactive complètement cookie pour client bundle
    }
  },
  optimizeDeps: {
    exclude: ['cookie']
  },
  build: {
    rollupOptions: {
      external: ['cookie']
    }
  }
})
