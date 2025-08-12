import React from 'react';
import { Newspaper, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Newspaper className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">CBA Blog</h2>
                <p className="text-gray-400">Noticias Tecnológicas</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Tu fuente confiable de noticias tecnológicas, tendencias de innovación y análisis
              profundos del mundo digital. Mantente informado con contenido de calidad.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Últimas Noticias
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Archivo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">contacto@cbablog.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+54 9 352 562-3637</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Córdoba, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 CBA Blog. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
              Publicidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;