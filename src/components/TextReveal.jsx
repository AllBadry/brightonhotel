import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const Word = ({ progress, range, children }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <span className="inline-block align-top">
      <motion.span style={{ opacity, y }} className="inline-block">{children}</motion.span>
      <span>&nbsp;</span>
    </span>
  );
};

export default function TextReveal({ text, className = '', as: Tag = 'p' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45']
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={smoothProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </Tag>
  );
}