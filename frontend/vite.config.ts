import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/blog/', // ✅ Esencial para que funcione en /blog/
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});