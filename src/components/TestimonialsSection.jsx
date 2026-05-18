import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useAudio } from '../context/SoundContext';

/* ── Testimonial data ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sami Ben Amor',
    role: 'CEO, Prestige Immobilier',
    flag: '🇹🇳',
    division: 'agency',
    stars: 5,
    quote:
      "DCB transformed our entire digital presence. Our lead volume tripled in the first quarter after launch. They don't just build websites — they build revenue machines.",
    initials: 'SB',
    color: '#a3e635',
  },
  {
    id: 2,
    name: 'Leila Mansouri',
    role: 'Brand Manager, Azur Restaurant Group',
    flag: '🇹🇳',
    division: 'visuals',
    stars: 5,
    quote:
      "The brand film they produced for us went viral across our social channels. The team's cinematic vision and attention to detail is unlike anything we've seen in Tunisia. Absolutely world-class.",
    initials: 'LM',
    color: '#06b6d4',
  },
  {
    id: 3,
    name: 'Karim Trabelsi',
    role: 'Music Artist & Producer',
    flag: '🇹🇳',
    division: 'studio',
    stars: 5,
    quote:
      'Recording at DCB Studio was a career-defining experience. The sound quality, the creative direction, the engineering — it all comes together at a level I\'ve only seen in major international studios.',
    initials: 'KT',
    color: '#a855f7',
  },
  {
    id: 4,
    name: 'Nour Chaabane',
    role: 'Director, Glow Aesthetic Clinic',
    flag: '🇹🇳',
    division: 'agency',
    stars: 5,
    quote:
      'Our online booking system is now our biggest client acquisition channel. DCB understood our industry perfectly and built a platform that speaks to our clientele. ROI in under 3 months.',
    initials: 'NC',
    color: '#a3e635',
  },
  {
    id: 5,
    name: 'Mohamed Fadhel',
    role: 'Founder, Sonic Records',
    flag: '🇹🇳',
    division: 'studio',
    stars: 5,
    quote:
      'The production quality, the sound design, the final mix — everything was exceptional. DCB Studio has the rare ability to honor your artistic vision while pushing you to exceed it.',
    initials: 'MF',
    color: '#a855f7',
  },
  {
    id: 6,
    name: 'Sarah Oueslati',
    role: 'CMO, Villa Carthage Properties',
    flag: '🇹🇳',
    division: 'visuals',
    stars: 5,
    quote:
      'The drone footage and property films DCB produced sold our listings faster than any traditional marketing. Buyers were emotionally invested before ever visiting the property.',
    initials: 'SO',
    color: '#06b6d4',
  },
];

const DIVISION_LABEL = {
  en: { studio: 'Studio', visuals: 'Visuals', agency: 'Agency' },
  fr: { studio: 'Studio', visuals: 'Visuels', agency: 'Agence' },
  ar: { studio: 'الاستوديو', visuals: 'المرئيات', agency: 'الوكالة' },
};

/* ─────────────────────────────────────────────────────────────────────────────
   CONCEPT 08 — GHOST PORTFOLIO
   Synthesises a 5-second "voice note" per testimonial using the Web Audio API.
   No audio files needed. Each division gets a distinct synthesis profile:
     studio  → warm 130 Hz sine + slow AM modulation (tenor voice range)
     visuals → 190 Hz sawtooth through a low-pass filter (breathy)
     agency  → crisp 165 Hz square wave + faster AM (digital cadence)
   Visual: animated EQ mini-bars + a thin progress track.
───────────────────────────────────────────────────────────────────────────── */
const GHOST_CFG = {
  studio:  { freq: 130, type: 'sine',     modRate: 4.8, modDepth: 0.55 },
  visuals: { freq: 190, type: 'sawtooth', modRate: 3.5, modDepth: 0.45 },
  agency:  { freq: 165, type: 'square',   modRate: 6.2, modDepth: 0.42 },
};
const CLIP_DUR = 5;

