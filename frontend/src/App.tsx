import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogSection from './components/BlogSection';
import ArticlePage from './components/ArticlePage';
import ContactPage from './components/ContactPage';
import SearchResultsPage from './components/SearchResultsPage';
import AdminPanel from './components/AdminPanel';
import FavoritesPage from './components/FavoritesPage';
import AdminLogin from './components/AdminLogin';

import Layout from './components/Layout';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Botón de WhatsApp siempre visible */}
        <WhatsAppButton />

        {/* Layout maneja Header y Footer */}
        <Layout>
          <Routes>
            <Route path="/" element={<BlogSection />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/buscar" element={<SearchResultsPage />} />
             <Route path="/admin-login" element={<AdminLogin />} />
             <Route path="/admin" element={<AdminPanel />} />
             <Route path="/favoritos" element={<FavoritesPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;