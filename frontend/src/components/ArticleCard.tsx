import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  User,
  Calendar,
  Share2,
  BookmarkPlus,
  X,
  Facebook,
  Linkedin,
  Twitter,
  Send,
} from 'lucide-react';
import { Article } from '../types/Article';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('bottom');
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(saved.includes(article.id));
  }, [article.id]);

  // Alternar favorito
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? saved.filter((id: string) => id !== article.id)
      : [...saved, article.id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Alternar menú de compartir
  const toggleShareMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu((prev) => !prev);
  };

  // Calcular posición del menú
  useEffect(() => {
    if (showShareMenu && shareButtonRef.current) {
      const buttonRect = shareButtonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const menuHeight = 200; // Aproximado

      // Decidimos si hay más espacio arriba o abajo
      if (spaceBelow >= menuHeight && spaceBelow >= spaceAbove) {
        setMenuPosition('bottom');
      } else if (spaceAbove >= menuHeight) {
        setMenuPosition('top');
      } else {
        // Si no hay suficiente espacio en ninguno, forzamos el que tenga más
        setMenuPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
      }
    }
  }, [showShareMenu]);

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showShareMenu &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(e.target as Node) &&
        !((e.target as HTMLElement).closest?.('.share-menu'))
      ) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showShareMenu]);

  // Compartir en red específica (abre en nueva pestaña)
  const shareTo = (platform: string) => {
    const url = `${window.location.origin}/article/${article.id}`;
    const text = `${article.title} - ${article.excerpt}`;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        const whatsappText = encodeURIComponent(`${article.title}\n\n${url}`);
        shareUrl = `https://wa.me/?text=${whatsappText}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02]">
      <Link to={`/article/${article.id}`}>
        <div className="relative">
         <img 
            src={article.image.startsWith('/blog/imagenes/') 
              ? article.image 
              : article.image.replace('/imagenes/', '/blog/imagenes/')} 
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

        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>

        <div className="flex items-center justify-between">
          <Link to={`/article/${article.id}`} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
            Leer Más
          </Link>

          <div className="flex space-x-1 relative">
            {/* Botón Favorito */}
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-lg transition-colors"
              aria-label={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            >
              <BookmarkPlus
                className={`w-4 h-4 ${isFavorite ? 'text-teal-600 fill-current' : 'text-gray-400'}`}
              />
            </button>

            {/* Botón Compartir */}
            <button
              ref={shareButtonRef}
              onClick={toggleShareMenu}
              className="p-2 text-gray-400 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Compartir artículo"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Menú de compartir */}
            {showShareMenu && (
              <div
                className={`absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2 transition-all share-menu ${
                  menuPosition === 'top'
                    ? 'bottom-full mb-1'
                    : 'top-full mt-1'
                }`}
                style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  // Opcional: forzar visibilidad si hay scroll
                  transform: menuPosition === 'top' ? 'translateY(0)' : 'translateY(0)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-2 px-3">
                  <button
                    onClick={() => shareTo('facebook')}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook</span>
                  </button>

                  <button
                    onClick={() => shareTo('linkedin')}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                  >
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    <span>LinkedIn</span>
                  </button>

                  <button
                    onClick={() => shareTo('twitter')}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                  >
                    <Twitter className="w-4 h-4 text-sky-500" />
                    <span>Twitter</span>
                  </button>

                  <button
                    onClick={() => shareTo('whatsapp')}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded"
                  >
                    <Send className="w-4 h-4 text-green-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowShareMenu(false);
                    }}
                    className="flex items-center justify-center text-xs text-gray-500 hover:text-gray-700 mt-1"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;