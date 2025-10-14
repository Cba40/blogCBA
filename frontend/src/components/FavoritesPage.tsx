// src/pages/FavoritesPage.tsx

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types/Article';
import { supabase } from '../lib/supabase';

const FavoritesPage = () => {
  const { id } = useParams<{ id: string }>();
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // 👇 Usa 'date' en lugar de 'created_at'
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('date', { ascending: false }); // 👈 Orden por fecha de publicación

        if (error) throw error;

        // Corregir rutas de imágenes
        const fixedData = data.map(article => ({
          ...article,
          image: article.image.startsWith('/imagenes/')
            ? `/blog${article.image}`
            : article.image
        }));

        setAllArticles(fixedData);
      } catch (err) {
        console.error('Error al cargar artículos desde Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filtrar favoritos
  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritos = allArticles.filter(article => savedIds.includes(article.id));
    setFavorites(favoritos);
  }, [allArticles]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <Link
          to="/"
          className="flex items-center text-teal-600 hover:text-teal-800 font-medium gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-600 fill-current" />
          Mis Favoritos
        </h1>
        <p className="text-gray-600 mt-2">
          Artículos que guardaste para leer después
        </p>
      </div>

      {/* Contenido */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No tienes artículos favoritos</h3>
          <p className="text-gray-600 mb-6">
            Usa el corazón en las tarjetas para guardar tus artículos preferidos.
          </p>
          <Link
            to="/"
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Explorar artículos
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;