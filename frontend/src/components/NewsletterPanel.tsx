// src/components/NewsletterPanel.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const NewsletterPanel = () => {
  const navigate = useNavigate();
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [featuredArticle, setFeaturedArticle] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar número de suscriptores
    const fetchSubscribersCount = async () => {
      const { count, error } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true });
      setSubscribersCount(count || 0);
    };

    // Cargar artículo destacado
    const fetchFeaturedArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('title, excerpt')
        .eq('featured', true)
        .order('date', { ascending: false })
        .limit(1)
        .single();
      setFeaturedArticle(data);
    };

    fetchSubscribersCount();
    fetchFeaturedArticle();
  }, []);

  const handleSendNewsletter = async () => {
    if (!featuredArticle) {
      alert('No hay ningún artículo marcado como destacado.');
      return;
    }
    if (subscribersCount === 0) {
      alert('No hay suscriptores para enviar el newsletter.');
      return;
    }

    if (!confirm(`¿Enviar newsletter con el artículo "${featuredArticle.title}" a ${subscribersCount} suscriptores?`)) {
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter');
      if (error) throw error;
      alert('✅ Newsletter enviado exitosamente!');
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un error al enviar el newsletter.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enviar Newsletter</h1>
          {featuredArticle ? (
            <p className="text-gray-600 mt-1">
              Artículo destacado: <strong>{featuredArticle.title}</strong>
            </p>
          ) : (
            <p className="text-red-600 mt-1">⚠️ No hay artículo destacado</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/backup')}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
          >
            Panel de Respaldo
          </button>
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
          >
            Volver a Artículos
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4">
          <p className="text-gray-700">
            Se enviará un newsletter con el <strong>artículo destacado</strong> a todos los suscriptores.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Suscriptores: <strong>{subscribersCount}</strong>
          </p>
        </div>

        <button
          onClick={handleSendNewsletter}
          disabled={loading || !featuredArticle || subscribersCount === 0}
          className={`w-full py-3 rounded-lg font-medium ${
            loading || !featuredArticle || subscribersCount === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Enviando...' : `Enviar a ${subscribersCount} suscriptor(es)`}
        </button>
      </div>
    </div>
  );
};

export default NewsletterPanel;