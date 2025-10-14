// src/components/BackupPanel.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const BackupPanel = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // ✅ Exportar Artículos
  const exportArticles = async () => {
    try {
      const { data, error } = await supabase.from('articles').select('*');

      if (error) throw error;

      const filename = `backup/articles-${new Date().toISOString().split('T')[0]}.json`;
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage(`✅ Artículos exportados a ${filename}`);
    } catch (err) {
      console.error('Error al exportar artículos:', err);
      setMessage('❌ Error al exportar artículos');
    }
  };

  // ✅ Importar Artículos
  const importArticles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const { error } = await supabase.from('articles').insert(data);

      if (error) throw error;

      setMessage('✅ Artículos importados exitosamente');
    } catch (err) {
      console.error('Error al importar artículos:', err);
      setMessage('❌ Error al importar artículos');
    }
  };

  // ✅ Exportar Suscriptores
  const exportSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('createdat', { ascending: false });

      if (error) throw error;

      const filename = `backup/subscribers-${new Date().toISOString().split('T')[0]}.json`;
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage(`✅ Suscriptores exportados a ${filename}`);
    } catch (err) {
      console.error('Error al exportar suscriptores:', err);
      setMessage('❌ Error al exportar suscriptores');
    }
  };

  // ✅ Importar Suscriptores
  const importSubscribers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const { error } = await supabase.from('subscribers').insert(data);

      if (error) throw error;

      setMessage('✅ Suscriptores importados exitosamente');
    } catch (err) {
      console.error('Error al importar suscriptores:', err);
      setMessage('❌ Error al importar suscriptores');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Respaldo</h1>
          <p className="text-gray-600 mt-1">Exporta o importa tus artículos y suscriptores como archivos JSON.</p>
        </div>
        <button
          onClick={() => navigate('/newsletter')}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver a Newsletter
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Artículos</h2>
        <div className="space-y-4">
          <button
            onClick={exportArticles}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Exportar Artículos a JSON
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Importar Artículos desde JSON
            </label>
            <input
              type="file"
              accept=".json"
              onChange={importArticles}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mt-6">Suscriptores</h2>
        <div className="space-y-4">
          <button
            onClick={exportSubscribers}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Exportar Suscriptores a JSON
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Importar Suscriptores desde JSON
            </label>
            <input
              type="file"
              accept=".json"
              onChange={importSubscribers}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-white ${message.includes('Error') ? 'bg-red-600' : 'bg-green-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackupPanel;