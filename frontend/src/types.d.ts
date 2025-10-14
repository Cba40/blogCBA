// src/types.d.ts

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  // Puedes agregar más variables aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}