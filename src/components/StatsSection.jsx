/**
 * StatsSection — Concept 13: FREQUENCY MAP
 *
 * Replaces the counter grid with a canvas-based signal-map visualization.
 * Four animated pulse nodes represent DCB's key metrics and market presence.
 *
 * Canvas layer:
 *  • Subtle grid background
 *  • Dashed cross-node signal lines (animated alpha)
 *  • 4 pulsing concentric-ring sources (RINGS per node, offset phases)
 *  • Central glow dot per node
 *
 * HTML overlay (z-10):
 *  • Stat value + label + sub-label at each node position
 *  • Framer Motion entrance animation
 */
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import TRANSLATIONS from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── Signal-node definitions (x/y in 0..1 canvas-relative units) ────────── */
const NODES = [
  { x: 0.22, y: 0.30, rgb: '139,92,246',  color: '#8b5cf6' }, /* Studio  — purple */
  { x: 0.78, y: 0.25, rgb: '6,182,212',   color: '#06b6d4' }, /* Visuals — cyan   */
  { x: 0.20, y: 0.72, rgb: '163,230,53',  color: '#a3e635' }, /* Agency  — lime   */
  { x: 0.80, y: 0.72, rgb: '163,230,53',  color: '#a3e635' }, /* Intl    — lime   */
];

const RINGS      = 5;
const PERIOD_MS  = 2600; /* ms per full ring expansion cycle */

/* ── Canvas ─────────────────────────────────────────────────────────────── */
const FrequencyCanvas = ({ active }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* Responsive sizing */
    const resize = () => {
      canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth;
      canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now) => {
      if (!activeRef.current) return; /* stop RAF when section is off-screen */
      rafRef.current = requestAnimationFrame(draw);
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) return;

      ctx.clearRect(0, 0, W, H);

      /* Dark fill */
      ctx.fillStyle = '#06060b';
      ctx.fillRect(0, 0, W, H);

      /* Grid lines */
      ctx.strokeStyle = 'rgba(255,255,255,0.022)';
      ctx.lineWidth   = 1;
      const COLS = 20;
      const ROWS = 10;
      for (let c = 0; c <= COLS; c++) {
        const x = (c / COLS) * W;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let r = 0; r <= ROWS; r++) {
        const y = (r / ROWS) * H;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      /* Cross-node signal lines */
      ctx.setLineDash([3, 7]);
      ctx.lineWidth = 0.8;
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const a = NODES[i];
          const b = NODES[j];
          const alpha = 0.04 + Math.abs(Math.sin(now * 0.00028 + i + j * 0.73)) * 0.055;
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x * W, a.y * H);
          ctx.lineTo(b.x * W, b.y * H);
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);

      /* MAX ring radius — responsive */
      const MAX_R = Math.min(W, H) * 0.42;

      /* Pulse rings + node dots */
      NODES.forEach((n, i) => {
        const nx = n.x * W;
        const ny = n.y * H;

        /* Concentric expanding rings */
        for (let r = 0; r < RINGS; r++) {
          const phase  = ((now / PERIOD_MS) + (r / RINGS) + i * 0.18) % 1;
          const radius = phase * MAX_R;
          const alpha  = (1 - phase) * 0.24;
          ctx.beginPath();
          ctx.arc(nx, ny, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${n.rgb},${alpha.toFixed(3)})`;
          ctx.lineWidth   = 1.1;
          ctx.stroke();
        }

        /* Inner soft glow */
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, 22);
        grd.addColorStop(0, `rgba(${n.rgb},0.40)`);
        grd.addColorStop(1, `rgba(${n.rgb},0)`);
        ctx.beginPath();
        ctx.arc(nx, ny, 22, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* Core dot */
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });
    };

    if (active) rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
};

/* ── Section ─────────────────────────────────────────────────────────────── */
const StatsSection = ({ lang }) => {
  const t = TRANSLATIONS[lang].stats;
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: '#06060b' }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-10 transition-all duration-700"
          style={{
            opacity:   isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] rounded-full px-5 py-2 mb-4 backdrop-blur-md">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
              {t.overline}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm text-neutral-500 mt-3 max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        {/* ── Frequency Map ── */}
        <div
          className="relative rounded-2xl border border-white/[0.07] overflow-hidden"
          style={{ height: 300 }}
        >
          <FrequencyCanvas active={isVisible} />

          {/* Stat labels — positioned at each node */}
          {t.items.map((item, i) => {
            const node = NODES[i];
            /* Clamp to keep labels inside on small containers */
            const leftPct = Math.max(8, Math.min(88, node.x * 100));
            const topPct  = Math.max(8, Math.min(88, node.y * 100));

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position:      'absolute',
                  left:          `${leftPct}%`,
                  top:           `${topPct}%`,
                  transform:     'translate(-50%, -50%)',
                  textAlign:     'center',
                  pointerEvents: 'none',
                  zIndex:        10,
                  /* Avoid overlapping the core dot */
                  paddingTop:    14,
                }}
              >
                {/* Value */}
                <div
                  className="font-black tabular-nums leading-none"
                  style={{
                    fontSize:    'clamp(1.1rem, 3vw, 1.75rem)',
                    color:        node.color,
                    textShadow:  `0 0 22px rgba(${node.rgb},0.55)`,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.number}{item.suffix}
                </div>
                {/* Label */}
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mt-1">
                  {item.label}
                </div>
                {/* Sub */}
                <div className="text-[10px] text-neutral-600 mt-0.5">
                  {item.sub}
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

export default StatsSection;
