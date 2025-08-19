import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tenerlo
import { Clock, User, Calendar, Share2, BookmarkPlus } from 'lucide-react';
import { Article } from '../types/Article';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02]">
      <Link to={`/article/${article.id}`}>
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium uppercase">
              {article.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime} min</span>
          </div>
        </div>
        
        <Link to={`/article/${article.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight hover:text-teal-600 transition-colors cursor-pointer">
            {article.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
          <User className="w-4 h-4" />
          <span>Por {article.author}</span>
        </div>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <Link to={`/article/${article.id}`} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
            Leer Más
          </Link>
          
          <div className="flex space-x-1">
            <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors">
              <BookmarkPlus className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;