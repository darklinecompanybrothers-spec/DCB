import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = ['hero', 'services', 'showcase', 'pricing', 'portfolio', 'contact'];
const TOTAL = SECTIONS.length;

const SectionCounter = ({ currentSection }) => {
  const idx = SECTIONS.indexOf(currentSection);
  const num = idx === -1 ? 1 : idx + 1;

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 pointer-events-none select-none">

      {/* Current number */}
      <AnimatePresence mode="wait">
        <motion.span
          key={num}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono font-bold tabular-nums"
          style={{ fontSize: 10, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.55)' }}
        >
          {String(num).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      {/* Vertical progress track */}
      <div className="relative w-px bg-white/[0.08] overflow-hidden" style={{ height: 56 }}>
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #8b5cf6, #06b6d4)',
            originY: 0,
          }}
          animate={{ height: `${(num / TOTAL) * 100}%` }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Total */}
      <span
        className="font-mono font-bold tabular-nums"
        style={{ fontSize: 9, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.18)' }}
      >
        {String(TOTAL).padStart(2, '0')}
      </span>

    </div>
  );
};

export default SectionCounter;
