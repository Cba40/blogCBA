import React, { useState, useEffect } from 'react';
import AdCard from './AdCard';

const AdBanners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMainButtonClicked, setIsMainButtonClicked] = useState(false);

  // Mostrar el banner después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 3 segundos

    return () => clearTimeout(timer); // Limpieza si el componente se desmonta
  }, []);

  // Si aún no es visible, no renderiza nada
  if (!isVisible) {
    return null;
  }

  const handleMainClick = () => {
    setIsMainButtonClicked(true);

    const body = `Hola,\n\nMe interesa anunciar en CBA Blog. Por favor, envíenme información sobre paquetes y precios.\n\nSaludos,`;

    const mailto = `mailto:cba4.0cordoba@gmail.com?subject=${encodeURIComponent(
      'Quiero Anunciar en CBA Blog'
    )}&body=${encodeURIComponent(body)}`;

    // Intentar abrir cliente de correo
    const mailtoLink = document.createElement('a');
    mailtoLink.href = mailto;
    mailtoLink.target = '_blank';
    mailtoLink.rel = 'noopener noreferrer';
    mailtoLink.style.display = 'none';
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    document.body.removeChild(mailtoLink);

    // Fallback: abrir Gmail en web
    setTimeout(() => {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=cba4.0cordoba@gmail.com&su=${encodeURIComponent(
        'Quiero Anunciar en CBA Blog'
      )}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }, 1000);

    // Resetear estado
    setTimeout(() => setIsMainButtonClicked(false), 2000);
  };

  return (
    <>
      {/* Bottom Ad Banner */}
      <div className="mt-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Espacio Publicitario Premium</h3>
        <p className="text-gray-700 mb-4">
          Llega a miles de profesionales tech y empresarios innovadores
        </p>
        <button
          onClick={handleMainClick}
          disabled={isMainButtonClicked}
          className={`
            px-6 py-3 rounded-lg font-medium inline-block cursor-pointer transition-all duration-200
            ${isMainButtonClicked
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-600 hover:bg-teal-700 text-white'
            }
          `}
        >
          {isMainButtonClicked ? 'Enviando...' : 'Anunciar Aquí'}
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
          customBody="Hola,\n\nSoy el fundador de una startup tecnológica y me interesa promocionar mi proyecto en CBA Blog.\n\n¿Cuáles son los planes de publicidad disponibles?\n\nSaludos,"
        />

        {/* Banner 2: Empleos Tech */}
        <AdCard
          title="Empleos Tech"
          description="Publica ofertas laborales para profesionales IT"
          buttonText="Publicar Empleo"
          subject="Publicar Empleo Tecnológico"
          gradient="from-yellow-100 to-orange-100"
          icon={<span className="text-orange-600 text-2xl">💼</span>}
          customBody="Hola,\n\nEstoy buscando talento tecnológico y quiero publicar una oferta laboral en CBA Blog.\n\nPor favor, envíenme información sobre cómo hacerlo.\n\nSaludos,"
        />
      </div>
    </>
  );
};

export default AdBanners;