// src/components/AdBanners.tsx
import React from 'react';
import AdCard from './AdCard';

const AdBanners = () => {
  return (
    <>
      {/* Bottom Ad Banner */}
      <div className="mt-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Espacio Publicitario Premium</h3>
        <p className="text-gray-700 mb-4">
          Llega a miles de profesionales tech y empresarios innovadores
        </p>
        <button
          onClick={() => {
            const mailto =
              'mailto:cba4.0cordoba@gmail.com?subject=Quiero Anunciar en CBA Blog&body=Hola,%0Ame%20interesa%20anunciar%20en%20CBA%20Blog.%20Por%20favor,%20envíenme%20información%20sobre%20paquetes%20y%20precios.';
            window.location.href = mailto;
          }}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium inline-block cursor-pointer"
        >
          Anunciar Aquí
        </button>
      </div>

      {/* Additional Ad Banners Row */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1: Startups Tech */}
        <AdCard
          title="Startups Tech"
          description="Espacio ideal para startups tecnológicas emergentes"
          buttonText="Contratar Banner"
          subject="Interés en Banner para Startups"
          gradient="from-purple-100 to-pink-100"
          icon={<span className="text-purple-600 text-2xl">🚀</span>}
        />

        {/* Banner 2: Empleos Tech */}
        <AdCard
          title="Empleos Tech"
          description="Publica ofertas laborales para profesionales IT"
          buttonText="Publicar Empleo"
          subject="Publicar Empleo Tecnológico"
          gradient="from-yellow-100 to-orange-100"
          icon={<span className="text-orange-600 text-2xl">💼</span>}
        />
      </div>
    </>
  );
};

export default AdBanners;