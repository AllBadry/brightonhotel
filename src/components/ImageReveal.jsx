import { motion } from 'framer-motion';

export default function ImageReveal({ src, alt = '', className = '', imgClassName = '' }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
        className={imgClassName}
      />
    </motion.div>
  );
}