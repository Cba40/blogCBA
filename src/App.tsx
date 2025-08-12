import React from 'react';
import Header from './components/Header';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WhatsAppButton />
      <Header />
      <BlogSection />
      <Footer />
    </div>
  );
}

export default App;