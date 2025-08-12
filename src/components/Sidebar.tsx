import React, { useState } from 'react';
import { Mail, Cpu, Smartphone, Wifi, Code, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const categories = [
    { name: 'Inteligencia Artificial', icon: Cpu, count: 24, slug: 'ia' },
    { name: 'Gadgets', icon: Smartphone, count: 18, slug: 'gadgets' },
    { name: 'Internet de las Cosas', icon: Wifi, count: 15, slug: 'iot' },
    { name: 'Software', icon: Code, count: 32, slug: 'software' },
  ];

  const trendingTopics = [
    'GPT-5 y el futuro de la IA',
    'Realidad aumentada en 2025',
    'Blockchain para PyMEs',
    'Ciberseguridad avanzada',
    'Edge Computing'
  ];

  return (
    <aside className="space-y-6">
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
        <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
          Contratar Espacio
        </button>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-bold text-gray-900">Newsletter Tech</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Recibe las últimas noticias tech directamente en tu inbox
        </p>
        
        <form onSubmit={handleSubscribe}>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={subscribed}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                subscribed
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {subscribed ? '✓ ¡Suscrito!' : 'Suscribirse'}
            </button>
          </div>
        </form>
      </div>

      {/* Ad Space 2 - Software/Tools */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center border border-orange-100">
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Code className="w-6 h-6 text-orange-600" />
          </div>
          <h4 className="font-bold text-gray-900">Herramientas Dev</h4>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          ¿Tienes una herramienta para desarrolladores? Promociona aquí.
        </p>
        <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
          Publicitar Aquí
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
        <nav className="space-y-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-teal-600">
                    {category.name}
                  </span>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Ad Space 3 - Courses/Education */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-green-600 text-2xl">🎓</span>
          </div>
          <h4 className="font-bold text-gray-900">Cursos Tech</h4>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Promociona tus cursos de programación y tecnología aquí.
        </p>
        <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          Anunciar Curso
        </button>
      </div>

      {/* Ad Space */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 text-center border border-blue-100">
        <div className="bg-white rounded-lg p-4 mb-4">
          <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-2" />
          <h4 className="font-bold text-gray-900">Impulsa tu Empresa</h4>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Conecta con profesionales tech y empresarios innovadores
        </p>
        <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
          Publicitar Aquí
        </button>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Temas Populares</h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <a
              key={index}
              href="#"
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="bg-teal-100 text-teal-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm text-gray-700 group-hover:text-teal-600 leading-relaxed">
                {topic}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Ad Space 4 - Services */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 text-center border border-indigo-100">
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-indigo-600 text-2xl">⚡</span>
          </div>
          <h4 className="font-bold text-gray-900">Servicios Tech</h4>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Ofrece tus servicios de desarrollo, consultoría o soporte técnico.
        </p>
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
          Promocionar Servicio
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;