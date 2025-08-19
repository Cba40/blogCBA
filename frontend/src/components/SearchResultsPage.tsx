import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { blogArticles } from '../data/articles';
import ArticleCard from './ArticleCard';
import Sidebar from './Sidebar';
import AdBanners from './AdBanners';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // ✅ Estado de carga
  const articlesPerPage = 6;

  const navigate = useNavigate();

  // Simular carga (opcional: quitar en producción si es instantáneo)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms de carga visual suave

    return () => clearTimeout(timer);
  }, []);

  // Filtrar artículos
  const filteredArticles = blogArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase()) ||
      article.author.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Botón Volver al Inicio */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-2"
        >
          ← Volver al inicio
        </button>
      </div>

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Resultados para: <span className="text-teal-600">"{query}"</span>
        </h1>
        <p className="text-gray-600 mt-2">
          {filteredArticles.length} artículo{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Spinner de carga */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Buscando artículos...</p>
        </div>
      ) : currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Resultados */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      ) : (
        /* No hay resultados */
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron artículos que coincidan con "<strong>{query}</strong>"
          </p>
        </div>
      )}

      {/* Anuncios (solo si no está cargando) */}
      {!isLoading && <AdBanners />}
    </main>
  );
};

export default SearchResultsPage;