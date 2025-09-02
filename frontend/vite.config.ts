import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/blog/', // ✅ Esencial para que funcione en Don Web
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});