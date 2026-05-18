import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';
import useDeviceTier from '../hooks/useDeviceTier';

/**
 * CustomCursor — Contextual 3-layer custom cursor (desktop only).
 *
 * Layers:
 *  1. Echo ring   — slowest spring, faintest, largest  → depth
 *  2. Main ring   — medium spring, reactive
 *  3. Inner dot   — instant, hides on hover
 *
 * Standard modes (driven by data-cursor attribute or element type):
 *  default  → purple ring + cyan dot
 *  link     → cyan ring, no dot, scales up
 *  view     → ring + "VIEW" label    (data-cursor="view")
 *  play     → ring + "▶" label       (data-cursor="play")
 *  drag     → ring + "DRAG" label    (data-cursor="drag")
 *  cta      → lime ring, no label    (data-cursor="cta")
 *
 * Sector Morph modes (Concept 02):
 *  studio   → 5 EQ bars pulsing      (data-cursor="studio")
 *  visuals  → camera aperture iris   (data-cursor="visuals")
 *  agency   → terminal >_ blink      (data-cursor="agency")
 */

const MODE_CONFIG = {
  default: { ring: 'rgba(168,85,247,0.55)',  fill: 'transparent',           scale: 1.0, label: null,   custom: null       },
  link:    { ring: 'rgba(6,182,212,0.85)',   fill: 'rgba(168,85,247,0.10)', scale: 1.8, label: null,   custom: null       },
  cta:     { ring: 'rgba(163,230,53,0.85)',  fill: 'rgba(163,230,53,0.10)', scale: 1.9, label: null,   custom: null       },
  view:    { ring: 'rgba(255,255,255,0.55)', fill: 'rgba(255,255,255,0.06)',scale: 2.2, label: 'VIEW', custom: null       },
  play:    { ring: 'rgba(163,230,53,0.85)',  fill: 'rgba(163,230,53,0.08)', scale: 2.2, label: '▶',   custom: null       },
  drag:    { ring: 'rgba(6,182,212,0.75)',   fill: 'rgba(6,182,212,0.08)',  scale: 2.4, label: 'DRAG', custom: null       },
  /* ── Sector Morph ── */
  studio:  { ring: 'rgba(168,85,247,0.22)',  fill: 'rgba(168,85,247,0.04)', scale: 3.6, label: null,   custom: 'eq-bars'  },
  visuals: { ring: 'rgba(6,182,212,0.22)',   fill: 'rgba(6,182,212,0.04)',  scale: 3.6, label: null,   custom: 'iris'     },
  agency:  { ring: 'rgba(163,230,53,0.22)',  fill: 'rgba(163,230,53,0.04)', scale: 3.6, label: null,   custom: 'terminal' },
};

/* ── Sector Morph inner components ──────────────────────────────── */

