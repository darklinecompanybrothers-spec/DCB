import { motion } from 'framer-motion';

/**
 * SectionLoader — Branded shimmer skeleton shown while lazy sections load.
 *
 * Uses Framer Motion opacity pulse so the brand purple glow pulses in sync
 * with the rest of the site's animation language (no extra CSS needed).
 * Matches the rough 3-card layout shared by Services, Pricing, Partners, etc.
 */

/* Single animated bone block */
const Bone = ({ className = '', delay = 0, height = 'h-4', width = 'w-full' }) => (
  <motion.div
    className={`rounded-xl ${height} ${width} ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(138,43,226,0.06) 0%, rgba(255,255,255,0.04) 50%, rgba(138,43,226,0.06) 100%)',
      backgroundSize: '200% 200%',
    }}
    animate={{
      opacity: [0.35, 0.65, 0.35],
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    }}
    transition={{
      duration: 2.0,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const SectionLoader = () => (
  <div
    className="min-h-screen w-full py-20 md:py-32 overflow-hidden"
    aria-hidden="true"
    aria-label="Loading section…"
  >
    <div className="max-w-7xl mx-auto px-4 md:px-6">

      {/* ── Header skeleton ── */}
      <div className="mb-16 space-y-4">
        <Bone height="h-2"        width="w-16"  delay={0.00} />
        <Bone height="h-10 md:h-14" width="w-1/2" delay={0.08} />
        <Bone height="h-4"        width="w-2/5" delay={0.16} />
        <Bone height="h-3"        width="w-1/3" delay={0.22} />
      </div>

      {/* ── Card grid skeleton — mirrors 3-column layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <motion.div
              className="rounded-2xl border border-white/[0.04] w-full h-64"
              style={{
                background: 'linear-gradient(135deg, rgba(138,43,226,0.05) 0%, rgba(6,182,212,0.03) 50%, rgba(138,43,226,0.05) 100%)',
                backgroundSize: '300% 300%',
              }}
              animate={{
                opacity: [0.3, 0.55, 0.3],
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 2.2,
                delay: 0.3 + i * 0.14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <Bone height="h-3" width="w-3/4" delay={0.42 + i * 0.14} />
            <Bone height="h-3" width="w-1/2" delay={0.52 + i * 0.14} />
          </div>
        ))}
      </div>

      {/* ── Optional tab-switcher skeleton (matches Pricing/Portfolio) ── */}
      <div className="flex justify-center mt-14">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <Bone key={i} height="h-9" width="w-24" delay={0.6 + i * 0.08} className="rounded-full" />
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default SectionLoader;
