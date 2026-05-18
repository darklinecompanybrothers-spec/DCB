/**
 * OracleField.jsx — Concept 01: THE ORACLE
 *
 * Sound-reactive particle field with simulated FFT.
 * Bass (0-2)  → dense, slow, large particles clustered at bottom  [purple]
 * Low-mid(3-5)→ medium float, center-low                          [indigo]
 * Mid (6-9)   → faster drift, center zone                         [cyan]
 * Highs(10-15)→ tiny, fast, scattered top                         [lime]
 *
 * Studio section → EQ bar overlay appears at bottom.
 * Uses mixBlendMode: 'screen' — blends additively with starfield.
 *
 * Voice Mode (Concept 01+) — opt-in getUserMedia FFT replaces simulateFFT.
 * Microphone button rendered via React portal (escapes GlobalBackground overflow).
 */
import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/* ── Frequency band definitions ─────────────────────────────────── */
const BANDS = [
  { range: [0,  2],  yZone: [0.62, 1.00], color: [168, 85,  247], speed: 0.32, sizeR: [3.5, 7.0] }, // bass
  { range: [3,  5],  yZone: [0.42, 0.74], color: [124, 58,  237], speed: 0.55, sizeR: [2.0, 4.5] }, // low-mid
  { range: [6,  9],  yZone: [0.22, 0.58], color: [6,  182, 212],  speed: 0.88, sizeR: [1.2, 3.0] }, // mid
  { range: [10, 15], yZone: [0.00, 0.38], color: [163, 230,  53], speed: 1.55, sizeR: [0.7, 2.2] }, // highs
];