const EQBars = () => (
  <div
    aria-hidden="true"
    style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', width: '26px', height: '18px' }}
  >
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        style={{ width: '3.5px', borderRadius: '2px 2px 1px 1px', background: '#a855f7', flexShrink: 0 }}
        animate={{ height: [3, 16, 6, 13, 3] }}
        transition={{ duration: 0.52 + i * 0.06, delay: i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

const IrisCursor = () => (
  <motion.svg width="26" height="26" viewBox="-13 -13 26 26" aria-hidden="true">
    {/* Outer ring */}
    <motion.circle
      cx="0" cy="0" r="10"
      fill="none" stroke="rgba(6,182,212,0.75)" strokeWidth="1.5"
      animate={{ r: [8.5, 11, 8.5] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* 6 aperture blades */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const a = (i * Math.PI) / 3;
      return (
        <motion.line
          key={i}
          x1={+(Math.cos(a) * 3.2).toFixed(2)} y1={+(Math.sin(a) * 3.2).toFixed(2)}
          x2={+(Math.cos(a) * 10).toFixed(2)}  y2={+(Math.sin(a) * 10).toFixed(2)}
          stroke="rgba(6,182,212,0.55)" strokeWidth="1"
          animate={{ opacity: [0.2, 0.85, 0.2] }}
          transition={{ duration: 1.7, delay: i * 0.18, repeat: Infinity }}
        />
      );
    })}
    {/* Center dot */}
    <motion.circle
      cx="0" cy="0" r="2"
      fill="rgba(6,182,212,0.9)"
      animate={{ r: [1.4, 3.2, 1.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </motion.svg>
);

const TerminalCursor = () => (
  <div
    aria-hidden="true"
    style={{ display: 'flex', alignItems: 'center', gap: '1px' }}
  >
    <span style={{ color: '#a3e635', fontFamily: 'monospace', fontSize: '10px', fontWeight: 900, lineHeight: 1 }}>
      &gt;
    </span>
    <motion.span
      style={{ color: '#a3e635', fontFamily: 'monospace', fontSize: '10px', fontWeight: 900, lineHeight: 1 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.52, repeat: Infinity, ease: 'steps(1)' }}
    >
      _
    </motion.span>
  </div>
);

/* ── Main component ──────────────────────────────────────────────── */

const CustomCursor = ({ currentSection }) => {
  const { isMobile, isMediumTier, isLowEnd } = useDeviceTier();
  const cursorDisabled = isMobile || isMediumTier || isLowEnd;
  const [mode,       setMode]       = useState('default');
  const [isClicking, setIsClicking] = useState(false);
  const [rippleKey,  setRippleKey]  = useState(0);
  const isVisibleRef = useRef(false);
  const [isVisible,  setIsVisible]  = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringConfig  = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringXSpring = useSpring(cursorX, ringConfig);
  const ringYSpring = useSpring(cursorY, ringConfig);

  const echoConfig  = { damping: 42, stiffness: 110, mass: 1.4 };
  const echoXSpring = useSpring(cursorX, echoConfig);
  const echoYSpring = useSpring(cursorY, echoConfig);

  /* ── Velocity tilt / stretch ── */
  const velX  = useVelocity(cursorX);
  const velY  = useVelocity(cursorY);
  const angle = useTransform([velX, velY], ([vx, vy]) => Math.atan2(vy, vx) * 180 / Math.PI);
  const speed = useTransform([velX, velY], ([vx, vy]) => Math.sqrt(vx * vx + vy * vy));
  const stretchX = useTransform(speed, [0, 800], [1, 1.55]);
  const stretchY = useTransform(speed, [0, 800], [1, 0.65]);
  const springAngle    = useSpring(angle,    { stiffness: 90,  damping: 18 });
  const springStretchX = useSpring(stretchX, { stiffness: 160, damping: 22 });
  const springStretchY = useSpring(stretchY, { stiffness: 160, damping: 22 });

  /* ── Section-change ripple ring ── */
  useEffect(() => {
    if (!currentSection) return;
    setRippleKey(k => k + 1);
  }, [currentSection]);

  useEffect(() => {
    if (cursorDisabled) {
      document.documentElement.classList.remove('custom-cursor-enabled');
      return;
    }

    document.documentElement.classList.add('custom-cursor-enabled');
    return () => document.documentElement.classList.remove('custom-cursor-enabled');
  }, [cursorDisabled]);

  useEffect(() => {
    if (cursorDisabled) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) { isVisibleRef.current = true; setIsVisible(true); }
    };

    const handleOver = (e) => {
      const el = e.target;
      const dataCursor = el.closest('[data-cursor]')?.dataset.cursor;
      if (dataCursor && MODE_CONFIG[dataCursor]) {
        setMode(dataCursor);
      } else if (el.closest('button, a, input, textarea, [role="button"], .cursor-pointer')) {
        const btn = el.closest('button, a, [role="button"]');
        if (btn?.className?.includes?.('lime') || btn?.className?.includes?.('cta')) {
          setMode('cta');
        } else {
          setMode('link');
        }
      } else {
        setMode('default');
      }
    };

    const onDown  = () => setIsClicking(true);
    const onUp    = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => { isVisibleRef.current = true; setIsVisible(true); };

    window.addEventListener('mousemove',    moveCursor, { passive: true });
    window.addEventListener('mouseover',    handleOver);
    window.addEventListener('mousedown',    onDown);
    window.addEventListener('mouseup',      onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove',    moveCursor);
      window.removeEventListener('mouseover',    handleOver);
      window.removeEventListener('mousedown',    onDown);
      window.removeEventListener('mouseup',      onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorX, cursorY, cursorDisabled]);

  if (cursorDisabled) return null;

  const cfg      = MODE_CONFIG[mode] ?? MODE_CONFIG.default;
  const isHovered = mode !== 'default';

  return (
    <>
      {/* ── Section-change ripple (pulse expansion on section transition) ── */}
      <AnimatePresence>
        {rippleKey > 0 && (
          <motion.div
            key={rippleKey}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9996]"
            style={{
              x: ringXSpring, y: ringYSpring,
              translateX: '-50%', translateY: '-50%',
              border: '1px solid rgba(168,85,247,0.55)',
            }}
            initial={{ width: 32, height: 32, opacity: 0.8 }}
            animate={{ width: 88, height: 88, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── Echo ring ── */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997]"
        style={{
          x: echoXSpring, y: echoYSpring,
          translateX: '-50%', translateY: '-50%',
          border: '1px solid rgba(138,43,226,0.18)',
          opacity: isVisible ? 0.55 : 0,
        }}
        animate={{ scale: isHovered ? 2.0 : isClicking ? 0.5 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Main ring — velocity tilt + stretch ── */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
        style={{
          x: ringXSpring, y: ringYSpring,
          translateX: '-50%', translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          rotate: springAngle,
          scaleX: springStretchX,
          scaleY: springStretchY,
        }}
        animate={{
          scale:           isClicking ? 0.65 : cfg.scale,
          backgroundColor: cfg.fill,
          borderColor:     cfg.ring,
          borderWidth:     '1px',
          borderStyle:     'solid',
        }}
        transition={{ duration: isClicking ? 0.1 : 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Contextual content (label or custom SVG) ── */}
        <AnimatePresence mode="wait">

          {/* Sector Morph: EQ Bars */}
          {cfg.custom === 'eq-bars' && (
            <motion.div
              key="eq-bars"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              <EQBars />
            </motion.div>
          )}

          {/* Sector Morph: Aperture Iris */}
          {cfg.custom === 'iris' && (
            <motion.div
              key="iris"
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1,   rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
              transition={{ duration: 0.22 }}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              <IrisCursor />
            </motion.div>
          )}

          {/* Sector Morph: Terminal */}
          {cfg.custom === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              <TerminalCursor />
            </motion.div>
          )}

          {/* Standard text label */}
          {cfg.label && !cfg.custom && (
            <motion.span
              key={cfg.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: cfg.label === '▶' ? '10px' : '7px',
                fontWeight: 900,
                letterSpacing: '0.06em',
                color: cfg.ring,
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {cfg.label}
            </motion.span>
          )}

        </AnimatePresence>
      </motion.div>

      {/* ── Inner dot ── */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: cursorX, y: cursorY,
          translateX: '-50%', translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovered || isClicking ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
};

export default CustomCursor;
