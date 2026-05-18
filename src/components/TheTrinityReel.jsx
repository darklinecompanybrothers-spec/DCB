import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

/* ── Panel data ─────────────────────────────────────────────────────────── */
const PANELS = [
  {
    num: '01',
    label: 'The Studio',
    line1: 'THE',
    line2: 'STUDIO',
    tagline: 'Where Sound Becomes Legacy',
    accent: '#8b5cf6',
    accentDim: 'rgba(139,92,246,0.12)',
    glow: 'rgba(139,92,246,0.18)',
    services: ['Professional Recording', 'Mixing & Mastering', 'Beat Production', 'Podcast Studio'],
    bgFrom: '#0a0318',
    bgBars: true,
  },
  {
    num: '02',
    label: 'The Visuals',
    line1: 'THE',
    line2: 'VISUALS',
    tagline: 'Frame Every Story Perfectly',
    accent: '#06b6d4',
    accentDim: 'rgba(6,182,212,0.10)',
    glow: 'rgba(6,182,212,0.15)',
    services: ['Cinematic Videos', 'Brand Photography', 'Music Clips', 'Reels & Content'],
    bgFrom: '#001420',
    bgBars: false,
  },
  {
    num: '03',
    label: 'The Agency',
    line1: 'THE',
    line2: 'AGENCY',
    tagline: 'Build. Brand. Dominate.',
    accent: '#84cc16',
    accentDim: 'rgba(132,204,22,0.09)',
    glow: 'rgba(132,204,22,0.12)',
    services: ['Web Design & Dev', 'SEO & Performance', 'Social Media', 'Brand Identity'],
    bgFrom: '#05110a',
    bgGrid: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   CONCEPT 07 — THE TRINITY PORTAL
   Three vertical panels covering the reel, each slides away on first scroll.
   Left → out left | Center → out upward | Right → out right
   Seams glow with each division's accent colour.
───────────────────────────────────────────────────────────────────────────── */
const TrinityPortal = ({ scrollYProgress }) => {
  const progress = useTransform(scrollYProgress, [0, 0.065], [0, 1]);
  const leftX    = useTransform(progress, [0, 1], ['0%', '-103%']);
  const centerY  = useTransform(progress, [0, 1], ['0%', '-103%']);
  const rightX   = useTransform(progress, [0, 1], ['0%', '103%']);
  const wrapOp   = useTransform(progress, [0.82, 1], [1, 0]);

  const seamStyle = (color, edge) => ({
    position: 'absolute',
    [edge]: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: `linear-gradient(to bottom, transparent 0%, ${color} 50%, transparent 100%)`,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 15,
        display: 'flex',
        pointerEvents: 'none',
        opacity: wrapOp,
      }}
    >
      {/* ── LEFT — The Studio / Purple ── */}
      <motion.div
        style={{
          x: leftX,
          width: '33.333vw',
          height: '100%',
          flexShrink: 0,
          position: 'relative',
          background: 'linear-gradient(160deg, #080216 0%, #110440 55%, #060114 100%)',
          borderRight: '1px solid rgba(139,92,246,0.18)',
        }}
      >
        {/* Ambient glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(139,92,246,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Identity */}
        <div style={{ position: 'absolute', bottom: 52, left: 36 }}>
          <p style={{ color: '#8b5cf6', fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.65 }}>
            01 — THE STUDIO
          </p>
          <p style={{ color: 'rgba(255,255,255,0.06)', fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'inherit' }}>
            SOUND
          </p>
        </div>
        {/* Right seam */}
        <div style={seamStyle('rgba(139,92,246,0.55)', 'right')} />
      </motion.div>

      {/* ── CENTER — The Visuals / Cyan ── */}
      <motion.div
        style={{
          y: centerY,
          width: '33.333vw',
          height: '100%',
          flexShrink: 0,
          position: 'relative',
          background: 'linear-gradient(160deg, #001322 0%, #002638 55%, #001322 100%)',
          borderLeft: '1px solid rgba(6,182,212,0.15)',
          borderRight: '1px solid rgba(6,182,212,0.15)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Scroll hint — center panel */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', whiteSpace: 'nowrap' }}>
          <p style={{ color: 'rgba(255,255,255,0.12)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'monospace', marginBottom: 12 }}>
            SCROLL TO REVEAL
          </p>
          <motion.div
            style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(6,182,212,0.5), transparent)', margin: '0 auto' }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        {/* Identity */}
        <div style={{ position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <p style={{ color: '#06b6d4', fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.65 }}>
            02 — THE VISUALS
          </p>
          <p style={{ color: 'rgba(255,255,255,0.06)', fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>
            VISION
          </p>
        </div>
        {/* Seams */}
        <div style={seamStyle('rgba(6,182,212,0.5)', 'left')} />
        <div style={seamStyle('rgba(6,182,212,0.5)', 'right')} />
      </motion.div>

      {/* ── RIGHT — The Agency / Lime ── */}
      <motion.div
        style={{
          x: rightX,
          width: '33.333vw',
          height: '100%',
          flexShrink: 0,
          position: 'relative',
          background: 'linear-gradient(160deg, #040e03 0%, #0c1f09 55%, #040e03 100%)',
          borderLeft: '1px solid rgba(132,204,22,0.15)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(132,204,22,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Identity */}
        <div style={{ position: 'absolute', bottom: 52, right: 36, textAlign: 'right' }}>
          <p style={{ color: '#84cc16', fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.65 }}>
            03 — THE AGENCY
          </p>
          <p style={{ color: 'rgba(255,255,255,0.06)', fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em' }}>
            CODE
          </p>
        </div>
        {/* Left seam */}
        <div style={seamStyle('rgba(132,204,22,0.5)', 'left')} />
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   CONCEPT 05 — WAVEFORM SCRUBBER
   Scroll-driven waveform on the Studio panel.
   Playhead advances as you scroll through the Studio section.
   Bars light up progressively (dim → purple) as the playhead passes them.
───────────────────────────────────────────────────────────────────────────── */
const BAR_COUNT = 110;

/* Generate realistic waveform heights once (seeded LCG) */
function buildWaveform() {
  let s = 9283;
  const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };

  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const pos = i / BAR_COUNT;
    // Amplitude envelope: quiet intro → build → peak → outro
    const env = 0.15
      + Math.sin(pos * Math.PI) * 0.55         // main arch
      + Math.sin(pos * Math.PI * 6) * 0.12    // detail oscillation
      + Math.cos(pos * Math.PI * 14) * 0.06;  // fine detail
    return Math.max(0.04, Math.min(0.96, env + (rand() - 0.5) * 0.22));
  });
}

const WAVEFORM_BARS = buildWaveform();

/* Format seconds → M:SS */
const fmtTime = (s) => {
  if (!s || isNaN(s)) return '–:––';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const WaveformScrubber = ({ studioProgress }) => {
  /* ── Scroll-driven mode (always active as fallback) ── */
  const scrollPlayheadLeft = useTransform(studioProgress, [0, 1], ['0%', '100%']);
  const [scrollLitIdx, setScrollLitIdx] = useState(0);
  const scrollLastRef = useRef(0);

  useMotionValueEvent(studioProgress, 'change', (v) => {
    const idx = Math.floor(Math.min(1, Math.max(0, v)) * BAR_COUNT);
    if (idx !== scrollLastRef.current) {
      scrollLastRef.current = idx;
      setScrollLitIdx(idx);
    }
  });

  /* ── Real audio mode (activates when /tracks/studio-01.mp3 is found) ── */
  const audioRef  = useRef(null);
  const rafRef    = useRef(null);
  const [audioReady,    setAudioReady]    = useState(false);
  const [isPlaying,     setIsPlaying]     = useState(false);
  const [audioProgress, setAudioProgress] = useState(0); // 0–1
  const [duration,      setDuration]      = useState(null);

  useEffect(() => {
    const audio = new Audio('/tracks/studio-01.mp3');
    audio.preload = 'metadata';
    audio.onloadedmetadata = () => {
      audioRef.current = audio;
      setDuration(audio.duration);
      setAudioReady(true);
    };
    audio.onended = () => {
      cancelAnimationFrame(rafRef.current);
      setIsPlaying(false);
      setAudioProgress(0);
    };
    audio.onerror = () => {}; /* silent fail → cosmetic scroll mode stays */
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(rafRef.current);
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        const tick = () => {
          if (!audioRef.current) return;
          setAudioProgress(audioRef.current.currentTime / audioRef.current.duration);
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      }).catch(() => {});
    }
  }, [isPlaying]);

  /* Cleanup on unmount */
  useEffect(() => () => { audioRef.current?.pause(); cancelAnimationFrame(rafRef.current); }, []);

  /* Unified values — audio wins when ready + active */
  const audioActive = audioReady && (isPlaying || audioProgress > 0);
  const litIndex    = audioActive ? Math.floor(audioProgress * BAR_COUNT) : scrollLitIdx;
  const audioLeftPct = `${audioProgress * 100}%`;
  const currentTimeSec = (duration || 0) * audioProgress;

  /* Label & duration */
  const label    = audioReady ? 'DCB — LEGACY AUDIO' : 'DCB — LEGACY AUDIO / SCROLL TO SCRUB';
  const durLabel = audioReady ? `${fmtTime(currentTimeSec)} / ${fmtTime(duration)}` : '–:––';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        left: 32,
        right: 32,
        /* pointer-events only where play button lives */
        zIndex: 5,
      }}
    >
      {/* Track label row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center', pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(139,92,246,0.45)' }}>
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Play / Pause button — only rendered when a real file is loaded */}
          {audioReady && (
            <button
              onClick={toggleAudio}
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
              style={{
                pointerEvents: 'all',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20,
                borderRadius: '50%',
                border: '1px solid rgba(192,132,252,0.4)',
                background: isPlaying ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.08)',
                cursor: 'pointer',
                color: '#c084fc',
                transition: 'background 0.2s',
              }}
            >
              {isPlaying
                ? /* Pause icon */
                  <svg width="7" height="9" viewBox="0 0 7 9" fill="currentColor">
                    <rect x="0" y="0" width="2.5" height="9" rx="0.5" />
                    <rect x="4.5" y="0" width="2.5" height="9" rx="0.5" />
                  </svg>
                : /* Play icon */
                  <svg width="7" height="9" viewBox="0 0 7 9" fill="currentColor">
                    <polygon points="0.5,0.5 6.5,4.5 0.5,8.5" />
                  </svg>
              }
            </button>
          )}
          <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', pointerEvents: 'none' }}>
            {durLabel}
          </span>
        </div>
      </div>

      {/* Waveform SVG + playhead */}
      <div style={{ position: 'relative', height: 52, pointerEvents: 'none' }}>
        <svg
          viewBox={`0 0 ${BAR_COUNT} 1`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {WAVEFORM_BARS.map((h, i) => (
            <rect
              key={i}
              x={i + 0.1} width={0.72} y={1 - h} height={h} rx={0.09}
              fill={
                i < litIndex
                  ? (i < litIndex - 3 ? 'rgba(139,92,246,0.75)' : 'rgba(139,92,246,1)')
                  : 'rgba(139,92,246,0.11)'
              }
            />
          ))}
        </svg>

        {/* Playhead — switches between audio-driven CSS and scroll-driven motion value */}
        {audioActive ? (
          <>
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: audioLeftPct,
              width: 2, borderRadius: 1, background: '#c084fc',
              boxShadow: '0 0 8px rgba(192,132,252,0.9), 0 0 18px rgba(139,92,246,0.5)',
              transform: 'translateX(-50%)',
              transition: 'left 0.08s linear',
            }} />
            <div style={{
              position: 'absolute', top: -4, left: audioLeftPct,
              width: 7, height: 7, borderRadius: '50%', background: '#c084fc',
              boxShadow: '0 0 10px rgba(192,132,252,1)',
              transform: 'translateX(-50%)',
              transition: 'left 0.08s linear',
            }} />
          </>
        ) : (
          <>
            <motion.div style={{
              position: 'absolute', top: 0, bottom: 0, left: scrollPlayheadLeft,
              width: 2, borderRadius: 1, background: '#c084fc',
              boxShadow: '0 0 8px rgba(192,132,252,0.9), 0 0 18px rgba(139,92,246,0.5)',
              transform: 'translateX(-50%)',
            }} />
            <motion.div style={{
              position: 'absolute', top: -4, left: scrollPlayheadLeft,
              width: 7, height: 7, borderRadius: '50%', background: '#c084fc',
              boxShadow: '0 0 10px rgba(192,132,252,1)',
              transform: 'translateX(-50%)',
            }} />
          </>
        )}
      </div>

      {/* Time ruler ticks */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, pointerEvents: 'none' }}>
        {(audioReady && duration
          ? [0, 0.25, 0.5, 0.75, 1].map(p => fmtTime(p * duration))
          : ['0:00', '0:51', '1:42', '2:33', '3:24']
        ).map((t) => (
          <span key={t} style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.10)', letterSpacing: '0.05em' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Progress dots ───────────────────────────────────────────────────────── */
const ProgressDots = ({ scrollYProgress }) => {
  const [active, setActive] = React.useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(Math.floor(v * 3), 2));
  });

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 pointer-events-none">
      {PANELS.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            width: active === i ? 32 : 8,
            opacity: active === i ? 1 : 0.25,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] rounded-full"
          style={{ background: active === i ? PANELS[i].accent : '#fff' }}
        />
      ))}
    </div>
  );
};