/* ── Deterministic seeded LCG ────────────────────────────────────── */
function lcg(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

/* ── Simulated FFT — 16 bins, smooth organic motion ─────────────── */
function simulateFFT(t) {
  const out = new Float32Array(16);
  for (let i = 0; i < 16; i++) {
    out[i] =
      0.12 +
      Math.abs(Math.sin(t * (0.26 + i * 0.12) + i * 0.45)) * 0.44 +
      Math.abs(Math.sin(t * (0.62 + i * 0.07) + i * 0.83)) * 0.28 +
      Math.abs(Math.sin(t * 1.55 + i * 0.31)) * 0.16;
  }
  return out;
}

/* ── Real FFT mapping — Uint8Array(N) → Float32Array(16) normalized ── */
function mapRealFFT(raw) {
  const out = new Float32Array(16);
  for (let i = 0; i < 16; i++) {
    const start = Math.floor(i * raw.length / 16);
    const end   = Math.floor((i + 1) * raw.length / 16);
    let sum = 0;
    for (let j = start; j < end; j++) sum += raw[j];
    out[i] = Math.min(1, (sum / (end - start)) / 190); // 190 for vivid response
  }
  return out;
}

/* ── Particle factory ────────────────────────────────────────────── */
function makeParticles(count, W, H) {
  const rand = lcg(77331);
  return Array.from({ length: count }, () => {
    const bi   = Math.floor(rand() * BANDS.length);
    const band = BANDS[bi];
    const [yMin, yMax] = band.yZone;
    const [sMin, sMax] = band.sizeR;
    return {
      x:       rand() * W,
      y:       (yMin + rand() * (yMax - yMin)) * H,
      vx:      (rand() - 0.5) * 0.28,
      bandIdx: bi,
      binIdx:  band.range[0] + Math.floor(rand() * (band.range[1] - band.range[0] + 1)),
      size:    sMin + rand() * (sMax - sMin),
      opacity: 0.06 + rand() * 0.19,
      phase:   rand() * Math.PI * 2,
      speed:   band.speed * (0.6 + rand() * 0.8),
    };
  });
}

/* ── Mic SVG icon (inline — no extra import) ─────────────────────── */
const MicIcon = ({ size = 10 }) => (
  <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 10 13" fill="none" aria-hidden="true">
    <rect x="3" y="0.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1 7C1 9.20914 2.79086 11 5 11C7.20914 11 9 9.20914 9 7"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="11" x2="5" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* ── Main component ──────────────────────────────────────────────── */
const OracleField = ({ currentSection, isMobile }) => {
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const tRef         = useRef(0);
  const ptclRef      = useRef([]);
  const secRef       = useRef(currentSection);
  secRef.current     = currentSection;

  /* ── Voice Mode state + refs ── */
  const [voiceMode,   setVoiceMode]   = useState(false);
  const [micDenied,   setMicDenied]   = useState(false);
  const voiceModeRef  = useRef(false);
  const audioCtxRef   = useRef(null);
  const analyserRef   = useRef(null);
  const streamRef     = useRef(null);
  const realFftRef    = useRef(null); // Uint8Array — populated when voice mode active

  /* Keep ref in sync with state so draw loop can read without re-running effect */
  voiceModeRef.current = voiceMode;

  /* Skip canvas entirely when user prefers reduced motion */
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Voice Mode activation / deactivation ── */
  const handleVoiceToggle = async () => {
    if (voiceMode) {
      /* Turn OFF — clean up audio resources */
      analyserRef.current  = null;
      realFftRef.current   = null;
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current    = null;
      if (audioCtxRef.current?.state !== 'closed') {
        audioCtxRef.current?.close().catch(() => {});
      }
      audioCtxRef.current  = null;
      setVoiceMode(false);
      return;
    }

    /* Turn ON */
    setMicDenied(false);
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicDenied(true);
      return;
    }
    try {
      const stream  = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) { stream.getTracks().forEach(t => t.stop()); return; }
      const ctx      = new AudioCtx();
      const source   = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize      = 256; // → 128 frequency bins
      analyser.smoothingTimeConstant = 0.80;
      source.connect(analyser);
      streamRef.current    = stream;
      audioCtxRef.current  = ctx;
      analyserRef.current  = analyser;
      realFftRef.current   = new Uint8Array(analyser.frequencyBinCount);
      setVoiceMode(true);
    } catch {
      setMicDenied(true);
    }
  };

  /* ── Cleanup voice resources on unmount ── */
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
      if (audioCtxRef.current?.state !== 'closed') {
        audioCtxRef.current?.close().catch(() => {});
      }
    };
  }, []);

  /* ── Canvas draw loop ── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx   = canvas.getContext('2d');
    const count = isMobile ? 50 : 165;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      ptclRef.current = makeParticles(count, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* ── Mobile: throttle to ~30fps to save GPU ── */
    let lastFrame = 0;
    const FPS_TARGET = isMobile ? 30 : 60;
    const MS_PER_FRAME = 1000 / FPS_TARGET;

    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw);
      if (now - lastFrame < MS_PER_FRAME) return;
      lastFrame = now;

      tRef.current += isMobile ? 0.010 : 0.007;
      const t   = tRef.current;
      const W   = canvas.width;
      const H   = canvas.height;

      /* ── FFT source: real microphone or simulation ── */
      let fft;
      if (voiceModeRef.current && analyserRef.current && realFftRef.current) {
        analyserRef.current.getByteFrequencyData(realFftRef.current);
        fft = mapRealFFT(realFftRef.current);
      } else {
        fft = simulateFFT(t);
      }

      const isStudio = secRef.current === 'services';

      ctx.clearRect(0, 0, W, H);

      for (const p of ptclRef.current) {
        const band     = BANDS[p.bandIdx];
        const bv       = Math.min(1, fft[p.binIdx]);
        const [r, g, b] = band.color;
        const [yMin, yMax] = band.yZone;

        /* Drift in y-zone, driven by band value */
        const yCenter = (yMin + yMax) * 0.5 * H;
        const yRange  = (yMax - yMin) * H * 0.28;
        p.x += p.vx * (0.45 + bv * 0.9);
        p.y += (yCenter + Math.sin(t * p.speed + p.phase) * yRange * bv - p.y) * 0.005;
        if (p.x < -6)    p.x = W + 6;
        if (p.x > W + 6) p.x = -6;

        const alpha = Math.min(0.88, p.opacity * (0.28 + bv * 0.72));
        const sz    = Math.max(0.4, p.size * (0.62 + bv * 0.78));

        /* Particle core */
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
        ctx.fill();

        /* Glow halo — desktop only, for larger particles at high energy */
        if (!isMobile && p.size > 2.5 && bv > 0.42) {
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 3.5);
          gr.addColorStop(0, `rgba(${r},${g},${b},${(alpha * 0.20).toFixed(2)})`);
          gr.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }
      }

      /* ── Studio EQ bars overlay ── */
      if (isStudio) {
        const bars   = 10;
        const gutter = W * 0.22;
        const barW   = (W - gutter * 2) / (bars * 1.65);
        const maxH   = H * 0.26;

        for (let i = 0; i < bars; i++) {
          const bv = Math.min(1, fft[Math.floor(i * 16 / bars)]);
          const bH = bv * maxH;
          const x  = gutter + i * (barW * 1.65);
          const y  = H - bH;

          const gr = ctx.createLinearGradient(x, y, x, H);
          gr.addColorStop(0,    `rgba(168,85,247,${(bv * 0.52).toFixed(2)})`);
          gr.addColorStop(0.45, `rgba(6,182,212,${(bv * 0.34).toFixed(2)})`);
          gr.addColorStop(1,    'rgba(168,85,247,0.03)');
          ctx.fillStyle = gr;
          ctx.fillRect(x, y, barW, bH);
        }
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  /* ── Voice mode button — rendered via portal to escape GlobalBackground ── */
  const VoiceButton = !isMobile && typeof document !== 'undefined' && ReactDOM.createPortal(
    <button
      onClick={handleVoiceToggle}
      title={voiceMode ? 'Disable Voice Mode' : 'Activate Voice Mode — microphone required'}
      aria-label={voiceMode ? 'Disable Oracle Voice Mode' : 'Activate Oracle Voice Mode'}
      style={{
        position:       'fixed',
        bottom:         '5.5rem',
        right:          '1.25rem',
        zIndex:         50,
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '5px',
        padding:        '5px 10px 5px 8px',
        borderRadius:   '999px',
        border:         `1px solid ${voiceMode ? 'rgba(168,85,247,0.55)' : 'rgba(255,255,255,0.09)'}`,
        background:     voiceMode ? 'rgba(168,85,247,0.10)' : 'rgba(5,5,8,0.55)',
        backdropFilter: 'blur(10px)',
        color:          voiceMode ? 'rgba(168,85,247,0.9)' : micDenied ? 'rgba(239,68,68,0.7)' : 'rgba(130,130,140,0.7)',
        fontSize:       '8px',
        fontWeight:     700,
        letterSpacing:  '0.14em',
        textTransform:  'uppercase',
        cursor:         'pointer',
        transition:     'all 0.3s ease',
        pointerEvents:  'auto',
        userSelect:     'none',
      }}
    >
      <MicIcon size={9} />
      <span>{micDenied ? 'DENIED' : voiceMode ? 'LIVE' : 'MIC'}</span>
      {voiceMode && (
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: '#a855f7',
          boxShadow: '0 0 6px rgba(168,85,247,0.8)',
          animation: 'pulse 1.2s cubic-bezier(0.4,0,0.6,1) infinite',
        }} />
      )}
    </button>,
    document.body
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'screen',
          opacity: isMobile ? 0.45 : 0.62,
          pointerEvents: 'none',
          willChange: 'contents',
        }}
      />
      {VoiceButton}
    </>
  );
};

export default OracleField;
