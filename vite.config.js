import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      treeshake: true,
      output: {
        /* ── Manual chunk splitting — breaks the 461 kB monolith ── */
        manualChunks(id) {
          /* Vendor: React core */
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          /* Vendor: Framer Motion (largest dep) */
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          /* Vendor: audio (howler.js) */
          if (id.includes('node_modules/howler')) {
            return 'audio-vendor';
          }
          /* Vendor: smooth scroll */
          if (id.includes('node_modules/lenis')) {
            return 'lenis';
          }
          /* Vendor: lucide-react — tree-shaken per icon, keep together */
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide';
          }
        },
      },
    },

    /* Enable minification + modern target for smaller bundles */
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,

    /* Sourcemap off for production (reduces deploy size) */
    sourcemap: false,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lenis'],
  },
})
