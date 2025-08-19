// src/components/AdCard.tsx
import React from 'react';

interface AdCardProps {
  title: string;
  description: string;
  buttonText: string;
  subject: string;
  gradient: string; // Ej: "from-blue-50 to-teal-50"
  icon?: React.ReactNode;
  onClick?: () => void;
}

const AdCard = ({
  title,
  description,
  buttonText,
  subject,
  gradient,
  icon,
  onClick,
}: AdCardProps) => {
  const handleClick = () => {
    const body = encodeURIComponent(
      'Hola,\n\nMe interesa obtener más información sobre este espacio publicitario.\n\nSaludos,'
    );
    const mailto = `mailto:cba4.0cordoba@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.location.href = mailto;
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
        className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AdCard;