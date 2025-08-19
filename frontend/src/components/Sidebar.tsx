// src/components/Sidebar.tsx
import React from 'react';
import { Mail, TrendingUp } from 'lucide-react';
import AdCard from './AdCard';

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      {/* Top Banner Ad */}
      <div className="bg-gray-100 py-3 text-center rounded-lg">
        <p className="text-sm text-gray-700">
          📢 <strong>Espacio Publicitario Premium</strong> - Tu empresa puede estar aquí.{' '}
          <button
            onClick={() => {
              const mailto = 'mailto:cba4.0cordoba@gmail.com?subject=Consulta de Publicidad&body=Hola,%0Ame%20interesa%20más%20información%20sobre%20los%20espacios%20publicitarios%20en%20CBA%20Blog.';
              window.location.href = mailto;
            }}
            className="text-teal-600 font-medium hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Contáctanos
          </button>
        </p>
      </div>

      {/* Ad Space 1 - Top Premium */}
      <AdCard
        title="Espacio Premium"
        description="Promociona tu producto tech aquí. Máxima visibilidad garantizada."
        buttonText="Contratar Espacio"
        subject="Quiero Contratar Espacio Premium en CBA Blog"
        gradient="from-purple-50 to-pink-50"
        icon={<span className="text-purple-600 font-bold text-lg">AD</span>}
      />

      {/* Ad Space 2 - Middle Tier */}
      <AdCard
        title="Impulsa tu Empresa"
        description="Conecta con profesionales tech y empresarios innovadores"
        buttonText="Publicitar Aquí"
        subject="Interés en Publicidad en CBA Blog"
        gradient="from-blue-50 to-teal-50"
        icon={<TrendingUp className="w-12 h-12 text-teal-600" />}
      />

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
          <button
            onClick={() => {
              const mailto =
                'mailto:cba4.0cordoba@gmail.com?subject=Propuesta de Colaboración Publicitaria&body=Hola,%0Ame%20interesa%20colaborar%20con%20CBA%20Blog%20como%20anunciante%20o%20patrocinador.';
              window.location.href = mailto;
            }}
            className="text-teal-600 font-medium hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Hablá con nosotros
          </button>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;