// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const location = useLocation();

  // إغلاق قائمة الجوال تلقائياً عند تغيير الصفحة
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // منع السكرول في الصفحة الخلفية عندما تكون قائمة الجوال مفتوحة
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // التحكم بظهور واختفاء النافبار بناءً على اتجاه السكرول
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // إخفاء النافبار عند النزول للأسفل، وإظهاره عند الصعود
    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Directory', path: '/catalog' },
  ];

  return (
    <>
      {/* النافبار الرئيسي - تم رفع z-index إلى 60 ليبقى فوق القائمة */}
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        // منع اختفاء النافبار إذا كانت القائمة مفتوحة
        animate={isHidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-[60] flex justify-center px-4 pt-6 pb-4 pointer-events-none"
        dir="ltr"
      >
        <div 
          className={`pointer-events-auto w-full max-w-6xl flex items-center justify-between px-6 md:px-8 py-4 rounded-full transition-all duration-500 ${
            isScrolled && !isMobileMenuOpen
              ? 'bg-white/80 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20' 
              : 'bg-transparent'
          }`}
        >
          {/* الشعار */}
          <Link 
            to="/" 
            className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-colors duration-500 ${
              isScrolled || location.pathname !== '/' || isMobileMenuOpen ? 'text-sage' : 'text-white'
            }`}
          >
            Brighton <span className="text-terracotta italic font-light">Work</span>Stays
          </Link>

          {/* روابط الديسكتوب */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                to={link.path} 
                className={`relative group font-medium text-sm uppercase tracking-widest transition-colors duration-500 ${
                  isScrolled || location.pathname !== '/' ? 'text-sage' : 'text-white'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-terracotta transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
            ))}
            
            <Link 
              to="/contact" 
              className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                isScrolled || location.pathname !== '/' 
                  ? 'bg-sage text-white shadow-md hover:bg-sage-light' 
                  : 'bg-white text-sage hover:bg-terracotta hover:text-white'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* زر قائمة الجوال (همبرغر متحرك) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden flex flex-col justify-center items-end w-10 h-10 space-y-1.5 focus:outline-none"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 8, backgroundColor: '#2F4F4F' } : { rotate: 0, y: 0, backgroundColor: isScrolled || location.pathname !== '/' ? '#2F4F4F' : '#FFFFFF' }} 
              className="w-8 h-[2px] block transition-colors duration-300" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: '100%', backgroundColor: isScrolled || location.pathname !== '/' ? '#2F4F4F' : '#FFFFFF' }} 
              className="w-6 h-[2px] block transition-all duration-300" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -8, width: '100%', backgroundColor: '#2F4F4F' } : { rotate: 0, y: 0, width: '100%', backgroundColor: isScrolled || location.pathname !== '/' ? '#2F4F4F' : '#FFFFFF' }} 
              className="w-8 h-[2px] block transition-colors duration-300" 
            />
          </button>
        </div>
      </motion.header>

      {/* قائمة الجوال (تظهر كشاشة كاملة) - تم إبقاؤها z-50 لتبقى تحت الشعار وزر الإغلاق */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-warm z-50 flex flex-col justify-center px-10"
            dir="ltr"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-5xl font-serif font-bold text-sage hover:text-terracotta transition-colors"
                  >
                    {link.name}.
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link 
                  to="/contact" 
                  className="text-5xl font-serif font-bold text-terracotta transition-colors"
                >
                  Contact.
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 pt-8 border-t border-sage/20"
              >
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Corporate Inquiries</p>
                <a href="mailto:contact@brightonhotel.co.uk" className="text-xl sm:text-2xl font-sans font-medium text-sage">
                  contact@brightonhotel.co.uk
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}