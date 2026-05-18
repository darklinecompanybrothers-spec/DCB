import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useAudio } from '../context/SoundContext';
import MagneticButton from './MagneticButton';

/* ─────────────────────────────────────────────────────────────────────────────
   CONCEPT 09 — THE LIVING LOGO
   The logo mark (left of text) morphs based on which section is in view:
     studio  sections → animated EQ bars (purple)
     visuals sections → aperture iris with radiating blades (cyan)
     agency  sections → 3×3 dot grid with staggered pulse (lime)
     default           → original /dcb-logo1.png

   Section → mode mapping:
     'services', 'team', 'manifesto'         → 'studio'
     'showcase', 'portfolio', 'testimonials',
     'case-studies'                          → 'visuals'
     'pricing', 'contact'                    → 'agency'
     'hero', undefined, null                 → default (PNG)
───────────────────────────────────────────────────────────────────────────── */
const SECTION_MODE = {
  services:      'studio',
  team:          'studio',
  manifesto:     'studio',
  showcase:      'visuals',
  portfolio:     'visuals',
  testimonials:  'visuals',
  'case-studies':'visuals',
  pricing:       'agency',
  contact:       'agency',
};

/* EQ bars — studio */
const EQLogo = () => (
  <div
    style={{
      display: 'flex', alignItems: 'flex-end', gap: '3px',
      width: 32, height: 32, padding: '5px 2px 3px',
    }}
  >
    {[0.45, 0.85, 1, 0.65, 0.80].map((h, i) => (
      <motion.div
        key={i}
        style={{ flex: 1, borderRadius: '2px 2px 0 0', background: '#a855f7', transformOrigin: 'bottom' }}
        animate={{ scaleY: [h, h * 0.4 + 0.1, h * 1.15, h * 0.6, h] }}
        transition={{
          duration: 0.6 + i * 0.08, delay: i * 0.07,
          repeat: Infinity, ease: 'easeInOut',
        }}
        initial={false}
      />
    ))}
  </div>
);

/* Aperture iris — visuals */
const IrisLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <motion.circle
      cx="16" cy="16"
      animate={{ r: [5.5, 7, 5.5] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      stroke="#06b6d4" strokeWidth="1.5"
    />
    {[0, 1, 2, 3, 4, 5].map(i => {
      const angle  = (i * 60) * (Math.PI / 180);
      const x1 = 16 + 9  * Math.cos(angle);
      const y1 = 16 + 9  * Math.sin(angle);
      const x2 = 16 + 13 * Math.cos(angle);
      const y2 = 16 + 13 * Math.sin(angle);
      return (
        <motion.line
          key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.4, delay: i * 0.14, repeat: Infinity, ease: 'easeInOut' }}
        />
      );
    })}
  </svg>
);

/* Dot grid — agency */
const GridLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
    {[0, 1, 2].flatMap(row =>
      [0, 1, 2].map(col => {
        const x = 5  + col * 9;
        const y = 5  + row * 9;
        const idx = row * 3 + col;
        return (
          <motion.rect
            key={idx} x={x} y={y} width="4.5" height="4.5" rx="1.2"
            fill="#a3e635"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.5, delay: idx * 0.1,
              repeat: Infinity, ease: 'easeInOut',
            }}
          />
        );
      })
    )}
  </svg>
);

