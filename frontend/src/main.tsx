// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Importado
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> {/* ✅ Envuelve toda la app */}
      <App />
    </HelmetProvider>
  </StrictMode>
);
