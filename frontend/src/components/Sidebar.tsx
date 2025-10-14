// Sidebar.tsx

import React, { useState } from 'react';
import { Mail, TrendingUp } from 'lucide-react';
import AdCard from './AdCard';
import { supabase } from '../lib/supabase'; // 👈 Importa Supabase

const Sidebar = () => {
  const [isTopButtonClicked, setIsTopButtonClicked] = useState(false);
  const [isBottomButtonClicked, setIsBottomButtonClicked] = useState(false);

  const handleTopContact = () => {
    setIsTopButtonClicked(true);
    const subject = 'Consulta de Publicidad';
    const body = `Hola,\n\nMe interesa obtener más información sobre los espacios publicitarios en CBA Blog.\n\nSaludos,`;

    openEmailClient(subject, body);
    setTimeout(() => setIsTopButtonClicked(false), 2000);
  };

  const handleBottomContact = () => {
    setIsBottomButtonClicked(true);
    const subject = 'Propuesta de Colaboración Publicitaria';
    const body = `Hola,\n\nMe interesa colaborar con CBA Blog como anunciante o patrocinador.\n\n¿Podrían contarme más sobre las opciones disponibles?\n\nSaludos,`;

    openEmailClient(subject, body);
    setTimeout(() => setIsBottomButtonClicked(false), 2000);
  };

  // Función reutilizable para abrir correo
  const openEmailClient = (subject: string, body: string) => {
    const mailto = `mailto:cba4.0cordoba@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Intentar con mailto
    const link = document.createElement('a');
    link.href = mailto;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fallback: abrir Gmail en web
    setTimeout(() => {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=cba4.0cordoba@gmail.com&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  return (
    <aside className="space-y-6">
      {/* Top Banner Ad */}
      <div className="bg-gray-100 py-3 text-center rounded-lg">
        <p className="text-sm text-gray-700">
          📢 <strong>Espacio Publicitario Premium</strong> - Tu empresa puede estar aquí.{' '}
          <button
            onClick={handleTopContact}
            disabled={isTopButtonClicked}
            className="text-teal-600 font-medium hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            {isTopButtonClicked ? 'Enviando...' : 'Contáctanos'}
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
        customBody="Hola,\n\nEstoy interesado en el Espacio Premium del blog. ¿Cuáles son los beneficios y precios?\n\nSaludos,"
      />

      {/* Ad Space 2 - Middle Tier */}
      <AdCard
        title="Impulsa tu Empresa"
        description="Conecta con profesionales tech y empresarios innovadores"
        buttonText="Publicitar Aquí"
        subject="Interés en Publicidad en CBA Blog"
        gradient="from-blue-50 to-teal-50"
        icon={<TrendingUp className="w-12 h-12 text-teal-600" />}
        customBody="Hola,\n\nQuiero impulsar mi empresa a través de su blog. ¿Qué opciones de publicidad ofrecen?\n\nSaludos,"
      />

      {/* Formulario de Suscripción */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const email = new FormData(e.currentTarget).get('email') as string;

          if (!email || !email.includes('@')) {
            alert('Email inválido');
            return;
          }

          try {
            const id = Date.now().toString();
            const createdAt = new Date().toISOString();

            const { error } = await supabase
              .from('subscribers')
              .insert([{ id, email, createdat: createdAt }]);

            if (error) throw error;

            alert('✅ Suscrito exitosamente');
            e.currentTarget.reset();
          } catch (err) {
            console.error('Error al suscribirse:', err);
            alert('❌ Error al suscribirse. Intenta nuevamente.');
          }
        }}
        className="space-y-3"
      >
        <p className="text-center text-gray-600 mb-2 text-sm">
          Recibe las últimas noticias tecnológicas directamente en tu bandeja.
        </p>
        <input
          type="email"
          name="email"
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

      {/* Bottom Banner Ad */}
      <div className="bg-gray-100 py-3 text-center rounded-lg">
        <p className="text-sm text-gray-700">
          🌟 <strong>¿Querés destacar tu marca?</strong>{' '}
          <button
            onClick={handleBottomContact}
            disabled={isBottomButtonClicked}
            className="text-teal-600 font-medium hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            {isBottomButtonClicked ? 'Enviando...' : 'Hablá con nosotros'}
          </button>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;