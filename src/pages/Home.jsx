import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import TextReveal from '../components/TextReveal';
import ImageReveal from '../components/ImageReveal';
import ParallaxSection from '../components/ParallaxSection';
import HorizontalGallery from '../components/HorizontalGallery';

const ease = [0.16, 1, 0.3, 1];

const smoothReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease }
  }
};

const introParagraph =
  'Find your workspace in the city, enjoy what our curated properties offer, and make your long-term stay a seamless experience.';

const gallerySlides = [
  {
    src: '/images/hotel-pool.jpg',
    caption: 'Sunlit suites above the Lanes',
    tag: 'Hotels',
  },
  {
    src: '/images/resort-pool.jpg',
    caption: 'Boardrooms with a sea view',
    tag: 'Corporate',
  },
  {
    src: '/images/hotel-room.jpg',
    caption: 'Mornings on the terrace',
    tag: 'Apartments',
  },
  {
    src: '/images/luxury-suite.jpg',
    caption: 'Quiet corners to reset',
    tag: 'Wellness',
  },
  {
    src: '/images/suite-ready.jpg',
    caption: 'A lobby that feels like home',
    tag: 'Retreats',
  },
];

export default function Home() {
  const heroRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', '35%']);
  const heroBgScale = useTransform(heroProgress, [0, 1], [1, 1.18]);
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', '70%']);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const { scrollYProgress: pageProgress } = useScroll();
  const marqueeX = useTransform(pageProgress, [0, 1], ['0%', '-45%']);

  return (
    <ReactLenis root>
      <div dir="ltr" className="bg-warm font-sans overflow-x-clip text-sage">

        {/* 1. Hero Section - Parallax متعدد الطبقات */}
        <section
          ref={heroRef}
          className="relative h-[100vh] flex flex-col justify-end pb-14 md:pb-20 px-6 md:px-16 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: "url('/images/hero-hotel.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: heroBgY,
              scale: heroBgScale,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage/95 via-sage/40 to-sage/10 z-10" />

          <div className="absolute -top-40 -right-40 w-[50vw] h-[50vw] rounded-full bg-terracotta/15 blur-[140px] z-[5] animate-drift" />

          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            className="relative z-20 max-w-7xl mx-auto w-full"
          >
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
              className="text-terracotta uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4 ml-1 md:ml-2"
            >
              The Corporate Directory
            </motion.p>
            <motion.h1
              initial={{ clipPath: 'inset(0 0 100% 0)', y: 80 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease }}
              className="text-6xl sm:text-7xl md:text-[9rem] leading-[1.1] md:leading-none font-serif font-bold text-white mb-6"
            >
              Your Base,<br />
              <span className="italic font-light text-warm">in Brighton.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.9, ease }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/20 pt-6 md:pt-8 mt-8 md:mt-12 gap-6 md:gap-0"
            >
              <p className="text-white/80 text-lg md:text-xl font-light max-w-xl">
                Curated extended residencies and executive accommodations. Where productivity meets the Sussex coast.
              </p>
              <Link
                to="/catalog"
                className="w-full md:w-auto text-center flex items-center justify-center gap-3 bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-terracotta transition duration-500"
              >
                Check Availability
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-transparent via-white/70 to-transparent block"
            />
            <span className="text-white/60 text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          </motion.div>
        </section>

        {/* 2. Intro Statement - كلمات تظهر مع السكرول */}
        <section className="py-24 md:py-40 px-6 md:px-16 max-w-6xl mx-auto text-center">
          <TextReveal
            as="h2"
            text={introParagraph}
            className="text-3xl sm:text-4xl md:text-6xl font-serif font-medium leading-[1.4] md:leading-[1.3] text-sage"
          />
        </section>

        {/* 3. Alternating Cinematic Sections */}
        <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-32 md:space-y-44">

          {/* Block 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <ParallaxSection speed={0.18} className="w-full md:w-1/2">
              <ImageReveal
                src="/images/executive-room.jpg"
                alt="Executive Room"
                className="overflow-hidden rounded-2xl h-[45vh] sm:h-[55vh] md:h-[72vh]"
                imgClassName="w-full h-full object-cover"
              />
            </ParallaxSection>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <motion.p {...{ initial: 'hidden', whileInView: 'visible', viewport: { once: true } }} variants={smoothReveal} className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">
                Accommodations
              </motion.p>
              <motion.h3
                initial={{ clipPath: 'inset(0 0 100% 0)', y: 40 }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease }}
                className="text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6"
              >
                Designed for Focus.
              </motion.h3>
              <motion.p {...{ initial: 'hidden', whileInView: 'visible', viewport: { once: true } }} variants={smoothReveal} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6 md:mb-8">
                Every property in our catalog is strictly verified for Gigabit Wi-Fi, ergonomic workspaces, and quiet environments. We filter out the holiday noise so you can focus on your business goals.
              </motion.p>
              <motion.div {...{ initial: 'hidden', whileInView: 'visible', viewport: { once: true } }} variants={smoothReveal}>
                <Link to="/catalog" className="inline-block border-b border-sage pb-1 text-sage font-medium hover:text-terracotta hover:border-terracotta transition duration-300">Explore Rooms &rarr;</Link>
              </motion.div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
            <ParallaxSection speed={0.18} className="w-full md:w-1/2">
              <ImageReveal
                src="/images/beach-chairs.jpg"
                alt="Brighton Architecture"
                className="overflow-hidden rounded-2xl h-[45vh] sm:h-[55vh] md:h-[72vh]"
                imgClassName="w-full h-full object-cover"
              />
            </ParallaxSection>
            <div className="w-full md:w-1/2 md:pr-16 mt-4 md:mt-0">
              <motion.p {...{ initial: 'hidden', whileInView: 'visible', viewport: { once: true } }} variants={smoothReveal} className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">
                Location
              </motion.p>
              <motion.h3
                initial={{ clipPath: 'inset(0 0 100% 0)', y: 40 }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease }}
                className="text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6"
              >
                Where work meets the coast.
              </motion.h3>
              <motion.p {...{ initial: 'hidden', whileInView: 'visible', viewport: { once: true } }} variants={smoothReveal} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6 md:mb-8">
                Nestled on the Sussex coast, Brighton offers the perfect balance. Step out of your executive suite and within minutes, find yourself walking along the beach or enjoying a coffee in the historic Lanes.
              </motion.p>
              <motion.div {...{ initial: 'hidden', whileInView: 'visible', viewport: { once: true } }} variants={smoothReveal}>
                <Link to="/catalog" className="inline-block border-b border-sage pb-1 text-sage font-medium hover:text-terracotta hover:border-terracotta transition duration-300">Discover Brighton &rarr;</Link>
              </motion.div>
            </div>
          </div>

        </section>

        {/* 4. Full-Screen Cinematic Gallery */}
        <HorizontalGallery slides={gallerySlides} eyebrow="The Experience" />

        {/* 5. Giant Marquee - نص يتحرك مع السكرول */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-sage text-warm border-y border-white/10 flex flex-col justify-center min-h-[30vh] md:min-h-[50vh]">
          <motion.div style={{ x: marqueeX }} className="whitespace-nowrap flex items-center">
            <h2 className="text-[4rem] sm:text-[6rem] md:text-[12rem] font-serif font-light tracking-tighter mx-4 md:mx-8">Pure Focus</h2>
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
              className="w-24 h-[4rem] sm:w-32 sm:h-[6rem] md:w-64 md:h-[12rem] rounded-full overflow-hidden mx-4 md:mx-8 inline-block align-middle transform -translate-y-2 sm:-translate-y-4 md:-translate-y-8 animate-float"
            >
              <img src="/images/office-focus.jpg" className="w-full h-full object-cover" alt="Focus" />
            </motion.div>
            <h2 className="text-[4rem] sm:text-[6rem] md:text-[12rem] font-serif font-light tracking-tighter mx-4 md:mx-8 text-terracotta italic">Coastal Calm</h2>
            <h2 className="text-[4rem] sm:text-[6rem] md:text-[12rem] font-serif font-light tracking-tighter mx-4 md:mx-8">Pure Focus</h2>
          </motion.div>
        </section>

        {/* 6. Testimonials */}
        <section className="py-28 md:py-40 px-6 md:px-16 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="mb-12 md:mb-16">
            <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">Guest Voices</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-sage">What our guests say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={smoothReveal}
              whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="text-terracotta flex gap-1 mb-6 text-xl">★★★★★</div>
                <p className="text-gray-600 font-light text-base md:text-lg italic mb-8">"An absolute stroke of luck for my business trip. I have never been hosted so lovingly and with so much style while maintaining a perfect work environment."</p>
              </div>
              <p className="font-bold text-sage tracking-wide uppercase text-sm">Petra P. <span className="font-light text-gray-400 capitalize block mt-1">Germany</span></p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={smoothReveal} transition={{ delay: 0.12 }}
              whileHover={{ y: -8 }} className="bg-sage text-warm p-8 md:p-10 rounded-2xl shadow-md flex flex-col justify-between transform md:-translate-y-8"
            >
              <div>
                <div className="text-terracotta flex gap-1 mb-6 text-xl">★★★★★</div>
                <p className="text-warm/80 font-light text-base md:text-lg italic mb-8">"Beautiful hotel, relaxing environment and excellent food. The internet speed was flawless for my video conferences. Highly recommended!"</p>
              </div>
              <p className="font-bold text-white tracking-wide uppercase text-sm">Alexandra A. <span className="font-light text-white/50 capitalize block mt-1">Italy</span></p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={smoothReveal} transition={{ delay: 0.24 }}
              whileHover={{ y: -8 }} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="text-terracotta flex gap-1 mb-6 text-xl">★★★★★</div>
                <p className="text-gray-600 font-light text-base md:text-lg italic mb-8">"A fantastic starting point. The family not only makes an effort but takes care of every concern. The standard is outstanding."</p>
              </div>
              <p className="font-bold text-sage tracking-wide uppercase text-sm">Volker K. <span className="font-light text-gray-400 capitalize block mt-1">Netherlands</span></p>
            </motion.div>
          </div>
        </section>

        {/* 7. Footer CTA - تكبير وظهور ناعم */}
        <section className="bg-warm relative py-28 md:py-40 border-t border-sage/10 text-center px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-terracotta/40 to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-sage mb-8 leading-[1.1]">
              Come stay <span className="italic font-light">with us,</span><br />
              <span className="text-terracotta font-signature">at Brighton.</span>
            </h2>
            <Link
              to="/catalog"
              className="inline-block w-full sm:w-auto bg-sage text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-terracotta transition duration-300"
            >
              Book your stay
            </Link>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}