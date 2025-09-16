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
    image: 'default.jpg', // ✅ Solo el nombre del archivo
    featured: false,
  });

  // Estado para artículos y suscriptores
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<{ email: string; createdAt: string }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<{ subject: string; content: string } | null>(null);

  // ✅ Función para recargar artículos desde el servidor
  const fetchArticles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error('Error al cargar artículos:', err);
      setMessage('❌ Error al cargar artículos');
    }
  };

  // ✅ Cargar artículos al montar el componente
  useEffect(() => {
    fetchArticles();
  }, []);

  // Cargar suscriptores
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribers`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setSubscribers(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setSubscribers([]);
        }
      } catch (err) {
        console.error('Error al cargar suscriptores', err);
        setSubscribers([]);
      }
    };

    fetchSubscribers();
  }, []);

  // ✅ Manejar cambios en el formulario con validaciones
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: any = value;
    
    if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked;
    } else if (name === 'readTime') {
      processedValue = parseInt(value) || 1;
    }
    
    setArticle({
      ...article,
      [name]: processedValue,
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
      image: 'default.jpg', // ✅ Solo nombre
      featured: false,
    });
    setEditingId(null);
    setMessage('');
  };

  // ✅ Editar artículo con validaciones mejoradas
  const handleEdit = (art: Article) => {
    const imageName = art.image.split('/').pop() || 'default.jpg';
    setArticle({
      ...art,
      image: imageName,
      featured: art.featured || false,
      readTime: art.readTime || 5,
      category: art.category || 'ia',
      author: art.author || 'CBA 4.0 Blog'
    });
    setEditingId(art.id);
    setMessage('');
  };

  // ✅ CORRECCIÓN PRINCIPAL: handleDelete mejorado
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchArticles();
        if (editingId === id) handleNew();
        setMessage('✅ Artículo eliminado');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await res.json();
        setMessage(`❌ Error al eliminar: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
      setMessage('❌ Error de conexión');
    }
  };

  // ✅ CORRECCIÓN PRINCIPAL: handleSubmit mejorado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!article.title.trim()) {
      setMessage('❌ El título es obligatorio');
      return;
    }
    if (!article.excerpt.trim()) {
      setMessage('❌ El extracto es obligatorio');
      return;
    }
    if (!article.content.trim()) {
      setMessage('❌ El contenido es obligatorio');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/articles/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/articles`;

      // ✅ Reconstruir ruta completa
      const body = {
        ...article,
        image: `/imagenes/ImagenesArticulos/${article.image}`, // ✅ Ruta completa
        id: editingId || Date.now().toString(),
        readTime: article.readTime || 5,
        featured: article.featured || false,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchArticles();
        setMessage(editingId ? '✅ Artículo actualizado' : '✅ Artículo creado con éxito');
        handleNew();
        setTimeout(() => setMessage(''), 3000);
      } else {
        const error = await res.json();
        setMessage(`❌ Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error en handleSubmit:', err);
      setMessage('❌ Error de conexión con el servidor');
    }
  };

  // Manejar envío de newsletter
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter.subject.trim() || !newsletter.content.trim()) {
      alert('Por favor completa el asunto y el contenido');
      return;
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletter),
      });
      const data = await res.json();
      alert(data.message);
      setNewsletter({ subject: '', content: '' });
      setPreview(null);
    } catch (err) {
      console.error('Error al enviar newsletter:', err);
      alert('Error de conexión');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Encabezado */}
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
            message.includes('Error') || message.includes('❌') ? 'bg-red-600' : 'bg-green-600'
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

            {/* ✅ Input mejorado para imagen */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre del archivo de la imagen
              </label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 truncate max-w-[180px]">
                  /imagenes/ImagenesArticulos/
                </span>
                <input
                  type="text"
                  name="image"
                  value={article.image}
                  onChange={handleChange}
                  placeholder="articulo11.webp"
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">
                Solo el nombre del archivo (ej: articulo10.jpg)
              </p>
            </div>

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
          {/* Lista de Artículos - Ampliada */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Artículos Existentes ({articles.length})
            </h2>
            <div className="space-y-3 max-h-80 overflow-y-auto bg-white rounded-lg border border-gray-200 p-2">
              {articles.length > 0 ? (
                articles.map((art) => (
                  <div
                    key={art.id}
                    className={`p-4 border rounded-lg transition-all duration-200 ${
                      editingId === art.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{art.title}</h3>
                        <p className="text-sm text-gray-600">
                          {art.excerpt ? `${art.excerpt.substring(0, 60)}...` : 'Sin extracto'}
                        </p>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span>{art.category}</span>
                          <span>•</span>
                          <span>{art.readTime} min</span>
                          <span>•</span>
                          <span>{art.date}</span>
                          {art.featured && (
                            <>
                              <span>•</span>
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Destacado</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(art)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-6">No hay artículos aún.</p>
              )}
            </div>
          </div>

          {/* Lista de Suscriptores - Más compacta */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Suscriptores ({subscribers.length})
            </h2>
            <div className="max-h-40 overflow-y-auto bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
              {subscribers.length > 0 ? (
                subscribers.map((sub, index) => (
                  <div key={index} className="p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{sub.email}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(sub.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">Ninguno</p>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">
              Total: <strong>{subscribers.length}</strong>
            </p>
          </div>

          {/* Formulario de Newsletter */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
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
                placeholder="Contenido del newsletter"
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
                        <a href="http://cbacuatropuntocero.com.ar/" style={{ color: '#009688', textDecoration: 'none' }}>
                          Visitar sitio web
                        </a>
                        {' | '}
                        <a 
                          href="https://blogcba-api.onrender.com/api/unsubscribe?token=123456789" 
                          style={{ color: '#009688', textDecoration: 'none' }}
                        >
                          Darse de baja
                        </a>
                        {' | '}
                        <a href="https://cbacuatropuntocero.com.ar/blog" style={{ color: '#009688', textDecoration: 'none' }}>
                          Visitar el Blog
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