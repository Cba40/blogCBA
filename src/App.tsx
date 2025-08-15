import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogSection from './components/BlogSection';
import ArticlePage from './components/ArticlePage';
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
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;