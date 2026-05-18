import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BusinessCard3D from './BusinessCard3D';
import { useAudio } from '../context/SoundContext';
import TRANSLATIONS from '../data/translations';

/* ─────────────────────────────────────────────────────────────────────────────
   FILM GRAIN CLOCK — Concept 03
   15 film-strip frame cells replace the 2px progress bar.
   Each cell: sprocket holes, countdown number, fills bottom-up like liquid.
   On completion: white "burn" flash like celluloid under a projector lens.
───────────────────────────────────────────────────────────────────────────── */
const TOTAL_SECS = 5;

const FilmGrainClock = () => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setElapsed(Math.min(TOTAL_SECS, (Date.now() - start) / 1000));
    }, 80);
    return () => clearInterval(id);
  }, []);

  const completedCells = Math.floor(elapsed);
  const partial = elapsed - completedCells; // 0→1 progress of the current cell

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '12px',
        pointerEvents: 'none',
        gap: '3px',
      }}
    >
      {Array.from({ length: TOTAL_SECS }, (_, i) => {
        const isDone    = i < completedCells;
        const isCurrent = i === completedCells;
        const label     = TOTAL_SECS - i;

        return (
          <div
            key={i}
            style={{
              position: 'relative',
              width: 18,
              height: 30,
              background: '#070710',
              border: `1px solid ${isCurrent ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: isCurrent ? '0 0 8px rgba(168,85,247,0.25)' : 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            {/* Top sprocket hole */}
            <div style={{ position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)', width: 5, height: 4, borderRadius: '1px', background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.05)' }} />
            {/* Bottom sprocket hole */}
            <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 5, height: 4, borderRadius: '1px', background: '#0d0d1e', border: '1px solid rgba(255,255,255,0.05)' }} />

            {/* Fill — rises from bottom */}
            {(isDone || isCurrent) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: isDone ? '100%' : `${partial * 100}%`,
                  background: isDone
                    ? 'rgba(168,85,247,0.12)'
                    : 'linear-gradient(to top, rgba(168,85,247,0.55), rgba(6,182,212,0.35))',
                  transition: 'height 0.08s linear',
                }}
              />
            )}

            {/* Countdown number */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace',
                fontSize: '7px',
                fontWeight: 900,
                zIndex: 2,
                color: isDone
                  ? 'rgba(255,255,255,0.06)'
                  : isCurrent
                  ? 'rgba(192,132,252,0.95)'
                  : 'rgba(255,255,255,0.16)',
              }}
            >
              {label}
            </div>

            {/* Burn flash — fires for 400ms just after cell completes */}
            <AnimatePresence>
              {i === completedCells - 1 && (
                <motion.div
                  key={`burn-${i}`}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 0.38, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(255,255,255,0.88)',
                    mixBlendMode: 'screen',
                    zIndex: 3,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   INTRO SCREEN
───────────────────────────────────────────────────────────────────────────── */
const IntroScreen = ({ onEnter, lang = 'fr', setLang }) => {
  const [exiting, setExiting] = useState(false);
  const { playStartup, playHover2, playClick2 } = useAudio();
  const t = TRANSLATIONS[lang].intro;

  /* ── Typewriter effect on overline ── */
  const [typed,    setTyped]    = useState('');
  const [cursorOn, setCursorOn] = useState(true);

  /* Reset typewriter whenever the language changes */
  useEffect(() => {
    setTyped('');
    setCursorOn(true);
  }, [lang]);

  /* Advance typewriter one character at a time */
  useEffect(() => {
    if (typed.length >= t.overline.length) {
      const timer = setTimeout(() => setCursorOn(false), 1600);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setTyped(t.overline.slice(0, typed.length + 1)),
      40,
    );
    return () => clearTimeout(timer);
  }, [typed, t.overline]);

  const handleEnter = useCallback(() => {
    if (exiting) return;
    playStartup();
    setExiting(true);
    setTimeout(onEnter, 1000);
  }, [exiting, onEnter, playStartup]);

  /* ── Auto-enter after 5 s ── */
  const handleEnterRef = useRef(handleEnter);
  handleEnterRef.current = handleEnter;
  useEffect(() => {
    const t = setTimeout(() => handleEnterRef.current(), 5000);
    return () => clearTimeout(t);
  }, []);

  /* ── Skip button — visible at t=1s ── */
  const [showSkip, setShowSkip] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#050508', overflowX: 'hidden', overflowY: 'auto' }}
    >
      {/* Ambient orb */}
      <motion.div
        style={{
          position: 'absolute', width: 700, height: 700,
          top: '50%', left: '50%', x: '-50%', y: '-50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138,43,226,0.14) 0%, transparent 65%)',
          filter: 'blur(90px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(138,43,226,0.5) 30%, rgba(0,212,255,0.4) 70%, transparent 100%)',
      }} />

      {/* Language switcher — top right */}
      {setLang && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute top-10 md:top-14 right-4 md:right-8 z-30 flex items-center gap-1"
        >
          {['en', 'fr', 'ar'].map(l => (
            <button
              key={l}
              onMouseEnter={playHover2}
              onClick={() => { playClick2(); setLang(l); }}
              className={`text-[10px] font-bold uppercase px-2.5 py-1.5 rounded transition-all duration-200 ${
                lang === l
                  ? 'text-lime-400 bg-lime-400/10 border border-lime-400/20'
                  : 'text-neutral-500 hover:text-white border border-transparent hover:border-white/10'
              }`}
            >
              {l}
            </button>
          ))}
        </motion.div>
      )}

      {/* Logo — top centered */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-10 md:top-14 left-0 w-full z-20 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 px-4"
      >
        <img
          src="/dcb-logo1.png"
          alt="DCB Logo"
          className="h-12 sm:h-16 md:h-24 w-auto object-contain transition-all duration-700 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] logo-electric"
        />
        <div className="text-base sm:text-2xl md:text-4xl font-black tracking-tighter text-white text-center logo-electric">
          DCB <span className="text-purple-500">AUTHORITY</span> GROUP
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-12 xl:px-20 pt-28 pb-28 lg:pb-20">

        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={exiting ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col justify-center w-full lg:w-1/2 z-20 pl-4 lg:pl-16 xl:pl-24"
        >
          {/* Overline — typewriter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-cyan-400" />
            <p className="text-cyan-400 text-xs md:text-sm tracking-[0.4em] uppercase font-semibold font-mono">
              {typed}
              {cursorOn && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: 'steps(1)' }}
                  className="inline-block ml-[2px] w-[1.5px] h-[0.85em] bg-cyan-400 align-middle"
                />
              )}
            </p>
          </div>

          <h1 className="display-title text-white mb-6 max-w-[14ch]" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
            {t.title1}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
              {t.title2}
            </span>
          </h1>

          <p className="text-neutral-300/90 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mb-10">
            {t.desc}
          </p>

          <motion.button
            onClick={handleEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden w-fit px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group"
          >
            <span className="relative z-10 text-white text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-cyan-400 transition-colors duration-300">
              {t.cta}
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
          </motion.button>
        </motion.div>

        {/* Right — 3D Business Card (hidden on xs/sm to keep intro one-screen) */}
        <div className="hidden sm:flex relative z-10 w-full lg:w-1/2 justify-center">
          <div className="relative w-full min-h-[50vh] lg:min-h-[80vh] flex flex-col items-center justify-center pt-6 pb-6 sm:pt-12 sm:pb-12 lg:pt-20 lg:pb-20 overflow-hidden">
            <motion.img
              src="/two-hands.png"
              alt="Mains tenant la carte DCB"
              className="w-full h-auto block object-cover pointer-events-none select-none drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            />
            <div className="absolute inset-0 z-20 flex justify-center items-center">
              <motion.div
                className="w-[85%] sm:w-[75%] md:w-[60%] lg:w-[48%] max-w-[520px] pt-2 sm:pt-8 md:pt-16 lg:pt-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full p-[1px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,112,184,0.2)]">
                  <div
                    className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
                    style={{ background: 'conic-gradient(from 90deg at 50% 50%, #00000000 50%, #8b5cf6 100%)' }}
                  />
                  <div className="relative bg-[#050508]/60 backdrop-blur-xl rounded-3xl p-2 md:p-4 border border-white/[0.1]">
                    <BusinessCard3D onEnter={handleEnter} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Film Grain Clock — Concept 03 */}
      {!exiting && <FilmGrainClock />}

      {/* Skip button — appears at t=1s (ItsLit spec: quasi-invisible, never intrusive) */}
      {showSkip && !exiting && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={handleEnter}
          onMouseEnter={playHover2}
          style={{
            position: 'absolute',
            bottom: 52,
            right: 20,
            zIndex: 40,
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4,
            padding: '6px 12px',
            color: 'rgba(255,255,255,0.35)',
            fontSize: 9,
            fontFamily: 'monospace',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          }}
          aria-label="Skip intro"
        >
          Skip
        </motion.button>
      )}

      {/* Footer label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={exiting ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: exiting ? 0 : 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'absolute', bottom: 40,
          fontSize: 10, letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(115,115,115,0.5)',
          fontFamily: "'Neue Montreal', system-ui, sans-serif",
          zIndex: 20,
          left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        {t.footerLabel}
      </motion.p>
    </motion.div>
  );
};

export default IntroScreen;
