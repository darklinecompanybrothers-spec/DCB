import React, { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        scaleX,
        transformOrigin: '0%',
        background: 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #06b6d4 100%)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
});

ScrollProgressBar.displayName = 'ScrollProgressBar';
export default ScrollProgressBar;
