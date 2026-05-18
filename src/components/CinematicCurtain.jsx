import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CinematicCurtain — Full-screen branded overlay that fires on page navigation.
 *
 * Sequence:
 *  0.00s → 0.28s  : panel slides in from top    (y: -100% → 0%)
 *  0.28s → 0.55s  : hold (page swap happens behind it)
 *  0.55s → 0.90s  : panel slides out toward bottom (y: 0% → 100%)
 *
 * Uses pure translateY (no scaleY + transformOrigin) → iOS Safari safe.
 * Usage: mount always, pass `isActive` prop. Unmounts automatically via AnimatePresence.
 */
const CinematicCurtain = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      /* Transparent container — just clips the sliding panel */
      <div
        key="curtain"
        aria-hidden="true"
        className="fixed inset-0 z-[10001] pointer-events-none overflow-hidden"
      >
        {/* Sliding panel — translateY only, compositor-safe on all browsers */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: '-100%' }}
          animate={{ y: ['-100%', '0%', '0%', '100%'] }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          transition={{
            duration: 0.9,
            times: [0, 0.31, 0.6, 1],
            ease: ['easeInOut', 'linear', 'easeInOut', 'easeInOut'],
          }}
          style={{
            background:
              'linear-gradient(135deg, #030307 0%, #0d0218 40%, #030b0f 70%, #030307 100%)',
          }}
        >
          {/* Brand watermark */}
          <motion.div
            animate={{ opacity: [0, 0.18, 0.18, 0] }}
            transition={{ duration: 0.9, times: [0, 0.31, 0.6, 1] }}
            className="select-none font-black tracking-[0.4em] uppercase text-white text-2xl md:text-4xl"
          >
            DCB
          </motion.div>

          {/* Brand gradient line at the seam */}
          <div
            className="absolute inset-x-0 bottom-0 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, #8b5cf6 30%, #06b6d4 60%, #a3e635 85%, transparent)',
            }}
          />
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default CinematicCurtain;
