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
      navigate('/admin-login');
    }
  }, [navigate]);

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

  // Estado para la lista de artículos
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Cargar artículos desde la API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/articles');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setMessage('❌ Error al cargar artículos');
      }
    };

    fetchArticles();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setArticle({
      ...article,
      [name]: type === 'checkbox' ? checked : value,
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
      const res = await fetch(`http://localhost:5000/api/articles/${id}`, {
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

  // Crear o actualizar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/articles/${editingId}` : 'http://localhost:5000/api/articles';

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
          setArticles(articles.map(a => a.id === editingId ? saved : a));
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
      <p className="text-gray-600 mt-1">Gestiona tus artículos: crea, edita y elimina noticias.</p>
    </div>
    {/* Botón de Cerrar Sesión */}
    <button
      onClick={() => {
        localStorage.removeItem('isAdmin');
        navigate('/admin-login', { replace: true }); // ← Reemplaza la entrada en el historial
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

  {/* Resto del contenido (formulario y lista) */}
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

        {/* Lista de artículos */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Artículos Existentes</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
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
      </div>
    </div>
  );
};

export default AdminPanel;