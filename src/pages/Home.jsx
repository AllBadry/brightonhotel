import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

// --- إعدادات الحركات الناعمة ---
const smoothReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // تأثير Parallax للخلفية والشريط المتحرك
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const content = (
    <div dir="ltr" className="bg-warm font-sans overflow-hidden text-sage">
      
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1920&q=80')",
            y: heroY
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sage/95 via-sage/50 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-terracotta uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4 ml-1 md:ml-2"
          >
            The Corporate Directory
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-[9rem] leading-[1.1] md:leading-none font-serif font-bold text-white mb-6"
          >
            Your Base,<br />
            <span className="italic font-light text-warm">in Brighton.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/20 pt-6 md:pt-8 mt-8 md:mt-12 gap-6 md:gap-0"
          >
            <p className="text-white/80 text-lg md:text-xl font-light max-w-xl">
              Curated extended residencies and executive accommodations. Where productivity meets the Sussex coast.
            </p>
            <Link to="/catalog" className="w-full md:w-auto text-center flex items-center justify-center gap-3 bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-terracotta transition duration-500">
              Check Availability
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Intro Statement */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-5xl mx-auto text-center">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={smoothReveal}
          className="text-3xl sm:text-4xl md:text-6xl font-serif font-medium leading-[1.4] md:leading-[1.3] text-sage"
        >
          Find your <span className="text-terracotta italic">workspace</span> in the city, enjoy what our <span className="italic">curated</span> properties offer, and make your <span className="italic">long-term stay</span> a seamless experience.
        </motion.h2>
      </section>

      {/* 3. Alternating Sections */}
      <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-24 md:space-y-32">
        
        {/* Block 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div 
            className="w-full md:w-1/2 overflow-hidden rounded-2xl h-[40vh] sm:h-[50vh] md:h-[70vh]"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={imageReveal}
          >
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80" alt="Executive Room" className="w-full h-full object-cover" />
          </motion.div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">Accommodations</motion.p>
            <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6">Designed for Focus.</motion.h3>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6 md:mb-8">
              Every property in our catalog is strictly verified for Gigabit Wi-Fi, ergonomic workspaces, and quiet environments. We filter out the holiday noise so you can focus on your business goals.
            </motion.p>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}>
              <Link to="/catalog" className="inline-block border-b border-sage pb-1 text-sage font-medium hover:text-terracotta hover:border-terracotta transition duration-300">Explore Rooms &rarr;</Link>
            </motion.div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
          <motion.div 
            className="w-full md:w-1/2 overflow-hidden rounded-2xl h-[40vh] sm:h-[50vh] md:h-[70vh]"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={imageReveal}
          >
            <img src="https://images.unsplash.com/photo-1582200237199-3171120042da?auto=format&fit=crop&w=1920&q=80" alt="Brighton Architecture" className="w-full h-full object-cover" />
          </motion.div>
          <div className="w-full md:w-1/2 md:pr-16 mt-4 md:mt-0">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">Location</motion.p>
            <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6">Where work meets the coast.</motion.h3>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6 md:mb-8">
              Nestled on the Sussex coast, Brighton offers the perfect balance. Step out of your executive suite and within minutes, find yourself walking along the beach or enjoying a coffee in the historic Lanes.
            </motion.p>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}>
              <Link to="/catalog" className="inline-block border-b border-sage pb-1 text-sage font-medium hover:text-terracotta hover:border-terracotta transition duration-300">Discover Brighton &rarr;</Link>
            </motion.div>
          </div>
        </div>

      </section>

      {/* 4. Giant Marquee Section */}
      <section className="py-20 md:py-32 overflow-hidden bg-sage text-warm border-y border-white/10 flex flex-col justify-center min-h-[30vh] md:min-h-[50vh]">
        <motion.div style={{ x: marqueeX }} className="whitespace-nowrap flex items-center">
           <h2 className="text-[4rem] sm:text-[6rem] md:text-[12rem] font-serif font-light tracking-tighter mx-4 md:mx-8">Pure Focus</h2>
           <div className="w-24 h-[4rem] sm:w-32 sm:h-[6rem] md:w-64 md:h-[12rem] rounded-full overflow-hidden mx-4 md:mx-8 inline-block align-middle transform -translate-y-2 sm:-translate-y-4 md:-translate-y-8">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Focus" />
           </div>
           <h2 className="text-[4rem] sm:text-[6rem] md:text-[12rem] font-serif font-light tracking-tighter mx-4 md:mx-8 text-terracotta italic">Coastal Calm</h2>
           <h2 className="text-[4rem] sm:text-[6rem] md:text-[12rem] font-serif font-light tracking-tighter mx-4 md:mx-8">Pure Focus</h2>
        </motion.div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="mb-12 md:mb-16">
          <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">Guest Voices</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sage">What our guests say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Review Card 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="text-terracotta flex gap-1 mb-6 text-xl">★★★★★</div>
              <p className="text-gray-600 font-light text-base md:text-lg italic mb-8">"An absolute stroke of luck for my business trip. I have never been hosted so lovingly and with so much style while maintaining a perfect work environment."</p>
            </div>
            <p className="font-bold text-sage tracking-wide uppercase text-sm">Petra P. <span className="font-light text-gray-400 capitalize block mt-1">Germany</span></p>
          </motion.div>

          {/* Review Card 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={smoothReveal} className="bg-sage text-warm p-8 md:p-10 rounded-2xl shadow-md flex flex-col justify-between transform md:-translate-y-8">
            <div>
              <div className="text-terracotta flex gap-1 mb-6 text-xl">★★★★★</div>
              <p className="text-warm/80 font-light text-base md:text-lg italic mb-8">"Beautiful hotel, relaxing environment and excellent food. The internet speed was flawless for my video conferences. Highly recommended!"</p>
            </div>
            <p className="font-bold text-white tracking-wide uppercase text-sm">Alexandra A. <span className="font-light text-white/50 capitalize block mt-1">Italy</span></p>
          </motion.div>

          {/* Review Card 3 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={smoothReveal} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="text-terracotta flex gap-1 mb-6 text-xl">★★★★★</div>
              <p className="text-gray-600 font-light text-base md:text-lg italic mb-8">"A fantastic starting point. The family not only makes an effort but takes care of every concern. The standard is outstanding."</p>
            </div>
            <p className="font-bold text-sage tracking-wide uppercase text-sm">Volker K. <span className="font-light text-gray-400 capitalize block mt-1">Netherlands</span></p>
          </motion.div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="bg-warm py-20 md:py-32 border-t border-sage/10 text-center px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-sage mb-8 leading-[1.1]">
            Come stay <span className="italic font-light">with us,</span><br/>
            <span className="text-terracotta font-signature">at Brighton.</span>
          </h2>
          <Link to="/catalog" className="inline-block w-full sm:w-auto bg-sage text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-terracotta transition duration-300">
            Book your stay
          </Link>
        </motion.div>
      </section>

    </div>
  );

  return (
    <ReactLenis root>
      {content}
    </ReactLenis>
  );
}