import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* Static stats — mirrors the data in StatsSection / translations */
const STATS = [
  { value: '150+', label: 'Projects Delivered' },
  { value:  '50+', label: 'Clients Worldwide'  },
  { value:  '10+', label: 'Countries Reached'  },
  { value:   '3+', label: 'Years of Excellence'},
];

const SocialProofBar = () => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); ob.disconnect(); } },
      { threshold: 0.5 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-white/[0.05]"
      style={{ background: 'rgba(5,5,8,0.90)' }}
      aria-label="Key statistics"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {STATS.map(({ value, label }, i) => (
            <React.Fragment key={label}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={seen ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-2"
              >
                <span
                  className="font-black tabular-nums leading-none"
                  style={{
                    fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
                    background: 'linear-gradient(135deg, #e2e8f0 0%, rgba(226,232,240,0.65) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mt-1">
                  {label}
                </span>
              </motion.div>

              {/* Vertical divider — between items on md+ */}
              {i < STATS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block self-stretch w-px"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;