/* Tiny animated EQ bars shown while playing */
const EQMini = ({ color }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', width: '16px', height: '11px' }}>
    {[0.55, 1, 0.7, 0.85, 0.45].map((h, i) => (
      <motion.div
        key={i}
        style={{ width: '2px', borderRadius: '1px', background: color, flexShrink: 0 }}
        animate={{ scaleY: [h, h * 0.35 + 0.1, h * 1.1, h * 0.6, h] }}
        transition={{ duration: 0.42 + i * 0.07, delay: i * 0.06, repeat: Infinity, ease: 'easeInOut', transformOrigin: 'bottom' }}
        initial={false}
      />
    ))}
  </div>
);

const GhostPlayer = ({ id, division, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress,  setProgress]  = useState(0);

  /* ── Real-file mode (preferred when /tracks/ghost-{id}.mp3 exists) ── */
  const realAudioRef  = useRef(null);
  const [hasRealClip, setHasRealClip] = useState(false);
  const realRafRef    = useRef(null);

  useEffect(() => {
    const audio = new Audio(`/tracks/ghost-${id}.mp3`);
    audio.preload = 'metadata';
    audio.onloadedmetadata = () => {
      realAudioRef.current = audio;
      setHasRealClip(true);
    };
    audio.onended = () => {
      cancelAnimationFrame(realRafRef.current);
      setIsPlaying(false);
      setProgress(0);
    };
    audio.onerror = () => {}; /* silent fail → synthesis mode */
    return () => { audio.pause(); audio.src = ''; };
  }, [id]);

  /* ── Synthesis mode (fallback) ── */
  const ctxRef   = useRef(null);
  const startRef = useRef(null);
  const rafRef   = useRef(null);
  const nodes    = useRef([]);

  const stopAll = useCallback(() => {
    /* Real audio */
    if (realAudioRef.current) { realAudioRef.current.pause(); realAudioRef.current.currentTime = 0; }
    cancelAnimationFrame(realRafRef.current);
    /* Synthesis */
    nodes.current.forEach(n => { try { n.stop(); } catch (_) {} });
    nodes.current = [];
    try { ctxRef.current?.close(); } catch (_) {}
    ctxRef.current = null;
    cancelAnimationFrame(rafRef.current);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) { stopAll(); return; }

    /* ── Real clip path ── */
    if (hasRealClip && realAudioRef.current) {
      const audio = realAudioRef.current;
      audio.currentTime = 0;
      audio.play().then(() => {
        setIsPlaying(true);
        setProgress(0);
        const tick = () => {
          if (!realAudioRef.current || realAudioRef.current.paused) return;
          setProgress(realAudioRef.current.currentTime / realAudioRef.current.duration);
          realRafRef.current = requestAnimationFrame(tick);
        };
        realRafRef.current = requestAnimationFrame(tick);
      }).catch(() => {});
      return;
    }

    /* ── Synthesis fallback ── */
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    const cfg = GHOST_CFG[division] || GHOST_CFG.studio;
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.07, now + 0.15);
    master.gain.setValueAtTime(0.07, now + CLIP_DUR - 0.5);
    master.gain.linearRampToValueAtTime(0, now + CLIP_DUR);
    master.connect(ctx.destination);

    const modOsc  = ctx.createOscillator();
    modOsc.type = 'sine';
    modOsc.frequency.setValueAtTime(cfg.modRate, now);
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(cfg.modDepth, now);
    modOsc.connect(modGain);

    const carrier     = ctx.createOscillator();
    carrier.type      = cfg.type;
    carrier.frequency.setValueAtTime(cfg.freq, now);
    carrier.frequency.linearRampToValueAtTime(cfg.freq * 0.98, now + 2.5);
    carrier.frequency.linearRampToValueAtTime(cfg.freq * 1.01, now + CLIP_DUR);

    const carrierGain = ctx.createGain();
    carrierGain.gain.setValueAtTime(1 - cfg.modDepth, now);
    modGain.connect(carrierGain.gain);
    carrier.connect(carrierGain);

    if (division === 'visuals') {
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(750, now);
      lpf.Q.setValueAtTime(0.8, now);
      carrierGain.connect(lpf);
      lpf.connect(master);
    } else {
      carrierGain.connect(master);
    }

    const harmOsc  = ctx.createOscillator();
    harmOsc.type   = 'sine';
    harmOsc.frequency.setValueAtTime(cfg.freq * 3, now);
    const harmGain = ctx.createGain();
    harmGain.gain.setValueAtTime(0.012, now);
    harmOsc.connect(harmGain);
    harmGain.connect(master);

    const end = now + CLIP_DUR;
    carrier.start();  carrier.stop(end);
    modOsc.start();   modOsc.stop(end);
    harmOsc.start();  harmOsc.stop(end);
    nodes.current = [carrier, modOsc, harmOsc];

    startRef.current = performance.now();
    setIsPlaying(true);
    setProgress(0);

    const tick = () => {
      const elapsed = (performance.now() - startRef.current) / 1000;
      if (elapsed >= CLIP_DUR) { stopAll(); return; }
      setProgress(elapsed / CLIP_DUR);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [isPlaying, hasRealClip, division, stopAll]);

  /* Cleanup on unmount */
  useEffect(() => () => stopAll(), [stopAll]);

  const elapsed = (progress * CLIP_DUR).toFixed(1);

  return (
    <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/[0.05] mt-1">
      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Stop voice note' : 'Play voice note'}
        className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.18em] border transition-all duration-300 shrink-0"
        style={{
          color:       isPlaying ? '#000'       : color,
          background:  isPlaying ? color        : `${color}18`,
          borderColor: `${color}40`,
        }}
      >
        {isPlaying
          ? <EQMini color="#000" />
          : <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><polygon points="1,0.5 7.5,4 1,7.5" fill="currentColor" /></svg>
        }
        <span>{isPlaying ? 'playing' : 'voice note'}</span>
      </button>

      {/* Progress track */}
      <div className="flex-1 h-px bg-white/[0.07] rounded-full overflow-hidden">
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: color,
            borderRadius: 999,
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      <span className="text-[8px] font-mono shrink-0" style={{ color: `${color}80` }}>
        {isPlaying ? `${elapsed}s` : `${CLIP_DUR}s`}
      </span>
    </div>
  );
};

