import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CountUp({ value = 0, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const smooth = useSpring(mv, { stiffness: 60, damping: 28, mass: 0.8 });
  const displayed = useTransform(smooth, (v) => {
    const val = decimals > 0 ? v.toFixed(decimals) : Math.round(v);
    return `${prefix}${val}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      mv.set(value);
    }
  }, [inView, value, mv]);

  return (
    <motion.span ref={ref} style={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}>
      <motion.span>{displayed}</motion.span>
    </motion.span>
  );
}