import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import TRANSLATIONS from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── Word-level clip reveal ───────────────────────────────────────────────── */
const WORD_VARIANTS = {
  hidden:  { y: '115%', opacity: 0 },
  visible: ({ lineIdx, wordIdx }) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: lineIdx * 0.12 + wordIdx * 0.065,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────────
   CONCEPT 06 — CHROMATIC ABERRATION REVEAL (retained from previous sprint)
   Applied to the first two (isBig) Manifesto lines only.
───────────────────────────────────────────────────────────────────────────── */
const CHROMA_OFF  = 'drop-shadow(0px 0 0 rgba(255,30,100,0)) drop-shadow(0px 0 0 rgba(0,140,255,0))';
const CHROMA_PEAK = 'drop-shadow(-8px 0 0 rgba(255,30,100,0.72)) drop-shadow(8px 0 0 rgba(0,140,255,0.72))';
const CHROMA_MID  = 'drop-shadow(-3px 0 0 rgba(255,30,100,0.22)) drop-shadow(3px 0 0 rgba(0,140,255,0.22))';

const ChromaLine = ({ children, lineIdx, isVisible }) => {
  const settleDelay = 0.60 + lineIdx * 0.12;
  return (
    <motion.div
      initial={{ filter: CHROMA_OFF }}
      animate={isVisible
        ? { filter: [CHROMA_OFF, CHROMA_PEAK, CHROMA_MID, CHROMA_OFF] }
        : { filter: CHROMA_OFF }
      }
      transition={{ delay: settleDelay, duration: 0.70, times: [0, 0.28, 0.65, 1], ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   CONCEPT 11 — MANIFESTO READS ITSELF
   Web Speech API integration — a "LISTEN" button triggers word-by-word
   synthesis. Each word being spoken receives a gradient highlight synced
   to the SpeechSynthesisUtterance 'boundary' event.

   Algorithm:
     1. Pre-build a word position map: { start, lineIdx, wordIdx } per word
        where start = char offset in the full joined utterance string.
     2. SpeechSynthesisUtterance.onboundary fires with e.charIndex pointing
        to the start of the current word in that string.
     3. Find the closest map entry (last entry with start ≤ charIndex).
     4. Set activeWordKey = "${lineIdx}-${wordIdx}" → triggers a targeted
        re-render that swaps the word's className to the gradient highlight.

   Active word style:
     • Non-accent lines (white): text-purple-200 with a soft glow filter.
     • Accent lines (gradient):  brighter white-purple gradient.
───────────────────────────────────────────────────────────────────────────── */

/* Microphone icon SVG */
const MicIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 14" fill="none" aria-hidden="true">
    <rect x="3.5" y="0.5" width="5" height="8" rx="2.5" fill="currentColor" />
    <path
      d="M1 7C1 9.76 3.24 12 6 12C8.76 12 11 9.76 11 7"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"
    />
    <line x1="6" y1="12" x2="6" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="4" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/* Pulsing stop square */
const StopIcon = () => (
  <motion.div
    className="w-2.5 h-2.5 rounded-sm bg-current"
    animate={{ opacity: [1, 0.4, 1] }}
    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ── ManifestoSection ─────────────────────────────────────────────────────── */
const ManifestoSection = ({ lang }) => {
  const t       = TRANSLATIONS[lang].manifesto;
  const { ref, isVisible } = useScrollReveal({ threshold: 0.25 });
  const isRtl   = lang === 'ar';

  /* ── Speech state ── */
  const [isReading,     setIsReading]     = useState(false);
  const [activeWordKey, setActiveWordKey] = useState(null);
  const wordMapRef  = useRef([]);
  const utterRef    = useRef(null);
  const hasSpeech   = typeof window !== 'undefined' && 'speechSynthesis' in window;

  /* Build word position map whenever translations change */
  useEffect(() => {
    let pos = 0;
    const map = [];
    t.lines.forEach((line, lineIdx) => {
      line.text.split(' ').forEach((word, wordIdx) => {
        map.push({ start: pos, lineIdx, wordIdx });
        pos += word.length + 1; /* word + trailing space */
      });
    });
    wordMapRef.current = map;
  }, [t.lines]);

  /* Cancel speech on unmount */
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  const startReading = useCallback(() => {
    if (!hasSpeech) return;
    window.speechSynthesis.cancel();

    const fullText = t.lines.map(l => l.text).join(' ');
    const utter    = new SpeechSynthesisUtterance(fullText);
    utter.rate  = 0.88;
    utter.pitch = 1.0;
    utter.lang  = lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US';

    utter.onboundary = (e) => {
      if (e.name !== 'word') return;
      const map   = wordMapRef.current;
      /* Find last entry whose start ≤ current charIndex */
      const entry = [...map].reverse().find(w => w.start <= e.charIndex);
      if (entry) setActiveWordKey(`${entry.lineIdx}-${entry.wordIdx}`);
    };

    utter.onend   = () => { setIsReading(false); setActiveWordKey(null); };
    utter.onerror = () => { setIsReading(false); setActiveWordKey(null); };

    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setIsReading(true);
  }, [hasSpeech, t.lines, lang]);

  const stopReading = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setActiveWordKey(null);
  }, []);

  return (
    <section
      id="manifesto"
      className="relative py-28 md:py-44 overflow-hidden"
      style={{ background: '#030307' }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Ambient centre glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 130% 90% at 50% 55%, rgba(139,92,246,0.07) 0%, transparent 65%)',
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div ref={ref} className="max-w-5xl mx-auto px-4 md:px-6 text-center">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-14 md:mb-20"
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-purple-500/40" />
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.35em]">
            {t.overline}
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-purple-500/40" />
        </motion.div>

        {/* Lines — word-by-word reveal + chromatic aberration on big lines */}
        <div className="mb-10">
          {t.lines.map((line, lineIdx) => {
            const isBig  = lineIdx < 2;
            const words  = line.text.split(' ');

            const sizeClass = isBig
              ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter'
              : 'text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight';

            const baseColorClass = line.accent
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-lime-400 font-display italic'
              : isBig
                ? 'text-white'
                : 'text-neutral-400';

            /* Word-by-word row */
            const wordRow = (
              <div
                className={`flex flex-wrap justify-center items-baseline gap-x-[0.28em] ${
                  lineIdx >= 2 ? 'mt-5 md:mt-7' : lineIdx > 0 ? 'mt-1 md:mt-2' : ''
                }`}
              >
                {words.map((word, wordIdx) => {
                  const wordKey  = `${lineIdx}-${wordIdx}`;
                  const isActive = activeWordKey === wordKey;

                  /* Active word highlight — overrides the default color class */
                  const activeClass = line.accent
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 font-display italic'
                    : 'text-purple-200';

                  return (
                    <span
                      key={wordIdx}
                      style={{
                        overflow: 'hidden',
                        display:  'inline-block',
                        paddingBottom: '0.1em',
                        paddingTop:    '0.02em',
                      }}
                    >
                      <motion.span
                        custom={{ lineIdx, wordIdx }}
                        variants={WORD_VARIANTS}
                        initial="hidden"
                        animate={isVisible ? 'visible' : 'hidden'}
                        className={`inline-block ${sizeClass} transition-colors duration-150 ${
                          isActive ? activeClass : baseColorClass
                        }`}
                        style={
                          isActive && !line.accent
                            ? { filter: 'drop-shadow(0 0 10px rgba(192,132,252,0.7))' }
                            : undefined
                        }
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </div>
            );

            /* Big lines get the chromatic aberration wrapper */
            if (isBig) {
              return (
                <ChromaLine key={lineIdx} lineIdx={lineIdx} isVisible={isVisible}>
                  {wordRow}
                </ChromaLine>
              );
            }
            return <React.Fragment key={lineIdx}>{wordRow}</React.Fragment>;
          })}
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto h-px w-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)',
            transformOrigin: '50%',
          }}
        />

        {/* ── Concept 11: LISTEN button ── */}
        {hasSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-9 flex items-center justify-center"
          >
            <button
              onClick={isReading ? stopReading : startReading}
              aria-label={isReading ? 'Stop reading' : 'Listen to the manifesto'}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border transition-all duration-400"
              style={{
                borderColor: isReading ? 'rgba(192,132,252,0.45)' : 'rgba(255,255,255,0.08)',
                background:  isReading ? 'rgba(139,92,246,0.1)'   : 'rgba(255,255,255,0.02)',
                color:       isReading ? '#c084fc'                : 'rgba(255,255,255,0.28)',
              }}
            >
              {isReading ? <StopIcon /> : <MicIcon />}
              <span className="text-[9px] font-bold uppercase tracking-[0.28em]">
                {isReading ? 'stop' : 'listen'}
              </span>
              {isReading && (
                <motion.div
                  className="flex items-end gap-[2px]"
                  style={{ height: 10 }}
                >
                  {[0.6, 1, 0.7, 0.9, 0.5].map((h, i) => (
                    <motion.div
                      key={i}
                      style={{ width: 2, borderRadius: 1, background: '#a855f7', transformOrigin: 'bottom' }}
                      animate={{ scaleY: [h, h * 0.3 + 0.1, h * 1.1, h * 0.5, h] }}
                      transition={{ duration: 0.45 + i * 0.07, delay: i * 0.06, repeat: Infinity, ease: 'easeInOut' }}
                      initial={false}
                    />
                  ))}
                </motion.div>
              )}
            </button>
          </motion.div>
        )}

      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </section>
  );
};

export default ManifestoSection;
