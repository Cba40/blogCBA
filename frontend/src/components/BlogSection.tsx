import React, {useState, useEffect } from 'react';
import {useParams, useSearchParams } from 'react-router-dom';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';
import Sidebar from './Sidebar';
import AdBanners from './AdBanners';
import { Article } from '../types/Article';

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article | null>(null);

  // Scroll al cambiar de página
   useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Leer el término de búsqueda de la URL
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
  }, [searchParams]);

  // Cargar artículos desde la API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
        const data: Article[] = await res.json();

        // Separar artículo destacado
        const featuredArticle = data.find((a) => a.featured);
        const regularArticles = data.filter((a) => !a.featured);

        setFeatured(featuredArticle || null);
        setArticles(regularArticles);
      } catch (error) {
        console.error('Error al cargar artículos desde la API', error);
      }
    };

    fetchArticles();
  }, []);

  const articlesPerPage = 6;

  // Filtrar artículos (por categoría y búsqueda)
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Noticias Tecnológicas</h1>
        <p className="text-xl text-gray-600">
          Mantente al día con las últimas tendencias en tecnología e innovación
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Artículo destacado */}
          {featured && (
            <div className="mb-8">
              <FeaturedArticle article={featured} />
            </div>
          )}

          {/* Filtros de categoría */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['todos', 'ia', 'gadgets', 'iot', 'software'].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'todos' ? 'Todos' : category.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Grilla de artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentArticles.length > 0 ? (
              currentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500">
                  No se encontraron artículos que coincidan con "<strong>{searchQuery}</strong>"
                </p>
              </div>
            )}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
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

      {/* Anuncios */}
      <AdBanners />
    </main>
  );
};

export default BlogSection;