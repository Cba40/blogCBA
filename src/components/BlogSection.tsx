import React, { useState } from 'react';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';
import Sidebar from './Sidebar';
import { blogArticles, featuredArticle } from '../data/articles';

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const filteredArticles = selectedCategory === 'todos' 
    ? blogArticles 
    : blogArticles.filter(article => article.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Noticias Tecnológicas</h1>
        <p className="text-xl text-gray-600">
          Mantente al día con las últimas tendencias en tecnología e innovación
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Featured Article */}
          <div className="mb-8">
            <FeaturedArticle article={featuredArticle} />
          </div>

          {/* Category Filter */}
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

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination */}
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

        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="mt-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Espacio Publicitario Premium</h3>
        <p className="text-gray-700 mb-4">
          Llega a miles de profesionales tech y empresarios innovadores
        </p>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
          Anunciar Aquí
        </button>
      </div>

      {/* Additional Ad Banners Row */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center">
          <div className="bg-white rounded-lg p-3 mb-3 inline-block">
            <span className="text-purple-600 text-2xl">🚀</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Startups Tech</h4>
          <p className="text-sm text-gray-700 mb-3">
            Espacio ideal para startups tecnológicas emergentes
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            Contratar Banner
          </button>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 text-center">
          <div className="bg-white rounded-lg p-3 mb-3 inline-block">
            <span className="text-orange-600 text-2xl">💼</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Empleos Tech</h4>
          <p className="text-sm text-gray-700 mb-3">
            Publica ofertas laborales para profesionales IT
          </p>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
            Publicar Empleo
          </button>
        </div>
      </div>
    </main>
  );
};

export default BlogSection;