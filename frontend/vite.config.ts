import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-base-url',
      transformIndexHtml(html) {
        return html.replace(/href="imagenes\//g, 'href="/blog/imagenes/');
      },
    },
  ],
  base: '/blog/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});