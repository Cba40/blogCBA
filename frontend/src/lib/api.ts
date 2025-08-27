// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn('⚠️ VITE_API_URL no está definida. Usa http://localhost:5000 (desarrollo)');
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error(`Error ${res.status} en ${endpoint}`);
    return res.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error ${res.status} en ${endpoint}`);
    return res.json();
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error ${res.status} en ${endpoint}`);
    return res.json();
  },

  async delete(endpoint: string): Promise<void> {
    const res = await fetch(`${API_URL}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Error ${res.status} en ${endpoint}`);
  },
};