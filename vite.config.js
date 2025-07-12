import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['monaco-editor']
  },
  build: {
    rollupOptions: {
      external: []
    }
  },
  ssr: {
    noExternal: ['monaco-editor']
  },
  define: {
    global: 'globalThis'
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  worker: {
    format: 'es'
  }
});