// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// إعدادات حركة الظهور المتسلسل
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage text-white pt-24 pb-8 border-t border-sage-light/20 overflow-hidden" dir="ltr">
      <motion.div 
        className="max-w-7xl mx-auto px-8 md:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={footerVariants}
      >
        {/* الشبكة الرئيسية للفوتر */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* العمود الأول: الشعار والنبذة (يأخذ مساحة أكبر) */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <Link to="/" className="text-3xl font-serif font-bold text-white mb-6 inline-block">
              Brighton <span className="text-terracotta italic font-light">Work</span>Stays.
            </Link ><motion.p/>
            <p className="text-sage-light text-lg font-light leading-relaxed max-w-sm mb-8">
              The premier directory for corporate travel, remote working, and seamless extended residencies on the Sussex coast.
            </p>
            <div className="flex gap-4">
              {/* أيقونات تواصل اجتماعي وهمية بتصميم بسيط */}
              {['LinkedIn', 'Twitter', 'Instagram'].map((social, idx) => (
                <a key={idx} href="#" className="text-sm font-medium uppercase tracking-widest text-white hover:text-terracotta transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          {/* العمود الثاني: الروابط السريعة */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:col-start-7">
            <h4 className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-6">Directory</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/catalog" className="text-sage-light hover:text-white transition-colors">All Properties</Link></li>
              <li><Link to="/catalog" className="text-sage-light hover:text-white transition-colors">Executive Hotels</Link></li>
              <li><Link to="/catalog" className="text-sage-light hover:text-white transition-colors">Serviced Apartments</Link></li>
              <li><a href="#" className="text-sage-light hover:text-white transition-colors">Coworking Spaces</a></li>
            </ul>
          </motion.div>

          {/* العمود الثالث: خدمات الشركات */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-6">Corporate</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#contact" className="text-sage-light hover:text-white transition-colors">Group Bookings</a></li>
              <li><a href="#contact" className="text-sage-light hover:text-white transition-colors">Extended Stays</a></li>
              <li><a href="#" className="text-sage-light hover:text-white transition-colors">Company Retreats</a></li>
              <li><a href="#" className="text-sage-light hover:text-white transition-colors">Concierge Desk</a></li>
            </ul>
          </motion.div>

          {/* العمود الرابع: معلومات التواصل */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-6">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="text-sage-light">Brighton & Hove,<br/>East Sussex, UK</li>
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
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}