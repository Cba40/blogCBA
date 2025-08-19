// src/components/ArticlePage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogArticles } from '../data/articles';
import Sidebar from './Sidebar';
import AdBanners from './AdBanners';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = blogArticles.find((a) => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
        <p className="text-gray-600">El artículo que buscas no existe.</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span>Por {article.author}</span>
            <span>{article.date}</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
              {article.category.toUpperCase()}
            </span>
            <span>{article.readTime} min de lectura</span>
          </div>

          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />

          {/* ✅ Contenido real del artículo */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
            {article.content.trim()}
          </div>

          {/* Anuncios */}
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