/* ── Single panel ────────────────────────────────────────────────────────── */
const Panel = ({ panel }) => (
  <div
    className="relative flex flex-col items-center justify-center overflow-hidden"
    style={{
      width: '100vw',
      height: '100%',
      background: `linear-gradient(160deg, ${panel.bgFrom} 0%, #050508 70%)`,
    }}
  >
    {/* Central glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 80% 55% at 50% 50%, ${panel.glow} 0%, transparent 70%)`,
      }}
    />

    {/* Giant watermark number */}
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 font-black leading-none select-none pointer-events-none"
      style={{
        fontSize: 'clamp(140px, 26vw, 400px)',
        color: panel.accent,
        opacity: 0.05,
        lineHeight: 0.85,
        transform: 'translate(8%, -5%)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {panel.num}
    </div>

    {/* Equaliser bars (Studio only) */}
    {panel.bgBars && (
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-[4px] pointer-events-none overflow-hidden"
        style={{ height: '58%', opacity: 0.06 }}
      >
        {Array.from({ length: 32 }).map((_, i) => {
          const h = 18 + Math.sin(i * 0.7 + 1) * 14 + Math.cos(i * 0.3) * 22;
          const dur = (0.55 + (i % 7) * 0.11).toFixed(2);
          const del = (i * 0.055).toFixed(2);
          return (
            <div
              key={i}
              className="w-[7px] rounded-t-sm origin-bottom"
              style={{
                height: `${h}%`,
                background: panel.accent,
                animation: `eq-bar ${dur}s ease-in-out ${del}s infinite`,
              }}
            />
          );
        })}
      </div>
    )}

    {/* Grid lines (Agency only) */}
    {panel.bgGrid && (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${panel.accent}25 1px, transparent 1px), linear-gradient(90deg, ${panel.accent}25 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          opacity: 0.08,
        }}
      />
    )}

    {/* Main content */}
    <div className="relative z-10 text-center px-8 md:px-16 max-w-5xl mx-auto">

      {/* Label */}
      <div
        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.35em] mb-8 md:mb-12"
        style={{
          color: panel.accent,
          borderColor: `${panel.accent}30`,
          background: `${panel.accent}08`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: panel.accent }} />
        {panel.label}
      </div>

      {/* Giant title */}
      <div
        className="font-black leading-[0.85] tracking-tighter select-none"
        style={{ fontSize: 'clamp(56px, 11vw, 150px)' }}
      >
        <span className="block text-white/90">{panel.line1}</span>
        <span
          className="block text-transparent bg-clip-text"
          style={{ backgroundImage: `linear-gradient(135deg, ${panel.accent} 0%, ${panel.accent}99 100%)` }}
        >
          {panel.line2}
        </span>
      </div>

      {/* Tagline */}
      <p className="mt-6 md:mt-8 text-base md:text-xl font-display italic text-neutral-400 tracking-wide">
        {panel.tagline}
      </p>

      {/* Divider */}
      <div
        className="mx-auto mt-8 md:mt-10 h-px w-16"
        style={{ background: `linear-gradient(90deg, transparent, ${panel.accent}60, transparent)` }}
      />

      {/* Service pills */}
      <div className="flex flex-wrap justify-center gap-2 mt-8 md:mt-10">
        {panel.services.map((s, i) => (
          <span
            key={i}
            className="px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border"
            style={{
              color: panel.accent,
              borderColor: `${panel.accent}28`,
              background: `${panel.accent}06`,
            }}
          >
            {s}
          </span>
        ))}
      </div>

    </div>

    {/* Bottom + top separators */}
    <div
      className="absolute top-0 inset-x-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${panel.accent}25, transparent)` }}
    />
    <div
      className="absolute bottom-0 inset-x-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${panel.accent}15, transparent)` }}
    />
  </div>
);

