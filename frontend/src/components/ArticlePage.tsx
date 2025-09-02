// src/components/ArticlePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdBanners from './AdBanners';
import { Article } from '../types/Article';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Scroll al leer el articulo
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);

  // Cargar el artículo desde la API
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
        if (!res.ok) {
          throw new Error('No encontrado');
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error('Artículo no encontrado:', error);
        setArticle(null);

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
        <p className="text-gray-600">El artículo que buscas no existe o fue eliminado.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
        >
          ← Volver al blog
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Botón de volver */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-2"
        >
          ← Volver al blog
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Contenido principal */}
        <div className="lg:col-span-3">
          {/* Título */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span>Por {article.author}</span>
            <span>{article.date}</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
              {article.category.toUpperCase()}
            </span>
            <span>{article.readTime} min de lectura</span>
          </div>

          {/* Imagen */}
          <img
            src={article.image.replace('/imagenes/', '/blog/imagenes/')}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />

          {/* Contenido */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            {article.content
              .split('\n')
              .map((line, index) => {
                if (line.startsWith('## ')) {
                  return (
                    <h3
                      key={index}
                      className="text-2xl font-semibold text-gray-900 mt-8 mb-2"
                    >
                      {line.slice(3)}
                    </h3>
                  );
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return (
                    <p key={index} className="mb-4">
                      {line}
                    </p>
                  );
                }
              })}
          </div>

          {/* Anuncios después del contenido */}
          <AdBanners />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>

      {/* Botón de volver al final */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-2"
        >
          ← Volver al blog
        </button>
      </div>
    </article>
  );
};

export default ArticlePage;