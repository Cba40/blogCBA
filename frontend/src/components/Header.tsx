import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog/buscar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Banner Ad */}
      <div className="bg-gray-100 py-3 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              📢 <strong>Espacio Publicitario Premium</strong> - Tu empresa puede estar aquí.{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    'mailto:cba4.0cordoba@gmail.com?subject=Consulta de Publicidad&body=Hola,%0Ame%20interesa%20más%20información%20sobre%20los%20espacios%20publicitarios%20en%20CBA%20Blog.';
                }}
                className="text-teal-600 font-medium hover:underline cursor-pointer"
              >
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => navigate('/blog')}
          >
            <div className="bg-teal-600 p-1.5 rounded-full">
              <img
                src="/blog/logo.webp"
                alt="Logo CBA Blog"
                className="h-10 w-10 object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CBA Blog</h1>
              <p className="text-sm text-gray-600">Noticias Tecnológicas</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/blog"
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Inicio
            </Link>
            <a
              href="http://cbacuatropuntocero.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Cba 4.0 Web
            </a>
            <Link
              to="/blog/contacto"
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Contacto
            </Link>
            <Link
              to="/blog/favoritos"
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Favoritos
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/blog"
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Inicio
                </Link>
                <a
                  href="http://cbacuatropuntocero.com.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cba 4.0 Web
                </a>
                <Link
                  to="/blog/contacto"
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Contacto
                </Link>
                <Link
                  to="/blog/favoritos"
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Favoritos
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;