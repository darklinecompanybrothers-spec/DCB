import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — wraps any element and gives it a magnetic cursor attraction
 * with inner parallax: the outer wrapper (border/bg) moves by `strength` and
 * the inner content moves by an additional `strength * 0.55`, so the text
 * appears to "float forward" out of the button surface.
 * strength: 0.3–0.5 feels natural; >0.6 feels disorienting.
 */
const MagneticButton = ({ children, strength = 0.38, className = '' }) => {
  const ref = useRef(null);

  const rawX      = useMotionValue(0);
  const rawY      = useMotionValue(0);
  const rawInnerX = useMotionValue(0);
  const rawInnerY = useMotionValue(0);

  const x      = useSpring(rawX,      { stiffness: 220, damping: 18, mass: 0.6 });
  const y      = useSpring(rawY,      { stiffness: 220, damping: 18, mass: 0.6 });
  const innerX = useSpring(rawInnerX, { stiffness: 290, damping: 16, mass: 0.4 });
  const innerY = useSpring(rawInnerY, { stiffness: 290, damping: 16, mass: 0.4 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    rawX.set(dx * strength);
    rawY.set(dy * strength);
    rawInnerX.set(dx * strength * 0.55);
    rawInnerY.set(dy * strength * 0.55);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    rawInnerX.set(0);
    rawInnerY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-flex' }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ x: innerX, y: innerY, display: 'inline-flex' }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default MagneticButton;
