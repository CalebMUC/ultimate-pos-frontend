import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks for better caching
        manualChunks: {
          'vue-core':    ['vue', 'vue-router', 'pinia'],
          'charts':      ['chart.js', 'vue-chartjs'],
          'ui-libs':     ['sweetalert2', 'axios'],
          'xlsx':        ['xlsx'],
        },
      },
    },

    // Enable source maps only for staging (comment out for production)
    sourcemap: false,

    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
  },

  server: {
    port: 5173,
    // Proxy API requests in development to avoid CORS issues
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'https://localhost:7231',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
