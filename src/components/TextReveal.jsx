import { motion } from 'framer-motion';

/**
 * TextReveal — Awwwards-style per-line clip reveal.
 *
 * Each child slides up from `y:'110%'` to `y:'0%'` inside an
 * `overflow:hidden` wrapper, creating the signature "text punching
 * through the floor" entrance used on award-winning sites.
 *
 * Usage — wrap each headline line independently for staggered entrance:
 *
 *   <h1>
 *     <TextReveal delay={0}>First line</TextReveal>
 *     <TextReveal delay={0.15}>Second line</TextReveal>
 *   </h1>
 *
 * Props:
 *  children  — any React node (text, spans, gradients…)
 *  delay     — stagger offset in seconds (default 0)
 *  duration  — animation duration in seconds (default 0.85)
 *  className — extra classes applied to the overflow wrapper
 */
const TextReveal = ({ children, delay = 0, duration = 0.85, className = '' }) => (
  <div
    style={{ overflow: 'hidden', paddingBottom: '0.08em' }}
    className={className}
  >
    <motion.div
      initial={{ y: '110%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

export default TextReveal;
