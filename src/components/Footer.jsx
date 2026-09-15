// src/components/Footer.jsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <footer ref={ref} className="relative bg-sage text-white pt-24 pb-8 border-t border-sage-light/20 overflow-hidden" dir="ltr">
      {/* كلمة رمزية خلفية تتحرك مع السكرول */}
      <motion.span
        style={{ y: ghostY }}
        aria-hidden="true"
        className="absolute -bottom-24 md:-bottom-32 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap text-[18vw] md:text-[16vw] leading-none font-serif font-bold text-white/[0.04] tracking-tighter"
      >
        Brighton
      </motion.span>

      <motion.div
        className="max-w-7xl mx-auto px-8 md:px-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={footerVariants}
      >
        {/* خط فاصل ذهبي يظهر بحركة */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left h-px bg-gradient-to-r from-terracotta via-gold to-transparent mb-16"
        />

        {/* الشبكة الرئيسية للفوتر */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-20">

          {/* العمود الأول: الشعار والنبذة */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <Link to="/" className="text-3xl font-serif font-bold text-white mb-6 inline-block group">
              Brighton <span className="text-terracotta italic font-light group-hover:text-gold transition-colors">Work</span>Stays.
            </Link>
            <p className="text-sage-light text-lg font-light leading-relaxed max-w-sm mb-8">
              The premier directory for corporate travel, remote working, and seamless extended residencies on the Sussex coast.
            </p>
          </motion.div>

          {/* العمود الثاني: الروابط السريعة */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-6">Directory</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/catalog" className="text-sage-light hover:text-white transition-colors">All Properties</Link></li>
              <li><Link to="/catalog" className="text-sage-light hover:text-white transition-colors">Executive Hotels</Link></li>
              <li><Link to="/catalog" className="text-sage-light hover:text-white transition-colors">Serviced Apartments</Link></li>
              <li><Link to="/catalog" className="text-sage-light hover:text-white transition-colors">Coworking Spaces</Link></li>
            </ul>
          </motion.div>

          {/* العمود الثالث: الشركة */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/about" className="text-sage-light hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/journal" className="text-sage-light hover:text-white transition-colors">Journal</Link></li>
              <li><Link to="/faq" className="text-sage-light hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sage-light hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </motion.div>

          {/* العمود الرابع: خدمات الشركات */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-6">Corporate</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/contact" className="text-sage-light hover:text-white transition-colors">Group Bookings</Link></li>
              <li><Link to="/contact" className="text-sage-light hover:text-white transition-colors">Extended Stays</Link></li>
              <li><Link to="/contact" className="text-sage-light hover:text-white transition-colors">Company Retreats</Link></li>
              <li><Link to="/contact" className="text-sage-light hover:text-white transition-colors">Concierge Desk</Link></li>
            </ul>
          </motion.div>

          {/* العمود الخامس: معلومات التواصل */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-6">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="text-sage-light">Brighton & Hove,<br />East Sussex, UK</li>
              <li><a href="mailto:contact@brightonhotel.co.uk" className="text-white font-medium hover:text-terracotta transition-colors">contact@brightonhotel.co.uk</a></li>
              <li><a href="tel:+441273000000" className="text-sage-light hover:text-white transition-colors">+44 (0) 1273 000 000</a></li>
            </ul>
          </motion.div>

        </div>

        {/* الشريط السفلي: حقوق النشر والروابط القانونية */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wide text-sage-light"
        >
          <p>&copy; {currentYear} Brighton WorkStays. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}