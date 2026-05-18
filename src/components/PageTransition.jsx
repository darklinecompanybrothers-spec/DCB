import { motion } from 'framer-motion';

/**
 * PageTransition — Cinematic enter/exit for home ↔ portfolio navigation.
 *
 * Enter: content blurs and rises into view (0.75s, custom ease-out-quint)
 * Exit:  content scales down and blurs out quickly (0.45s, ease-in)
 * Bar:   brand-gradient line sweeps from left on enter (depth cue)
 */

const variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.985,
    filter: 'blur(20px)',
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      filter: { duration: 0.55 },
    },
  },
  out: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(14px)',
    transition: {
      duration: 0.38,
      ease: [0.7, 0, 1, 1],
    },
  },
};

const PageTransition = ({ children }) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="in"
    exit="out"
  >
    {/* Brand progress line — sweeps left → right as the page enters */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #8b5cf6 0%, #06b6d4 55%, #a3e635 100%)',
        transformOrigin: '0% 50%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />

    {children}
  </motion.div>
);

export default PageTransition;
