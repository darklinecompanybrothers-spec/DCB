import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Quote } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TRANSLATIONS from '../data/translations';
import { ALL_PARTNERS } from '../data/partners';
import { useAudio } from '../context/SoundContext';

const LIVE_PORTFOLIO_URL = '';

/**
 * FullPortfolio — Complete partner/client showcase page.
 *
 * Upgrades vs. previous version:
 *  • layoutId "portfolioFilter" spring animation on active tab indicator
 *  • AnimatePresence mode="popLayout" on card grid → smooth filter transitions
 *  • Stable key (p.client) instead of array index for correct exit animation
 *  • Animated count badge that cross-fades when filter changes
 *  • Motion-staggered header entrance
 */

/* ── 3D tilt partner card ──────────────────────────────────────────────────── */
const PartnerCard3D = ({ p }) => {
  const [isHover, setIsHover] = useState(false);
  const { playHoverPartner } = useAudio();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const beamColor =
    p.service === 'Visuals' || p.service === 'Visuels' || p.service === '\u0645\u0631\u0626\u064a\u0627\u062a'
      ? '#06b6d4'
      : '#8b5cf6';

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); setIsHover(false); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseEnter={() => { setIsHover(true); playHoverPartner(); }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className="relative group overflow-hidden p-[1px] rounded-2xl"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, ${beamColor} 100%)`,
          opacity: isHover ? 1 : 0.2,
          animationDuration: isHover ? '2.4s' : '4s',
        }}
      />

      <div className="relative h-full w-full bg-[#050508]/40 backdrop-blur-2xl rounded-2xl p-8 border border-white/[0.08] transition-colors duration-300 group-hover:border-white/20">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6" style={{ transform: 'translateZ(30px)' }}>
            {p.logo ? (
              <img
                loading="lazy"
                src={p.logo}
                alt={p.client}
                className="w-12 h-12 rounded-full object-cover border-2 border-neutral-800 group-hover:border-purple-500/50 transition-colors duration-500"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-black bg-gradient-to-br ${
                  p.service === 'Studio' || p.service === '\u0627\u0633\u062a\u0648\u062f\u064a\u0648'
                    ? 'from-purple-400 to-purple-600'
                    : p.service === 'Visuals' || p.service === 'Visuels' || p.service === '\u0645\u0631\u0626\u064a\u0627\u062a'
                    ? 'from-lime-400 to-lime-600'
                    : 'from-blue-400 to-blue-600'
                }`}
              >
                {p.client.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300">{p.client}</h3>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{p.type}</span>
            </div>
          </div>
          <div className="relative" style={{ transform: 'translateZ(20px)' }}>
            <Quote size={24} className="text-neutral-800 absolute -top-2 -left-2 opacity-50" />
            <p className="text-neutral-400 text-sm leading-relaxed pl-6 relative z-10 italic">
              "{p.description}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Filter key → normalised service value ─────────────────────────────────── */
const SERVICE_MAP = {
  Studio:  ['Studio', '\u0627\u0633\u062a\u0648\u062f\u064a\u0648'],
  Visuals: ['Visuals', 'Visuels', '\u0645\u0631\u0626\u064a\u0627\u062a'],
  Agency:  ['Agency',  'Agence',  '\u0648\u0643\u0627\u0644\u0629'],
};

/* ── Page ──────────────────────────────────────────────────────────────────── */
const FullPortfolio = ({ onNavigate, lang }) => {
  const [filter, setFilter] = useState('All');
  const t           = TRANSLATIONS[lang].portfolio;
  const allPartners = ALL_PARTNERS[lang];
  const { playBack, playClickStudioAgency, playHoverPartner, playInterface } = useAudio();

  const filteredPartners =
    filter === 'All'
      ? allPartners
      : allPartners.filter((p) => (SERVICE_MAP[filter] || []).includes(p.service));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* ── Header ── */}
        <div className="mb-14">
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => { playBack(); onNavigate('home', null, { history: 'back' }); }}
            className="flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors duration-300 group"
          >
            <ArrowLeft
              size={16}
              className={`transition-transform group-hover:-translate-x-1 ${lang === 'ar' ? 'rotate-180' : ''}`}
            />
            {t.back}
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-black text-white mb-5"
          >
            {t.pageTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-neutral-400 max-w-2xl"
          >
            {t.pageDesc}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="mt-6 h-[2px] w-24 bg-gradient-to-r from-purple-600 to-purple-600/0"
          />
        </div>

        {/* ── Filter tab switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-1.5 rounded-2xl flex flex-wrap gap-1">
            {['All', 'Studio', 'Visuals', 'Agency'].map((f) => (
              <button
                key={f}
                onClick={() => { playClickStudioAgency(); setFilter(f); }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${
                  filter === f ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {/* Spring-animated background — same pattern as PricingSection */}
                {filter === f && (
                  <motion.div
                    layoutId="portfolioFilter"
                    className="absolute inset-0 bg-purple-600/80 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  />
                )}
                <span className="relative z-10">
                  {t.filters[f.toLowerCase()]}
                </span>
              </button>
            ))}
          </div>

          {/* ── Animated result count ── */}
          <AnimatePresence mode="wait">
            <motion.span
              key={filteredPartners.length}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono text-purple-400/60 tabular-nums select-none"
            >
              {filteredPartners.length}&nbsp;{filteredPartners.length === 1 ? 'client' : 'clients'}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center md:justify-start"
        >
          <a
            href={LIVE_PORTFOLIO_URL}
            onMouseEnter={playHoverPartner}
            onClick={(e) => {
              playClickStudioAgency();
              if (!LIVE_PORTFOLIO_URL) e.preventDefault();
            }}
            className="group relative inline-flex max-w-full items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-full border border-lime-300/30 bg-lime-300 px-5 py-4 text-center text-[11px] sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.18em] text-black shadow-[0_0_35px_rgba(190,242,100,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-lime-200 hover:bg-white hover:shadow-[0_0_55px_rgba(190,242,100,0.34)] focus:outline-none focus:ring-2 focus:ring-lime-300/70 focus:ring-offset-2 focus:ring-offset-black sm:px-8"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">{t.livePortfolio}</span>
            <ExternalLink size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        {/* ── Card grid — AnimatePresence for smooth filter transitions ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((p) => (
              <motion.div
                key={p.client}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.88, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <PartnerCard3D p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA footer ── */}
        <div className="mt-24 text-center border-t border-white/[0.06] pt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold text-white mb-6"
          >
            {t.ctaTitle}
          </motion.h2>
          <button
            onMouseEnter={playInterface}
            onClick={() => { playClickStudioAgency(); onNavigate('contact'); }}
            className="relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-sm overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(163,230,53,0.3)]"
          >
            <span className="relative z-10">{t.ctaBtn}</span>
            <div className="absolute inset-0 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default FullPortfolio;
