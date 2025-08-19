import React from 'react';
import { Clock, User, Calendar, Share2, BookmarkPlus } from 'lucide-react';
import { Article } from '../types/Article';
import { Link } from 'react-router-dom'; // ← Importamos Link

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="md:flex">
        {/* Imagen */}
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-full">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Destacado
              </span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Metadata */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium uppercase">
                {article.category}
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
            </div>

            {/* Título */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h2>

            {/* Autor y tiempo de lectura */}
            <div className="flex items-center space-x-3 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Por {article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min lectura</span>
              </div>
            </div>

            {/* Extracto */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {article.excerpt}
            </p>
          </div>

          {/* Botones: Leer más + Compartir */}
          <div className="flex items-center justify-between">
            {/* Botón "Leer Artículo Completo" como enlace */}
            <Link
              to={`/article/${article.id}`}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium inline-block text-center"
            >
              Leer Artículo Completo
            </Link>

            {/* Botones de acción */}
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors">
                <BookmarkPlus className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;