/* ── Stars ────────────────────────────────────────────────────────────────── */
const Stars = ({ count, color }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={12} fill={color} style={{ color }} />
    ))}
  </div>
);

/* ── Avatar ───────────────────────────────────────────────────────────────── */
const Avatar = ({ initials, color }) => (
  <div
    className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm text-black shrink-0"
    style={{ background: `linear-gradient(135deg, ${color}cc, ${color}66)` }}
  >
    {initials}
  </div>
);

/* ── Testimonial card ─────────────────────────────────────────────────────── */
const TestimonialCard = ({ t, lang }) => {
  const divLabel = (DIVISION_LABEL[lang] || DIVISION_LABEL.en)[t.division];
  return (
    <div className="relative flex flex-col gap-5 p-7 md:p-8 h-full">
      {/* Giant quote mark */}
      <Quote size={48} className="absolute top-6 right-6 opacity-[0.04]" style={{ color: t.color }} />

      {/* Stars + division badge */}
      <div className="flex items-center justify-between">
        <Stars count={t.stars} color={t.color} />
        <span
          className="text-[9px] font-bold uppercase tracking-[0.25em] px-2 py-0.5 rounded-full"
          style={{ color: t.color, background: `${t.color}14`, border: `1px solid ${t.color}30` }}
        >
          {divLabel}
        </span>
      </div>

      {/* Quote text */}
      <blockquote className="text-neutral-300 text-sm leading-relaxed font-medium flex-1">
        "{t.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <Avatar initials={t.initials} color={t.color} />
        <div>
          <p className="text-sm font-bold text-white">{t.name} <span>{t.flag}</span></p>
          <p className="text-[11px] text-neutral-500">{t.role}</p>
        </div>
      </div>

      {/* ── Concept 08: Ghost Portfolio voice note player ── */}
      <GhostPlayer id={t.id} division={t.division} color={t.color} />
    </div>
  );
};

