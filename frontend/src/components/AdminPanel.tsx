// src/components/AdminPanel.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types/Article';

const AdminPanel = () => {
  const navigate = useNavigate();

  // Verificar autenticación
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);

  const [newsletter, setNewsletter] = useState({
    subject: '',
    content: '',
  });

  // Estado para el formulario
  const [article, setArticle] = useState<Omit<Article, 'id'> & { id?: string }>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    author: 'CBA 4.0 Blog',
    date: new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(',', ''),
    readTime: 5,
    category: 'ia',
    image: '/imagenes/ImagenesArticulos/default.jpg',
    featured: false,
  });

  // Estado para artículos y suscriptores
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<{ email: string; createdAt: string }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<{ subject: string; content: string } | null>(null);

  // Cargar artículos
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setMessage('❌ Error al cargar artículos');
      }
    };

    fetchArticles();
  }, []);

  // Cargar suscriptores
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribers`);
        const data = await res.json();
        setSubscribers(data);
      } catch (err) {
        console.error('Error al cargar suscriptores');
      }
    };

    fetchSubscribers();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setArticle({
      ...article,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Limpiar formulario (nuevo artículo)
  const handleNew = () => {
    setArticle({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      author: 'CBA 4.0 Blog',
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).replace(',', ''),
      readTime: 5,
      category: 'ia',
      image: '/imagenes/ImagenesArticulos/default.jpg',
      featured: false,
    });
    setEditingId(null);
    setMessage('');
  };

  // Editar artículo
  const handleEdit = (art: Article) => {
    setArticle(art);
    setEditingId(art.id);
    setMessage('');
  };

  // Eliminar artículo
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id));
        if (editingId === id) handleNew();
        setMessage('✅ Artículo eliminado');
      } else {
        setMessage('❌ Error al eliminar');
      }
    } catch (err) {
      setMessage('❌ Error de conexión');
    }
  };

  // Crear o actualizar artículo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/articles/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/articles`;

      const body = {
        ...article,
        id: editingId || Date.now().toString(),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingId) {
          setArticles(articles.map(a => (a.id === editingId ? saved : a)));
          setMessage('✅ Artículo actualizado');
        } else {
          setArticles([saved, ...articles]);
          setMessage('✅ Artículo creado con éxito');
        }
        handleNew(); // Limpiar formulario
      } else {
        const error = await res.json();
        setMessage(`❌ Error: ${error.message}`);
      }
    } catch (err) {
      setMessage('❌ Error de conexión con el servidor');
    }
  };

  // Manejar envío de newsletter
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletter),
      });
      const data = await res.json();
      alert(data.message);
      setNewsletter({ subject: '', content: '' });
    } catch (err) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Encabezado con botón de logout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Gestiona tus artículos y suscriptores.</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('isAdmin');
            navigate('/admin-login', { replace: true });
          }}
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Mensaje de estado */}
      {message && (
        <div
          className={`p-4 mb-6 rounded-lg text-white ${
            message.includes('Error') ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? 'Editar Artículo' : 'Nuevo Artículo'}
            </h2>

            <input
              type="text"
              name="title"
              value={article.title}
              onChange={handleChange}
              placeholder="Título"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />

            <textarea
              name="excerpt"
              value={article.excerpt}
              onChange={handleChange}
              placeholder="Extracto"
              required
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />

            <textarea
              name="content"
              value={article.content}
              onChange={handleChange}
              placeholder="Contenido completo"
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-mono text-sm"
            />

            <input
              type="text"
              name="author"
              value={article.author}
              onChange={handleChange}
              placeholder="Autor"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="text"
              name="date"
              value={article.date}
              onChange={handleChange}
              placeholder="Fecha (ej: 19 Ago 2025)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="number"
              name="readTime"
              value={article.readTime}
              onChange={handleChange}
              placeholder="Minutos de lectura"
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />

            <select
              name="category"
              value={article.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="ia">IA</option>
              <option value="gadgets">Gadgets</option>
              <option value="iot">IoT</option>
              <option value="software">Software</option>
            </select>

            <input
              type="text"
              name="image"
              value={article.image}
              onChange={handleChange}
              placeholder="/imagenes/..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={article.featured}
                onChange={handleChange}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <label className="ml-2 text-sm text-gray-700">Destacado</label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
              >
                {editingId ? 'Actualizar' : 'Publicar'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleNew}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Nuevo
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listas: Artículos y Suscriptores */}
        <div className="lg:col-span-2 space-y-8">
          {/* Lista de Artículos */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Artículos Existentes</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {articles.length > 0 ? (
                articles.map((art) => (
                  <div
                    key={art.id}
                    className={`p-4 border rounded-lg ${
                      editingId === art.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{art.title}</h3>
                        <p className="text-sm text-gray-600">{art.excerpt.substring(0, 60)}...</p>
                        <div className="text-xs text-gray-500 mt-1">
                          {art.category} • {art.readTime} min • {art.date}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(art)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay artículos aún.</p>
              )}
            </div>
          </div>

          {/* Lista de Suscriptores */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Suscriptores al Newsletter</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {subscribers.length > 0 ? (
                subscribers.map((sub, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{sub.email}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(sub.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No hay suscriptores aún.</p>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Total: <strong>{subscribers.length}</strong> suscriptor{subscribers.length !== 1 ? 'es' : ''}
            </p>
          </div>

          {/* Formulario de Newsletter */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Enviar Newsletter</h2>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <input
                name="subject"
                type="text"
                placeholder="Asunto del correo"
                required
                value={newsletter.subject}
                onChange={(e) => setNewsletter({ ...newsletter, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
              <textarea
                name="content"
                placeholder="Contenido del newsletter (puedes usar saltos de línea)"
                required
                rows={6}
                value={newsletter.content}
                onChange={(e) => setNewsletter({ ...newsletter, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 font-mono text-sm"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!newsletter.subject || !newsletter.content) {
                      alert('Completa el asunto y el contenido');
                      return;
                    }
                    setPreview({
                      subject: newsletter.subject,
                      content: newsletter.content,
                    });
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Previsualizar
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Enviar a {subscribers.length} suscriptor{subscribers.length !== 1 ? 'es' : ''}
                </button>
              </div>
            </form>

            {/* Previsualización */}
            {preview && (
              <div className="mt-6 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Previsualización del Newsletter</h3>
                <div
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    lineHeight: '1.6',
                    backgroundColor: '#f4f4f4',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #ddd',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '600px',
                      margin: '0 auto',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#009688',
                        color: 'white',
                        padding: '30px',
                        textAlign: 'center',
                      }}
                    >
                      <h1 style={{ margin: 0, fontSize: '24px' }}>{preview.subject}</h1>
                    </div>
                    <div
                      style={{
                        padding: '30px',
                        fontSize: '16px',
                        color: '#444',
                        backgroundColor: '#fff',
                      }}
                    >
                      {preview.content.split('\n').map((line, i) => (
                        <p key={i} style={{ margin: '0 0 16px 0' }}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '20px',
                        fontSize: '12px',
                        color: '#999',
                        backgroundColor: '#f9f9f9',
                        borderTop: '1px solid #eee',
                      }}
                    >
                      <p>
                        <a href="#" style={{ color: '#009688', textDecoration: 'none' }}>
                          Darse de baja
                        </a>{' '}
                        |{' '}
                        <a href="#" style={{ color: '#009688', textDecoration: 'none' }}>
                          Visitar sitio web
                        </a>
                      </p>
                      <p>&copy; {new Date().getFullYear()} CBA Blog. Todos los derechos reservados.</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setPreview(null)}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cerrar previsualización
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;