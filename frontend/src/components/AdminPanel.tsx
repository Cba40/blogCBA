// src/components/AdminPanel.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types/Article';
import { supabase } from '../lib/supabase';

const AdminPanel = () => {
  const navigate = useNavigate();

  // Verificar autenticación
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);

  // Estado para artículos y suscriptores
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<{ email: string; createdat: string }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // ✅ Función para recargar artículos desde Supabase
  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      // Corregir rutas de imágenes
      const fixedData = data.map(article => ({
        ...article,
        image: article.image.startsWith('/imagenes/')
          ? `/blog${article.image}`
          : article.image
      }));

      setArticles(fixedData);
    } catch (err) {
      console.error('Error al cargar artículos desde Supabase:', err);
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
        const { data, error } = await supabase
          .from('subscribers')
          .select('email, createdat')
          .order('createdat', { ascending: false });

        if (error) throw error;

        setSubscribers(data);
      } catch (err) {
        console.error('Error al cargar suscriptores desde Supabase:', err);
        setSubscribers([]);
      }
    };

    fetchSubscribers();
  }, []);

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
    readtime: 5,
    category: 'ia',
    image: 'default.jpg', // ✅ Solo el nombre del archivo
    featured: false,
  });

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
      readtime: 5,
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
      readtime: art.readtime || 5,
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
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchArticles();
      if (editingId === id) handleNew();
      setMessage('✅ Artículo eliminado');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error al eliminar artículo:', err);
      setMessage('❌ Error al eliminar');
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
      const articleData = {
        ...article,
        image: `/imagenes/ImagenesArticulos/${article.image}`, // ✅ Ruta completa
        readtime: article.readtime || 5, // 👈 Nota: en tu tabla es 'readtime'
        featured: article.featured || false,
        date: article.date, // 👈 Asegúrate que sea una cadena válida
      };

      let result;
      if (editingId) {
        // Actualizar
        const { data, error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingId);

        if (error) throw error;
        result = data;
      } else {
        // Crear nuevo
        const newId = Date.now().toString();
        const { data, error } = await supabase
          .from('articles')
          .insert([{ ...articleData, id: newId }])
          .select();

        if (error) throw error;
        result = data;
      }

      await fetchArticles();
      setMessage(editingId ? '✅ Artículo actualizado' : '✅ Artículo creado con éxito');
      handleNew();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error en handleSubmit:', err);
      setMessage('❌ Error al guardar artículo');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Gestiona tus artículos.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/newsletter')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Newsletter
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('isAdmin');
              navigate('/admin-login', { replace: true });
            }}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
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
              value={article.readtime} // 👈 Nota: en tu tabla es 'readtime'
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
                checked={article.featured ?? false}
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

        {/* Lista de Artículos - Ampliada */}
        <div className="lg:col-span-2">
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
                        <span>{art.readtime} min</span> {/* 👈 Nota: en tu tabla es 'readtime' */}
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
      </div>
    </div>
  );
};

export default AdminPanel;