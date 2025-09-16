// src/components/ArticlePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // ✅ Asegurate de tenerlo instalado
import Sidebar from './Sidebar';
import AdBanners from './AdBanners';
import { Article } from '../types/Article';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Scroll al cargar el artículo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Cargar el artículo desde la API
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
        if (!res.ok) {
          throw new Error('No encontrado');
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error('Artículo no encontrado:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
        <p className="text-gray-600">El artículo que buscas no existe o fue eliminado.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
        >
          ← Volver al blog
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ✅ SEO Automatizado con Helmet */}
      <Helmet>
        <title>{article.title} | CBA 4.0 Blog News</title>
        <meta 
          name="description" 
          content={`${article.excerpt.substring(0, 150)}...`} 
        />
        <link rel="canonical" href={`https://cbacuatropuntocero.com.ar/blog/article/${article.id}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "description": article.excerpt,
            "image": `https://cbacuatropuntocero.com.ar/blog${article.image}`,
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "author": {
              "@type": "Organization",
              "name": "CBA 4.0"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CBA 4.0",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cbacuatropuntocero.com.ar/blog/logo.webp"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://cbacuatropuntocero.com.ar/blog/article/${article.id}`
            }
          })}
        </script>
      </Helmet>

      {/* Contenido principal */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón de volver */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-2"
          >
            ← Volver al blog
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <span>Por {article.author}</span>
                <span>{article.date}</span>
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                  {article.category.toUpperCase()}
                </span>
                <span>{article.readTime} min de lectura</span>
              </div>

              {/* Imagen principal */}
              <img
                src={`/blog${article.image}`}
                alt={article.title}
                width="600"
                height="300"
                loading="lazy"
                className="w-full h-48 object-cover rounded-lg"
              />
            </header>

            {/* Contenido del artículo */}
            <main className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              {article.content
                .split('\n')
                .map((line, index) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h3
                        key={index}
                        className="text-2xl font-semibold text-gray-900 mt-8 mb-2"
                      >
                        {line.slice(3)}
                      </h3>
                    );
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return (
                      <p key={index} className="mb-4">
                        {line}
                      </p>
                    );
                  }
                })}
            </main>

            {/* CTA: Llamado a la acción */}
            <div className="bg-teal-50 p-6 rounded-lg my-8 text-center max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900">
                ¿Querés transformar tu negocio con tecnología 4.0?
              </h3>
              <p className="text-gray-700 mt-2">
                Te ayudamos con desarrollo web, automatización, IoT y estrategias digitales.
              </p>
              <a 
                href="/blog/contacto" 
                className="inline-block mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Habla con nosotros →
              </a>
            </div>

            {/* Anuncios después del contenido */}
            <AdBanners />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>

        {/* Botón de volver al final */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-2"
          >
            ← Volver al blog
          </button>
        </div>
      </article>
    </>
  );
};

export default ArticlePage;
