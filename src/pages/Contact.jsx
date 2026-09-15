// src/pages/Contact.jsx
import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const ease = [0.16, 1, 0.3, 1];

// --- مكون الزر المغناطيسي (المستخدم يغوص فيه) ---
const MagneticButton = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 22, stiffness: 260 });
  const smoothY = useSpring(mouseY, { damping: 22, stiffness: 260 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleFormMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleFormMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <ReactLenis root>
      <div dir="ltr" className="min-h-screen bg-sage text-white relative overflow-hidden font-sans">

        {/* خلفية غامضة تتفاعل ببطء لتزيد الانغماس */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none mix-blend-overlay">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-terracotta rounded-full blur-[130px] animate-drift" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-gold rounded-full blur-[110px] animate-drift [animation-delay:-7s]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-24 min-h-screen flex flex-col md:flex-row items-center gap-16">

          {/* القسم الأيسر: النصوص الجذابة والمعلومات */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease }}
            className="w-full md:w-1/2"
          >
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="text-terracotta uppercase tracking-[0.3em] text-sm font-bold mb-6"
            >
              Get in touch
            </motion.p>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[1.1] tracking-tight overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.35, ease }}
                className="inline-block"
              >
                Let's craft your <span className="italic font-light text-gold">perfect stay.</span>
              </motion.span>
            </h1>
            <p className="text-xl text-white/70 font-light leading-relaxed mb-12 max-w-md">
              Whether it's a corporate retreat or a long-term executive residency in Brighton, our dedicated concierge team is ready to orchestrate every detail.
            </p>

            <div className="space-y-6 text-white/80 font-medium tracking-wide">
              <motion.div whileHover={{ x: 12 }} className="flex items-center gap-4 transition-transform cursor-pointer">
                <div className="w-12 h-[1px] bg-terracotta"></div>
                <a href="mailto:corporate@brightonstays.com" className="hover:text-white transition-colors">corporate@brightonstays.com</a>
              </motion.div>
              <motion.div whileHover={{ x: 12 }} className="flex items-center gap-4 transition-transform cursor-pointer">
                <div className="w-12 h-[1px] bg-terracotta"></div>
                <a href="tel:+441273000000" className="hover:text-white transition-colors">+44 (0) 1273 000 000</a>
              </motion.div>
              <motion.div whileHover={{ x: 12 }} className="flex items-center gap-4 transition-transform cursor-default">
                <div className="w-12 h-[1px] bg-terracotta"></div>
                <p>14 Executive Square, Brighton, UK</p>
              </motion.div>
            </div>
          </motion.div>

          {/* القسم الأيمن: النموذج التفاعلي (3D Card) */}
          <div className="w-full md:w-1/2 perspective-deep">
            <motion.div
              onMouseMove={handleFormMouseMove}
              onMouseLeave={handleFormMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease }}
              className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-12 rounded-[2.5rem] shadow-2xl"
            >
              {/* لمعان داخلي يتفاعل مع الماوس */}
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none border border-white/20"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 70%)",
                  x: useTransform(smoothX, [-0.5, 0.5], [-25, 25]),
                  y: useTransform(smoothY, [-0.5, 0.5], [-25, 25]),
                }}
              />

              <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col gap-8 relative z-10"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-2 group">
                        <label className="text-xs uppercase tracking-widest text-white/50 pl-2">Full Name</label>
                        <input type="text" required className="w-full bg-white/5 border-b border-white/20 px-4 py-4 text-white focus:outline-none focus:border-terracotta focus:bg-white/10 transition-all rounded-t-lg placeholder-white/30" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-xs uppercase tracking-widest text-white/50 pl-2">Company Email</label>
                        <input type="email" required className="w-full bg-white/5 border-b border-white/20 px-4 py-4 text-white focus:outline-none focus:border-terracotta focus:bg-white/10 transition-all rounded-t-lg placeholder-white/30" placeholder="john@company.com" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-xs uppercase tracking-widest text-white/50 pl-2">Your Requirements</label>
                        <textarea required rows="3" className="w-full bg-white/5 border-b border-white/20 px-4 py-4 text-white focus:outline-none focus:border-terracotta focus:bg-white/10 transition-all rounded-t-lg resize-none placeholder-white/30" placeholder="Dates, team size, specific needs..."></textarea>
                      </div>

                      <MagneticButton className="w-full bg-terracotta text-white font-bold tracking-widest uppercase py-5 rounded-2xl shadow-[0_0_40px_rgba(226,114,91,0.3)] hover:shadow-[0_0_60px_rgba(226,114,91,0.5)] transition-shadow">
                        Send Request
                      </MagneticButton>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-[400px] flex flex-col items-center justify-center text-center relative z-10"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-full bg-terracotta flex items-center justify-center mb-6"
                      >
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-3xl font-serif font-bold mb-2">Request Received</h3>
                      <p className="text-white/70 font-light">Our concierge will contact you within 2 hours.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </ReactLenis>
  );
}