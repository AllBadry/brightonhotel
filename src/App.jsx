// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Privacy, { Terms, Cookies } from './pages/Legal';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-warm text-gray-800 antialiased">
        {/* الناف بار سيظهر في جميع الصفحات */}
        <Navbar />

        {/* محتوى الصفحات المتغير */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </div>

        {/* الفوتر سيظهر في جميع الصفحات */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;