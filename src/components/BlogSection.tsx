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
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Noticias Tecnológicas</h1>
        <p className="text-xl text-gray-600">
          Mantente al día con las últimas tendencias en tecnología e innovación
        </p>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Contenido principal */}
        <div className="lg:col-span-3">
          {/* Artículo destacado */}
          <div className="mb-8">
            <FeaturedArticle article={featuredArticle} />
          </div>

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
            {currentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
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

      {/* Banner inferior - Anunciar Aquí */}
      <div className="mt-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Espacio Publicitario Premium</h3>
        <p className="text-gray-700 mb-4">
          Llega a miles de profesionales tech y empresarios innovadores
        </p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.href =
              'mailto:cba4.0cordoba@gmail.com?subject=Quiero Anunciar en CBA Blog&body=Hola,%0Ame%20interesa%20anunciar%20en%20CBA%20Blog.%20Por%20favor,%20envíenme%20información%20sobre%20paquetes%20y%20precios.';
          }}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium inline-block cursor-pointer"
        >
          Anunciar Aquí
        </a>
      </div>

      {/* Fila de banners adicionales */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1: Startups Tech */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center">
          <div className="bg-white rounded-lg p-3 mb-3 inline-block">
            <span className="text-purple-600 text-2xl">🚀</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Startups Tech</h4>
          <p className="text-sm text-gray-700 mb-3">
            Espacio ideal para startups tecnológicas emergentes
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.href =
                'mailto:cba4.0cordoba@gmail.com?subject=Interés en Banner para Startups&body=Hola,%0Asoy%20de%20una%20startup%20tech%20y%20me%20interesa%20publicitar%20en%20su%20plataforma.';
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium inline-block cursor-pointer"
          >
            Contratar Banner
          </a>
        </div>

        {/* Banner 2: Empleos Tech */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 text-center">
          <div className="bg-white rounded-lg p-3 mb-3 inline-block">
            <span className="text-orange-600 text-2xl">💼</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Empleos Tech</h4>
          <p className="text-sm text-gray-700 mb-3">
            Publica ofertas laborales para profesionales IT
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.href =
                'mailto:cba4.0cordoba@gmail.com?subject=Publicar Empleo Tecnológico&body=Hola,%0Aquiero%20publicar%20una%20oferta%20laboral%20para%20profesionales%20IT.%20Por%20favor,%20envíenme%20los%20detalles.';
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium inline-block cursor-pointer"
          >
            Publicar Empleo
          </a>
        </div>
      </div>
    </main>
  );
};

export default BlogSection;