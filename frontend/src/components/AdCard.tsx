import React, { useState } from 'react';

interface AdCardProps {
  title: string;
  description: string;
  buttonText: string;
  subject: string;
  gradient: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  customBody?: string; // Mensaje personalizado
}

const AdCard = ({
  title,
  description,
  buttonText,
  subject,
  gradient,
  icon,
  onClick,
  customBody,
}: AdCardProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    // Mensaje predeterminado o personalizado
    const defaultBody = `Hola,\n\nMe interesa obtener más información sobre este espacio publicitario:\n\n- ${title}\n\n¿Podrían contarme más?\n\nSaludos,`;
    const body = customBody || defaultBody;

    const mailto = `mailto:cba4.0cordoba@gmail.com?subject=${encodeURIComponent(
      subject
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

    // Si no se abre, abrir Gmail en web
    setTimeout(() => {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=cba4.0cordoba@gmail.com&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }, 1000);

    // Resetear el estado después de 2 segundos
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-center border border-gray-100`}>
      <div className="bg-white rounded-lg p-4 mb-4">
        {icon && (
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
            {icon}
          </div>
        )}
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <button
        onClick={onClick || handleClick}
        disabled={isClicked}
        className={`
          w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${isClicked
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-600 hover:bg-teal-700'
          } text-white
        `}
      >
        {isClicked ? 'Enviando...' : buttonText}
      </button>
    </div>
  );
};

export default AdCard;