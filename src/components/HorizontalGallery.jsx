import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function HorizontalGallery({ slides = [], eyebrow = 'The Experience' }) {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const diff = trackRef.current.scrollWidth - window.innerWidth;
        setOffset(Math.max(0, diff));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const x = useTransform(smoothProgress, [0, 1], [0, -offset]);

  return (
    <section ref={targetRef} className="relative h-[350vh] bg-sage">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="px-8 md:px-16 mb-8 flex items-end justify-between"
        >
          <div>
            <p className="text-terracotta uppercase tracking-[0.3em] text-xs font-bold mb-3">{eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-warm">
              A stay worth <span className="italic font-light text-gold">remembering.</span>
            </h2>
          </div>
          <p className="hidden md:block text-sage-light text-sm tracking-widest uppercase">Scroll &rarr;</p>
        </motion.div>

        <div ref={trackRef} className="flex flex-nowrap pl-[8vw] pr-[8vw]">
          <motion.div style={{ x }} className="flex gap-[5vw] will-change-transform">
            {slides.map((slide, i) => (
              <div key={i} className="relative h-[52vh] md:h-[62vh] w-[78vw] md:w-[46vw] flex-shrink-0 overflow-hidden rounded-2xl group">
                <img src={slide.src} alt={slide.caption || ''} className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-sage/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between">
                  <div>
                    <p className="text-gold text-xs uppercase tracking-[0.25em] font-bold mb-2">0{i + 1}</p>
                    <p className="text-warm font-serif italic text-2xl md:text-4xl max-w-xs leading-tight">{slide.caption}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-3 text-sage-light">
                    <span className="h-px w-10 bg-sage-light/40" />
                    <span className="text-xs tracking-widest uppercase">{slide.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}