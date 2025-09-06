// src/components/ContactPage.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdBanners from './AdBanners';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    tipoEmpresa: '',
    mensaje: '',
  });

  // ✅ Forzar scroll al inicio cuando carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, email, tipoEmpresa, mensaje } = formData;

    const subject = `Contacto: ${nombre} ${apellido} - ${tipoEmpresa}`;
    const content = `
      **Nombre:** ${nombre} ${apellido}
      **Email:** ${email}
      **Empresa:** ${tipoEmpresa}
      **Mensaje:**
      ${mensaje}
    `;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, content }),
      });

      if (response.ok) {
        alert('✅ ¡Mensaje enviado con éxito! Nos contactaremos pronto.');
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          tipoEmpresa: '',
          mensaje: '',
        });
      } else {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      // Fallback: abrir Gmail
      const mailto = `mailto:cba4.0cordoba@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(content)}`;
      window.location.href = mailto;
      alert('📧 No se pudo enviar. Abriendo cliente de correo...');
    }
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contáctanos</h1>
          <p className="text-gray-600 mb-8">¿Tienes una pregunta, propuesta o querés publicitar? Escríbenos.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de empresa</label>
              <select
                name="tipoEmpresa"
                value={formData.tipoEmpresa}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Seleccioná una opción</option>
                <option value="tecnológica">Tecnológica</option>
                <option value="comercio">Comercio</option>
                <option value="industria">Industria</option>
                <option value="educación">Educación</option>
                <option value="salud">Salud</option>
                <option value="startup">Startup</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Escribí tu consulta..."
              />
            </div>

            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>

      {/* Anuncios después del formulario */}
      <AdBanners />
    </article>
  );
};

export default ContactPage;