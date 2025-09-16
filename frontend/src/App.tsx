import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import WhatsAppButton from './components/WhatsAppButton';

// --- Carga dinámica (lazy) de componentes ---
const BlogSection = lazy(() => import('./components/BlogSection'));
const ArticlePage = lazy(() => import('./components/ArticlePage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const SearchResultsPage = lazy(() => import('./components/SearchResultsPage'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const FavoritesPage = lazy(() => import('./components/FavoritesPage'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const Layout = lazy(() => import('./components/Layout'));

// --- Componente de carga ---
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router basename="/blog">
      <div className="min-h-screen bg-gray-50">
        {/* Botón de WhatsApp siempre visible */}
        <WhatsAppButton />

        {/* Rutas con Suspense individual */}
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Layout>
                  <BlogSection />
                </Layout>
              </Suspense>
            }
          />
          <Route
            path="/article/:id"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Layout>
                  <ArticlePage />
                </Layout>
              </Suspense>
            }
          />
          <Route
            path="/contacto"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Layout>
                  <ContactPage />
                </Layout>
              </Suspense>
            }
          />
          <Route
            path="/buscar"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Layout>
                  <SearchResultsPage />
                </Layout>
              </Suspense>
            }
          />
          <Route
            path="/admin-login"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Layout>
                  <AdminLogin />
                </Layout>
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Layout>
                  <AdminPanel />
                </Layout>
              </Suspense>
            }
          />
          <Route
            path="/favoritos"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Layout>
                  <FavoritesPage />
                </Layout>
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;