/* ── Mobile stack ────────────────────────────────────────────────────────── */
const MobileStack = () => (
  <div className="py-16 space-y-4 px-4">
    {PANELS.map((panel, i) => (
      <div
        key={i}
        className="relative rounded-2xl overflow-hidden py-14 px-6 text-center border border-white/[0.05]"
        style={{ background: `linear-gradient(160deg, ${panel.bgFrom} 0%, #050508 80%)` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${panel.glow} 0%, transparent 70%)` }}
        />
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: panel.accent, borderColor: `${panel.accent}30`, background: `${panel.accent}08` }}
          >
            {panel.label}
          </div>
          <div className="text-4xl font-black tracking-tighter leading-[0.85] mb-4">
            <span className="block text-white">{panel.line1}</span>
            <span
              className="block text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${panel.accent}, ${panel.accent}99)` }}
            >
              {panel.line2}
            </span>
          </div>
          <p className="text-neutral-400 font-display italic text-sm mb-6">{panel.tagline}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {panel.services.map((s, j) => (
              <span
                key={j}
                className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                style={{ color: panel.accent, borderColor: `${panel.accent}28`, background: `${panel.accent}06` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ── Main component ──────────────────────────────────────────────────────── */
const TheTrinityReel = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* x: panel 1 at 0vw → panel 3 at -200vw */
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw']);

  /* Waveform scrubber: active during Studio section (after portal clears) */
  const studioProgress = useTransform(scrollYProgress, [0.07, 0.30], [0, 1]);

  return (
    <>
      {/* ── Desktop: horizontal sticky reel ── */}
      <div
        id="trinity"
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: '400vh' }}
        aria-label="The Trinity — three divisions of DCB Authority Group"
      >
        <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>

          {/* Horizontal track */}
          <motion.div
            style={{ x, display: 'flex', width: '300vw', height: '100%', willChange: 'transform' }}
          >
            {PANELS.map((panel, i) => (
              <div
                key={i}
                style={{ position: 'relative', flexShrink: 0 }}
              >
                <Panel panel={panel} />
                {/* Waveform Scrubber — Studio panel only */}
                {i === 0 && <WaveformScrubber studioProgress={studioProgress} />}
              </div>
            ))}
          </motion.div>

          {/* Progress dots */}
          <ProgressDots scrollYProgress={scrollYProgress} />

          {/* Trinity Portal — slides away on scroll start */}
          <TrinityPortal scrollYProgress={scrollYProgress} />

          {/* Scroll hint — fades as scroll begins */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
            className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
              scroll to explore
            </span>
            <motion.div
              className="w-px h-10 rounded-full bg-gradient-to-b from-neutral-600 to-transparent"
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 0.15, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>

        </div>
      </div>

      {/* ── Mobile: vertical stack ── */}
      <div className="md:hidden" style={{ background: '#050508' }}>
        <MobileStack />
      </div>
    </>
  );
};

export default TheTrinityReel;
