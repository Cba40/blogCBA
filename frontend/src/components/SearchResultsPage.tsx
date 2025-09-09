// src/components/SearchResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams , useSearchParams, useNavigate } from 'react-router-dom'; 
import ArticleCard from './ArticleCard';
import Sidebar from './Sidebar';
import AdBanners from './AdBanners';
import { Article } from '../types/Article';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Cargar artículos desde la API
  useEffect(() => {
  const fetchArticles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
      const data: Article[] = await res.json();

      // Filtrar por búsqueda
      const filtered = data.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          a.content.toLowerCase().includes(query.toLowerCase()) ||
          a.author.toLowerCase().includes(query.toLowerCase())
      );

      setArticles(filtered);
    } catch (error) {
      console.error('Error al cargar artículos', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (query.trim()) {
    setLoading(true);
    fetchArticles();
  } else {
    setArticles([]);
    setLoading(false);
  }
}, [query]);

  const articlesPerPage = 6;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       {/* Botón Volver al Inicio */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()} 
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
          {articles.length} artículo{articles.length !== 1 ? 's' : ''} encontrado{articles.length !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Buscando artículos...</p>
        </div>
      ) : currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron artículos que coincidan con "<strong>{query}</strong>"
          </p>
        </div>
      )}

      {/* Anuncios */}
      {!loading && <AdBanners />}
    </main>
  );
};

export default SearchResultsPage;