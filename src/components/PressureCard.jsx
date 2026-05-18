/**
 * PressureCard — Concept 12: PRESSURE SIGNATURE
 *
 * Wraps any content with:
 *  • Cursor-tracked 3D tilt (perspective + rotateX/Y spring physics)
 *  • Radial "hot-spot" light source that follows the cursor
 *
 * The card resists the cursor like a physical object — press in,
 * it tilts toward you and the light source illuminates the contact point.
 *
 * Usage:
 *   <PressureCard accentColor="#8b5cf6" accentRgb="139,92,246">
 *     <YourContent />
 *   </PressureCard>
 */
import { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

const PressureCard = ({
  children,
  accentColor = '#8b5cf6',
  accentRgb   = '139,92,246',
  maxTilt     = 7,          /* degrees of tilt max */
  className   = '',
  style       = {},
}) => {
  const cardRef = useRef(null);

  /* Spring-dampened tilt values */
  const rX = useSpring(0, { stiffness: 240, damping: 26, mass: 0.8 });
  const rY = useSpring(0, { stiffness: 240, damping: 26, mass: 0.8 });

  /* Cursor light position (0-100%) */
  const [light, setLight] = useState({ x: 50, y: 50, on: false });

  const onMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = (e.clientX - left) / width;   /* 0..1 */
    const cy = (e.clientY - top)  / height;  /* 0..1 */
    rX.set((cy - 0.5) * -maxTilt * 2);
    rY.set((cx - 0.5) *  maxTilt * 2);
    setLight({ x: cx * 100, y: cy * 100, on: true });
  }, [rX, rY, maxTilt]);

  const onLeave = useCallback(() => {
    rX.set(0);
    rY.set(0);
    setLight(l => ({ ...l, on: false }));
  }, [rX, rY]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: '900px', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{
          rotateX:  rX,
          rotateY:  rY,
          position: 'relative',
        }}
      >
        {/* Cursor-tracking radial hot-spot */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        20,
            pointerEvents: 'none',
            borderRadius:  'inherit',
            opacity:       light.on ? 1 : 0,
            transition:    'opacity 0.35s ease',
            background:    `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(${accentRgb},0.18) 0%, transparent 62%)`,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};

export default PressureCard;