/* Shared motion props for logo mark swap */
const MARK_ANIM = {
  initial:    { opacity: 0, scale: 0.75, rotate: -6 },
  animate:    { opacity: 1, scale: 1,    rotate: 0  },
  exit:       { opacity: 0, scale: 0.75, rotate:  6 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};

/* ── Navigation ──────────────────────────────────────────────────────────── */
const Navigation = ({ onNavigate, currentPage, currentSection, lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const hamburgerRef = useRef(null);
  const drawerRef    = useRef(null);
  const {
    isMuted, toggleMute,
    playHover, playHover2, playClick2, playClickCard, playInterface,
    playSoundOn, playSoundOff,
  } = useAudio();
  const t = TRANSLATIONS[lang].nav;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  /* Focus trap + Escape key when mobile drawer is open */
  useEffect(() => {
    if (!mob) return;
    const firstFocusable = drawerRef.current?.querySelector(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMob(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusableEls = Array.from(
        drawerRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      if (!focusableEls.length) return;
      const first = focusableEls[0];
      const last  = focusableEls[focusableEls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    /* Close drawer when tapping/clicking outside it */
    const handleOutside = (e) => {
      if (
        drawerRef.current && !drawerRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setMob(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleOutside);
    };
  }, [mob]);

  const closeMob = () => { setMob(false); hamburgerRef.current?.focus(); };
  const nav      = (x) => { closeMob(); onNavigate(x); };
  const handleMuteToggle = () => { if (isMuted) playSoundOn(); else playSoundOff(); toggleMute(); };

  const NAV_LINKS = [
    ['services',  t.services],
    ['showcase',  t.showcase],
    ['pricing',   t.pricing],
    ['team',      t.team],
    ['about',     t.about],
    ['portfolio', t.portfolio],
  ];

  /* Living logo mode */
  const logoMode = SECTION_MODE[currentSection] || null;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled || currentPage === 'portfolio' || currentPage === 'about'
        ? 'bg-neutral-950/95 backdrop-blur-xl border-b border-white/[0.08] py-3'
        : 'bg-transparent py-4 md:py-6'
    }`}>
      <a href="#hero" className="skip-link">Skip to main content</a>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <div
          onClick={() => nav('home')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav('home'); } }}
          role="button"
          tabIndex={0}
          aria-label="DCB Authority Group — Retour à l'accueil"
          className="flex items-center gap-2 md:gap-3 cursor-pointer group z-50"
        >
          {/* Living mark — swaps between PNG and animated SVG per section */}
          <div className="h-8 md:h-12 flex items-center">
            <AnimatePresence mode="wait">
              {logoMode === 'studio' ? (
                <motion.div key="studio" {...MARK_ANIM}>
                  <EQLogo />
                </motion.div>
              ) : logoMode === 'visuals' ? (
                <motion.div key="visuals" {...MARK_ANIM}>
                  <IrisLogo />
                </motion.div>
              ) : logoMode === 'agency' ? (
                <motion.div key="agency" {...MARK_ANIM}>
                  <GridLogo />
                </motion.div>
              ) : (
                <motion.img
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src="/dcb-logo1.png"
                  alt="DCB Logo"
                  className="h-8 md:h-12 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col">
            <div className="text-sm md:text-xl font-black tracking-tighter text-white whitespace-nowrap">
              DCB <span className="text-purple-500">AUTHORITY</span> GROUP
            </div>
            <p className="hidden md:block text-[8px] font-bold tracking-[0.18em] uppercase leading-none mt-0.5 whitespace-nowrap">
              <span style={{ color: '#a855f7' }}>Studio</span>
              <span className="text-neutral-700"> · </span>
              <span style={{ color: '#06b6d4' }}>Visuals</span>
              <span className="text-neutral-700"> · </span>
              <span style={{ color: '#a3e635' }}>Agency</span>
            </p>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          ref={hamburgerRef}
          className={`md:hidden text-white p-2 z-50 rounded-lg transition-all duration-300 ${
            scrolled || currentPage === 'portfolio' || currentPage === 'about'
              ? ''
              : 'bg-neutral-900/60 backdrop-blur-sm'
          }`}
          onClick={() => { mob ? closeMob() : setMob(true); }}
          aria-label={mob ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mob}
          aria-controls="mobile-nav"
        >
          {mob ? <X /> : <Menu />}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6 z-50">
          {NAV_LINKS.map(([k, v]) => {
            const isActive = currentSection === k || (k === 'portfolio' && currentPage === 'portfolio') || (k === 'about' && currentPage === 'about');
            return (
              <MagneticButton key={k} strength={0.22}>
                <button
                  onMouseEnter={playHover2}
                  onClick={() => { playClick2(); nav(k); }}
                  className={`text-xs font-bold transition-colors uppercase tracking-widest relative
                    after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300
                    ${isActive
                      ? 'text-white after:w-full'
                      : 'text-neutral-400 hover:text-white after:w-0 hover:after:w-full'
                    }`}
                >
                  {v}
                  {isActive && <span className="absolute -top-1 -right-2 w-1 h-1 rounded-full bg-purple-400" />}
                </button>
              </MagneticButton>
            );
          })}

          {/* Language switcher */}
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-4 ml-1">
            {['en', 'fr', 'ar'].map(l => (
              <button
                key={l}
                onMouseEnter={playHover2}
                onClick={() => { playClick2(); setLang(l); }}
                className={`text-[10px] font-bold uppercase px-2 py-1 rounded transition-all ${
                  lang === l ? 'text-lime-400 bg-lime-400/10' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Sound toggle */}
          <button
            onMouseEnter={playHover}
            onClick={handleMuteToggle}
            className="p-2 rounded-md border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-300"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* CTA */}
          <button
            onClick={() => { playClickCard(); nav('contact'); }}
            onMouseEnter={playInterface}
            className="relative inline-flex items-center justify-center px-4 lg:px-6 py-2.5 text-[10px] lg:text-xs font-bold tracking-[0.2em] text-black uppercase bg-white overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] rounded-sm"
          >
            <span className="absolute inset-0 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] origin-bottom bg-lime-400 scale-y-0 group-hover:scale-y-100 z-0" />
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">{t.start}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!mob}
        className={`md:hidden absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-white/[0.06] z-40 transition-all duration-300 overflow-hidden ${
          mob ? 'max-h-[80dvh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-6 flex flex-col gap-3">
          {NAV_LINKS.map(([k, v]) => {
            const isActive = currentSection === k || (k === 'portfolio' && currentPage === 'portfolio') || (k === 'about' && currentPage === 'about');
            return (
              <button
                key={k}
                onMouseEnter={playHover2}
                onClick={() => { playClick2(); nav(k); setMob(false); }}
                className={`text-lg font-bold text-left py-2 border-b border-white/5 flex items-center justify-between ${
                  isActive ? 'text-white' : 'text-neutral-400'
                }`}
              >
                {v}
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
              </button>
            );
          })}
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-2">
              {['en', 'fr', 'ar'].map(l => (
                <button
                  key={l}
                  onClick={() => { playClick2(); setLang(l); }}
                  className={`text-sm font-bold uppercase rounded min-w-[44px] min-h-[44px] flex items-center justify-center ${lang === l ? 'bg-neutral-800 text-lime-400' : 'text-neutral-500'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button onClick={handleMuteToggle} className="p-2 rounded border border-white/10 text-neutral-400" aria-label="Toggle sound">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navigation);
