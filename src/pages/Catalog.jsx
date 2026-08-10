// src/pages/Catalog.jsx
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import rawHotelsData from '../data.json'; // تأكد أن اسم الملف هو data.json كما في كودك أو hotels.json
import HotelCard from '../components/HotelCard';

const hotelsData = rawHotelsData.flat();

// --- تصنيف العقارات حسب نوع الخاصية ---
const getCategory = (classification) => {
  const c = (classification || '').toLowerCase();
  if (c.includes('hotel')) return 'Hotels';
  if (c.includes('guest house')) return 'Guest Houses';
  if (c.includes('pub')) return 'Pubs & Gastropubs';
  if (c.includes('self-catering')) return 'Self-Catering';
  return 'Other';
};

const categories = ['All Properties', ...new Set(hotelsData.map((h) => getCategory(h.classification)))];

// --- إعدادات الحركات الناعمة ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Catalog() {
  const [typeFilter, setTypeFilter] = useState('All Properties');
  const [sortBy, setSortBy] = useState('Recommended');

  const visibleHotels = useMemo(() => {
    let list = hotelsData.filter((h) => 
      typeFilter === 'All Properties' || getCategory(h.classification) === typeFilter
    );

    switch (sortBy) {
      case 'Highest Rating':
        list = [...list].sort((a, b) => (b.rating ?? -Infinity) - (a.rating ?? -Infinity));
        break;
      case 'Most Reviewed':
        list = [...list].sort((a, b) => (b.reviewsCount ?? -Infinity) - (a.reviewsCount ?? -Infinity));
        break;
      default:
        list = [...list];
    }

    return list;
  }, [typeFilter, sortBy]);

  return (
    <ReactLenis root>
      <div dir="ltr" className="bg-warm min-h-screen font-sans text-sage pb-32">
        
        {/* 1. Premium Editorial Header */}
        <section className="pt-32 pb-12 px-8 md:px-16 max-w-7xl mx-auto border-b border-sage/10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.p variants={fadeUp} className="text-terracotta uppercase tracking-[0.2em] text-sm font-bold mb-6">
              The Collection
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-serif font-bold text-sage mb-8 tracking-tight">
              Directory.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-600 font-light leading-relaxed">
              Showing <span className="font-semibold text-sage">{visibleHotels.length}</span> curated properties in Brighton & Hove. Handpicked for professionals, remote workers, and extended corporate residencies.
            </motion.p>
          </motion.div>
        </section>

        {/* 2. Interactive Filter Bar */}
        <section className="py-8 px-8 md:px-16 max-w-7xl mx-auto sticky top-0 z-40 bg-warm/90 backdrop-blur-md border-b border-sage/5 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 py-2.5 px-6 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-terracotta/50 appearance-none cursor-pointer font-medium text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 py-2.5 px-6 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-terracotta/50 appearance-none cursor-pointer font-medium text-sm"
              >
                <option>Sort by: Recommended</option>
                <option>Highest Rating</option>
                <option>Most Reviewed</option>
              </select>
            </div>
            
            <div className="hidden md:block text-sm text-gray-500 font-medium">
              Scroll to explore ↓
            </div>
          </motion.div>
        </section>

        {/* 3. Scrolling Catalog List */}
        <main className="max-w-6xl mx-auto px-8 md:px-4">
          {visibleHotels.length === 0 ? (
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center text-xl text-gray-500 py-20"
            >
              No properties match this filter.
            </motion.p>
          ) : (
            <div className="flex flex-col gap-10">
              {visibleHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id || index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }} // يبدأ الظهور قبل وصول العنصر لمنتصف الشاشة بقليل
                  variants={fadeUp}
                  whileHover={{ scale: 1.01, y: -4 }} // تأثير فيزيائي عند مرور الماوس
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="transition-shadow hover:shadow-2xl rounded-2xl bg-white border border-gray-100"
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>
          )}
        </main>

      </div>
    </ReactLenis>
  );
}
