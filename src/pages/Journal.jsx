import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { articles, articleCategories } from '../data/articles';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => (activeCategory === 'All' ? articles : articles.filter((a) => a.category === activeCategory)),
    [activeCategory]
  );

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <ReactLenis root>
      <div dir="ltr" className="bg-warm min-h-screen font-sans text-sage pb-32">

        {/* Header */}
        <section className="pt-32 pb-12 px-8 md:px-16 max-w-7xl mx-auto border-b border-sage/10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.p variants={fadeUp} className="text-terracotta uppercase tracking-[0.2em] text-sm font-bold mb-6">
              Journal
            </motion.p>
            <motion.h1
              initial={{ clipPath: 'inset(0 0 100% 0)', y: 40 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease }}
              className="text-5xl md:text-7xl font-serif font-bold text-sage mb-8 tracking-tight"
            >
              Stories & Guides.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-600 font-light leading-relaxed">
              Thoughts on work, travel, and making the most of Brighton.
            </motion.p>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-8 md:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-3 overflow-x-auto pb-2"
          >
            {articleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-sage text-white shadow-md'
                    : 'bg-white text-sage border border-sage/10 hover:border-sage/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Featured Article */}
        {featured && (
          <section className="px-8 md:px-16 max-w-7xl mx-auto mb-12">
            <AnimatePresence mode="wait">
              <motion.article
                key={featured.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
                className="group relative h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-sage/90 via-sage/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {featured.category}
                    </span>
                    <span className="text-warm/60 text-sm">{featured.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-warm mb-3 group-hover:text-gold transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-warm/70 font-light max-w-xl text-base md:text-lg">{featured.excerpt}</p>
                </div>
              </motion.article>
            </AnimatePresence>
          </section>
        )}

        {/* Article Grid */}
        <section className="px-8 md:px-16 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((article, i) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-500 cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-sage/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-terracotta text-xs font-bold uppercase tracking-wider">{article.category}</span>
                      <span className="text-gray-400 text-xs">·</span>
                      <span className="text-gray-400 text-xs">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-sage mb-2 group-hover:text-terracotta transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">{article.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                      <span>{article.date}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xl text-gray-500 py-20">
              No articles in this category yet.
            </motion.p>
          )}
        </section>

        {/* CTA */}
        <section className="mt-24 md:mt-32 bg-sage text-warm py-24 md:py-32 text-center px-6 rounded-t-[3rem]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1]">
              Want to <span className="italic font-light text-gold">feature your story?</span>
            </h2>
            <p className="text-warm/70 font-light text-lg mb-10 max-w-md mx-auto">
              We welcome guest contributions from Brighton-based professionals and travel writers.
            </p>
            <Link to="/contact" className="inline-block bg-terracotta text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-terracotta transition duration-300">
              Pitch a story
            </Link>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}