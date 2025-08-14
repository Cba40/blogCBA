import React from 'react';
import { Mail, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      {/* Top Banner Ad */}
      <div className="bg-gray-100 py-3 text-center rounded-lg">
        <p className="text-sm text-gray-700">
          📢 <strong>Espacio Publicitario Premium</strong> - Tu empresa puede estar aquí.{' '}
          <a
            href="mailto:cba4.0cordoba@gmail.com?subject=Consulta de Publicidad&body=Hola,%0Ame%20interesa%20más%20información%20sobre%20los%20espacios%20publicitarios%20en%20CBA%20Blog."
            className="text-teal-600 font-medium hover:underline"
          >
            Contáctanos
          </a>
        </p>
      </div>

      {/* Ad Space 1 - Top Premium */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-purple-600 font-bold text-lg">AD</span>
          </div>
          <h4 className="font-bold text-gray-900">Espacio Premium</h4>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Promociona tu producto tech aquí. Máxima visibilidad garantizada.
        </p>
        <a
          href="mailto:cba4.0cordoba@gmail.com?subject=Quiero Contratar Espacio Premium en CBA Blog&body=Hola,%0Ame%20interesa%20contratar%20el%20espacio%20premium%20de%20publicidad%20en%20CBA%20Blog.%20Por%20favor,%20envíenme%20la%20información%20detallada."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium text-center"
        >
          Contratar Espacio
        </a>
      </div>

      {/* Ad Space 2 - Middle Tier */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 text-center border border-blue-100">
        <div className="bg-white rounded-lg p-4 mb-4">
          <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-2" />
          <h4 className="font-bold text-gray-900">Impulsa tu Empresa</h4>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Conecta con profesionales tech y empresarios innovadores
        </p>
        <a
          href="mailto:cba4.0cordoba@gmail.com?subject=Interés en Publicidad en CBA Blog&body=Hola,%0Ame%20gustaría%20saber%20más%20sobre%20las%20opciones%20de%20publicidad%20en%20su%20plataforma."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium text-center"
        >
          Publicitar Aquí
        </a>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="w-5 h-5 text-teal-600" />
          <h4 className="font-semibold text-gray-900">Suscríbete</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Recibe las últimas noticias tecnológicas directamente en tu bandeja.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('¡Gracias por suscribirte!');
            e.currentTarget.reset();
          }}
          className="space-y-3"
        >
          <input
            type="email"
            placeholder="Tu correo electrónico"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            Suscribirse
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-3">
          Prometemos no enviar spam. Solo contenido de calidad.
        </p>
      </div>

      {/* Bottom Banner Ad */}
      <div className="bg-gray-100 py-3 text-center rounded-lg">
        <p className="text-sm text-gray-700">
          🌟 <strong>¿Querés destacar tu marca?</strong>{' '}
          <a
            href="mailto:cba4.0cordoba@gmail.com?subject=Propuesta de Colaboración Publicitaria&body=Hola,%0Ame%20interesa%20colaborar%20con%20CBA%20Blog%20como%20anunciante%20o%20patrocinador."
            className="text-teal-600 font-medium hover:underline"
          >
            Hablá con nosotros
          </a>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;