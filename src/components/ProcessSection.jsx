import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

/* Step accent colors cycling through brand palette */
const STEP_ACCENTS = [
  { color: '#a855f7', rgb: '168,85,247'  }, /* purple  */
  { color: '#06b6d4', rgb: '6,182,212'   }, /* cyan    */
  { color: '#a3e635', rgb: '163,230,53'  }, /* lime    */
  { color: '#f472b6', rgb: '244,114,182' }, /* pink    */
  { color: '#fb923c', rgb: '251,146,60'  }, /* orange  */
];

/* ── ProcessSection ───────────────────────────────────────────────────────── */
const ProcessSection = ({ lang }) => {
  const t = TRANSLATIONS[lang].process;
  const isRtl = lang === 'ar';
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { containerRef, getItemStyle } = useStaggerReveal(t.steps.length, 150);

  return (
    <section
      id="process"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: '#06060b' }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full blur-[250px] pointer-events-none" style={{ background: 'rgba(139,92,246,0.04)' }} />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[250px] pointer-events-none" style={{ background: 'rgba(6,182,212,0.03)' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="text-center mb-16 md:mb-24 transition-all duration-700"
          style={{
            opacity:   headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] rounded-full px-5 py-2 mb-6 backdrop-blur-md">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{t.overline}</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {t.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-lime-400">
              {t.titleOutline}
            </span>
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed mt-4">{t.subtitle}</p>
          <div className="mt-8 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>

        {/* ── Timeline connector (desktop) ── */}
        <div className="hidden lg:block relative mb-0">
          {/* Horizontal track */}
          <div
            className="absolute top-[28px] h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25) 15%, rgba(163,230,53,0.25) 85%, transparent)' }}
          />
        </div>

        {/* ── Steps ── */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-4"
        >
          {t.steps.map((step, i) => {
            const accent = STEP_ACCENTS[i];
            return (
              <motion.div
                key={step.number}
                style={getItemStyle(i)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="group relative flex flex-col"
              >
                {/* Number circle */}
                <div className="flex lg:flex-col items-start lg:items-start gap-4 lg:gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-black text-lg tabular-nums transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `rgba(${accent.rgb}, 0.10)`,
                      border:     `1px solid rgba(${accent.rgb}, 0.30)`,
                      color:       accent.color,
                      boxShadow:  `0 0 0 0 rgba(${accent.rgb},0)`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 22px rgba(${accent.rgb},0.35)`; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 0 0 rgba(${accent.rgb},0)`; }}
                  >
                    {step.number}
                  </div>

                  {/* Arrow connector (desktop) — between steps */}
                  {i < t.steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-[28px] w-full h-px pointer-events-none"
                      style={{
                        left:       isRtl ? 'auto' : '50%',
                        right:      isRtl ? '50%'  : 'auto',
                        background: `linear-gradient(${isRtl ? '270deg' : '90deg'}, rgba(${accent.rgb},0.45), transparent)`,
                        width: '100%',
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className="flex-1 p-5 rounded-2xl border transition-all duration-300"
                  style={{
                    background:   `rgba(${accent.rgb},0.03)`,
                    borderColor:  `rgba(${accent.rgb},0.12)`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${accent.rgb},0.30)`; e.currentTarget.style.background = `rgba(${accent.rgb},0.07)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `rgba(${accent.rgb},0.12)`; e.currentTarget.style.background = `rgba(${accent.rgb},0.03)`; }}
                >
                  {/* Name + tagline */}
                  <h3 className="text-base font-black text-white tracking-tight mb-1">{step.name}</h3>
                  <p className="text-xs font-medium italic mb-3" style={{ color: accent.color }}>{step.tagline}</p>

                  {/* Description */}
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4 group-hover:text-neutral-400 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Duration */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
                    style={{
                      background: `rgba(${accent.rgb},0.08)`,
                      border:     `1px solid rgba(${accent.rgb},0.18)`,
                      color:       accent.color,
                    }}
                  >
                    <Clock size={9} />
                    {step.duration}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full text-neutral-500 font-medium"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  );
};

export default ProcessSection;
