import React from 'react';
import { motion } from 'framer-motion';

/* Intensity per section — cinematic vignette strength */
const VIGNETTE_OPACITY = {
  hero:      0.75,
  services:  0.52,
  showcase:  0.48,
  pricing:   0.55,
  portfolio: 0.60,
  contact:   0.52,
};

const VignetteOverlay = ({ currentSection }) => {
  const opacity = VIGNETTE_OPACITY[currentSection] ?? 0.52;

  return (
    <>
      {/* Cinematic vignette — darkens edges, keeps center sharp */}
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background:
            'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 22%, rgba(2, 2, 10, 1) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Colour grade — subtle cool-dark matte film look */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'rgba(4, 2, 14, 0.09)',
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default VignetteOverlay;
