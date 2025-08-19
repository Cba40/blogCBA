// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // indica que el root es `frontend/`
  server: {
    port: 5173,
    open: true,
  },
});