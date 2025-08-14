import React, { useState } from 'react';
import { Search, Menu, X, } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
           <div className="flex items-center space-x-3">
            {/* Imagen del logo con fondo teal y borde redondeado */}
            <div className="bg-teal-600 p-2 rounded-lg">
              <img
                src="/imagenes/logo.webp" 
                alt="Logo CBA Blog"
                className="h-8 w-8 object-cover rounded" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CBA Blog</h1>
              <p className="text-sm text-gray-600">Noticias Tecnológicas</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
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
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Inicio
            </a>
            <a href="#tecnologia" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Tecnología
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Contacto
            </a>
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <a href="#inicio" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Inicio
                </a>
                <a href="#tecnologia" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Tecnología
                </a>
                <a href="#contacto" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Contacto
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;