/* ── Main Section ─────────────────────────────────────────────────────────── */
const TestimonialsSection = ({ lang }) => {
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(1);
  const intervalRef = useRef(null);
  const { playClick, playHover } = useAudio();
  const total = TESTIMONIALS.length;

  const go = useCallback((newIdx, direction) => {
    setDir(direction);
    setCurrent(newIdx);
  }, []);

  const next = useCallback(() => { playClick(); go((current + 1) % total, 1); }, [current, total, go, playClick]);
  const prev = useCallback(() => { playClick(); go((current - 1 + total) % total, -1); }, [current, total, go, playClick]);

  useEffect(() => {
    intervalRef.current = setInterval(() => { setCurrent(c => (c + 1) % total); setDir(1); }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [total]);

  const handleNav = (fn) => {
    clearInterval(intervalRef.current);
    fn();
    intervalRef.current = setInterval(() => { setCurrent(c => (c + 1) % total); setDir(1); }, 5000);
  };

  const t   = TESTIMONIALS[current];
  const tl  = TRANSLATIONS[lang]?.testimonials || TRANSLATIONS.en.testimonials;
  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  const slideVariants = {
    enter:  (d) => ({ x: d > 0 ?  60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? -60 :  60, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-18 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <hr className="accent-line" />
            <span className="section-overline">{tl.overline}</span>
            <hr className="accent-line" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <h2 className="section-title text-5xl md:text-7xl text-white">
            {tl.title} <span className="text-outline">{tl.titleOutline}</span>
          </h2>
          <p className="text-neutral-500 text-sm mt-4 max-w-sm mx-auto">{tl.subtitle}</p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          role="region"
          aria-label="Testimonials carousel"
          aria-live="polite"
          aria-atomic="false"
        >
          {/* Desktop 3-col */}
          <div
            className="hidden md:grid md:grid-cols-3 gap-5 items-stretch"
            onMouseEnter={() => clearInterval(intervalRef.current)}
            onMouseLeave={() => {
              intervalRef.current = setInterval(() => { setCurrent(c => (c + 1) % total); setDir(1); }, 5000);
            }}
          >
            {[prevIdx, current, nextIdx].map((idx, pos) => {
              const item     = TESTIMONIALS[idx];
              const isCenter = pos === 1;
              return (
                <motion.div
                  key={item.id}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale:   isCenter ? 1 : 0.96,
                    filter:  isCenter ? 'blur(0px)' : 'blur(1px)',
                  }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    borderColor: isCenter ? `${item.color}30` : 'rgba(255,255,255,0.05)',
                    background:  isCenter ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.01)',
                    boxShadow:   isCenter ? `0 0 48px ${item.color}10, 0 24px 64px rgba(0,0,0,0.4)` : 'none',
                  }}
                >
                  <TestimonialCard t={item} lang={lang} />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile single card */}
          <div
            className="md:hidden relative overflow-hidden rounded-2xl border"
            style={{ borderColor: `${t.color}30`, background: 'rgba(255,255,255,0.025)' }}
          >
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={t.id}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <TestimonialCard t={t} lang={lang} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows + dots */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => handleNav(prev)}
              onMouseEnter={playHover}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { clearInterval(intervalRef.current); go(i, i > current ? 1 : -1); }}
                  aria-label={`Testimonial ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width:        i === current ? 20 : 6,
                    height:       6,
                    borderRadius: 999,
                    background:   i === current ? TESTIMONIALS[i].color : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => handleNav(next)}
              onMouseEnter={playHover}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/[0.05]"
          >
            <div className="text-center">
              <p className="text-3xl font-black text-white">5.0</p>
              <div className="flex justify-center mt-1"><Stars count={5} color="#a855f7" /></div>
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-1">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-white/[0.06]" />
            <div className="text-center">
              <p className="text-3xl font-black text-white">{total}</p>
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-2">{tl.reviewCount}</p>
            </div>
            <div className="w-px h-12 bg-white/[0.06]" />
            <div className="text-center">
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-2">{tl.recommended}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
