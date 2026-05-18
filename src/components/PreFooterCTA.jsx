import React from 'react';
import { motion } from 'framer-motion';
import TRANSLATIONS from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';
import MagneticButton from './MagneticButton';
import { useAudio } from '../context/SoundContext';

const PreFooterCTA = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang].prefooterCta;
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const isRtl = lang === 'ar';
  const { playHover, playSelectPlan } = useAudio();

  return (
    <section
      className="relative py-28 md:py-48 overflow-hidden"
      style={{ background: '#030307' }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% 50%, rgba(139,92,246,0.13) 0%, transparent 70%)',
        }}
      />
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 md:px-6 text-center">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-12 md:mb-16"
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-purple-400/40" />
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.35em]">
            {t.overline}
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-purple-400/40" />
        </motion.div>

        {/* Title line 1 */}
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <motion.h2
            initial={{ y: '110%' }}
            animate={isVisible ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter"
          >
            {t.title}
          </motion.h2>
        </div>

        {/* Title line 2 — Editorial New italic gradient */}
        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
          <motion.span
            initial={{ y: '110%' }}
            animate={isVisible ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="block text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-display italic font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-lime-400 mb-14 md:mb-20"
          >
            {t.subtitle}
          </motion.span>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton strength={0.42}>
            <button
              onMouseEnter={playHover}
              onClick={() => { playSelectPlan(); onNavigate('contact'); }}
              data-cursor="cta"
              className="group relative px-12 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest text-white overflow-hidden transition-all duration-500 hover:shadow-[0_0_70px_rgba(139,92,246,0.45)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <span className="relative z-10">{t.cta}</span>
            </button>
          </MagneticButton>
        </motion.div>

      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  );
};

export default PreFooterCTA;
