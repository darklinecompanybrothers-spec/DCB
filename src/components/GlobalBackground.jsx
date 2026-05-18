/**
 * GlobalBackground.jsx — Phase 5.2 : Atmosphère Dynamique au Scroll
 *
 * Props reçues depuis App.jsx :
 *  • currentSection  : 'hero' | 'services' | 'showcase' | 'pricing' | 'portfolio' | 'contact'
 *  • scrollVelocity  : number (px/frame, positif = scroll vers le bas)
 *
 * Composition :
 *  1. Champ stellaire — 3 couches CSS box-shadow, vitesse légèrement accélérée au scroll
 *  2. Astres sombres  — 3 sphères éclipse avec drift lent
 *  3. Orbes ambiantes — 2 grandes taches de lumière floues qui transitent de couleur
 *                       selon la section active (Framer Motion animate)
 *  4. Grille fine + noise + vignette — conservés
 */

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import OracleField from './OracleField';
import useDeviceTier from '../hooks/useDeviceTier';

/* ─────────────────────────────────────────────────────────────────────────────
   PALETTES D'ORBES PAR SECTION
   Chaque entrée = { orbe gauche, orbe droite }
   orbe = { r, g, b, opacity, x, y, size }
───────────────────────────────────────────────────────────────────────────── */
const SECTION_AURAS = {
  hero: {
    left:  { r: 138, g: 43,  b: 226, op: 0.5, x: '-18%', y: '-12%', size: 900 },
    right: { r: 80,  g: 0,   b: 180, op: 0.5, x: '60%',  y: '-8%',  size: 700 },
  },
  services: {
    left:  { r: 0,   g: 180, b: 240, op: 0.5, x: '-10%', y: '10%',  size: 850 },
    right: { r: 30,  g: 80,  b: 200, op: 0.5, x: '55%',  y: '-5%',  size: 750 },
  },
  showcase: {
    left:  { r: 10,  g: 185, b: 129, op: 0.5, x: '-15%', y: '20%',  size: 900 },
    right: { r: 200, g: 0,   b: 200, op: 0.5, x: '58%',  y: '5%',   size: 800 },
  },
  pricing: {
    left:  { r: 124, g: 58,  b: 237, op: 0.5, x: '-8%',  y: '15%',  size: 800 },
    right: { r: 56,  g: 189, b: 248, op: 0.5, x: '62%',  y: '10%',  size: 700 },
  },
  portfolio: {
    left:  { r: 200, g: 20,  b: 100, op: 0.5, x: '-20%', y: '5%',   size: 950 },
    right: { r: 0,   g: 140, b: 180, op: 0.5, x: '55%',  y: '-10%', size: 700 },
  },
  contact: {
    left:  { r: 138, g: 43,  b: 226, op: 0.5, x: '-12%', y: '25%',  size: 800 },
    right: { r: 60,  g: 20,  b: 120, op: 0.5, x: '60%',  y: '20%',  size: 700 },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   GÉNÉRATEUR D'ÉTOILES (seed déterministe)
───────────────────────────────────────────────────────────────────────────── */
function generateStars(count, range, minOp, maxOp) {
  const shadows = [];
  let s = 42;
  const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
  for (let i = 0; i < count; i++) {
    const x   = Math.floor(rand() * range);
    const y   = Math.floor(rand() * range);
    const op  = (minOp + rand() * (maxOp - minOp)).toFixed(2);
    const col = rand() > 0.82 ? `rgba(160,240,255,${op})` : `rgba(220,230,255,${op})`;
    shadows.push(`${x}px ${y}px 0 0 ${col}`);
  }
  return shadows.join(', ');
}

/* ─────────────────────────────────────────────────────────────────────────────
   KEYFRAMES CSS — starDrift + accélération dynamique via CSS var
───────────────────────────────────────────────────────────────────────────── */
const KEYFRAMES_CSS = `
  @keyframes starDrift1 {
    from { transform: translate3d(0, 0,       0); }
    to   { transform: translate3d(0, -2000px, 0); }
  }
  @keyframes starDrift2 {
    from { transform: translate3d(0, 0,       0); }
    to   { transform: translate3d(0, -2000px, 0); }
  }
  @keyframes starDrift3 {
    from { transform: translate3d(0, 0,       0); }
    to   { transform: translate3d(0, -2000px, 0); }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   ORBE AMBIANTE — div animée Framer Motion
   Reçoit les valeurs cibles et transite en douceur (4s ease)
───────────────────────────────────────────────────────────────────────────── */
/* Position via style (CSS, not animated) — only compositor-safe properties
   (opacity, scale, background) go through Framer Motion animate to avoid
   layout-triggering reflows on every animation frame. */
const AmbientOrb = ({ target, delay = 0, blurPx = 160 }) => (
  <motion.div
    aria-hidden="true"
    animate={{
      opacity:    target.op,
      scale:      target.size / 1000,
      background: `radial-gradient(circle, rgba(${target.r},${target.g},${target.b},0.85) 0%, transparent 70%)`,
    }}
    transition={{
      duration: 2.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
      opacity: { duration: 2.0 },
    }}
    style={{
      position:      'absolute',
      left:          target.x,
      top:           target.y,
      width:         1000,
      height:        1000,
      borderRadius:  '50%',
      filter:        `blur(${blurPx}px)`,
      pointerEvents: 'none',
      willChange:    'transform, opacity',
    }}
  />
);

/* ─────────────────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL
───────────────────────────────────────────────────────────────────────────── */
const GlobalBackground = ({ currentSection = 'hero', scrollVelocity = 0 }) => {

  /* ── Device tier — disables OracleField on low-end devices ── */
  const { isLowEnd, isMediumTier } = useDeviceTier();

  if (isLowEnd || isMediumTier) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(92, 43, 140, 0.18), transparent 48%), #050508',
        }}
      />
    );
  }

  /* ── Mobile detection — halves star count + reduces blur on small screens ── */
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);

  /* Étoiles — recalculées si mobile/desktop change */
  const stars1 = useMemo(() => generateStars(isMobile ? 40 : isMediumTier ? 90 : 220, 2000, 0.06, 0.22), [isMobile, isMediumTier]);
  const stars2 = useMemo(() => generateStars(isMobile ? 20 : isMediumTier ? 35 : 90, 2000, 0.10, 0.30), [isMobile, isMediumTier]);
  const stars3 = useMemo(() => generateStars(isMobile ?  5 : isMediumTier ? 12 : 35, 2000, 0.18, 0.40), [isMobile, isMediumTier]);

  /* Auras cibles pour la section active */
  const aura    = SECTION_AURAS[currentSection] ?? SECTION_AURAS.hero;
  const orbBlur = isMobile ? 30 : isMediumTier ? 60 : 110;

  /* ── Parallax vitesse étoiles selon scrollVelocity ──
     On modifie la CSS custom property --drift-speed sur le container.
     Plus le scroll est rapide, plus les étoiles accélèrent (clamp 4s–90s).
     velocity est en px/frame → on lisse sur 400ms */
  const containerRef = useRef(null);
  const smoothVel    = useMotionValue(0);

  useEffect(() => {
    const ctrl = animate(smoothVel, Math.min(Math.abs(scrollVelocity), 18), {
      duration: 0.4, ease: 'easeOut',
    });
    return () => ctrl.stop();
  }, [scrollVelocity]);

  useEffect(() => {
    return smoothVel.on('change', (v) => {
      if (!containerRef.current) return;
      /* Plus v est grand, plus la durée est courte = étoiles rapides */
      const multiplier = isMediumTier ? 1.4 : 1;
      const d1 = (Math.max(18, 90 - v * 2.2) * multiplier).toFixed(1);
      const d2 = (Math.max(14, 55 - v * 1.4) * multiplier).toFixed(1);
      const d3 = (Math.max(10, 30 - v * 0.7) * multiplier).toFixed(1);
      containerRef.current.style.setProperty('--sd1', `${d1}s`);
      containerRef.current.style.setProperty('--sd2', `${d2}s`);
      containerRef.current.style.setProperty('--sd3', `${d3}s`);
    });
  }, [smoothVel, isMediumTier]);

  return (
    <>
      <style>{KEYFRAMES_CSS + `
        .star-layer-1 { animation: starDrift1 var(--sd1, 90s) linear infinite !important; }
        .star-layer-2 { animation: starDrift2 var(--sd2, 55s) linear infinite !important; }
        .star-layer-3 { animation: starDrift3 var(--sd3, 30s) linear infinite !important; }
      `}</style>

      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          background: '#050508',
          /* CSS vars initiales */
          '--sd1': '90s',
          '--sd2': '55s',
          '--sd3': '30s',
        }}
      >

        {/* ── ORBES AMBIANTES — couleur selon section active ── */}
        <AmbientOrb target={aura.left}  delay={0}   blurPx={orbBlur} />
        <AmbientOrb target={aura.right} delay={0.3} blurPx={orbBlur} />

        {/* ── CHAMP STELLAIRE — 3 couches ── */}

        {/* Couche 1 — petites (90s base) */}
        <div className="star-layer-1" style={{ position:'absolute', top:0, left:0, width:'1px', height:'1px', boxShadow:stars1, willChange:'transform' }} />
        <div className="star-layer-1" style={{ position:'absolute', top:'2000px', left:0, width:'1px', height:'1px', boxShadow:stars1, willChange:'transform' }} />

        {/* Couche 2 — moyennes (55s base) */}
        <div className="star-layer-2" style={{ position:'absolute', top:0, left:0, width:'2px', height:'2px', boxShadow:stars2, willChange:'transform' }} />
        <div className="star-layer-2" style={{ position:'absolute', top:'2000px', left:0, width:'2px', height:'2px', boxShadow:stars2, willChange:'transform' }} />

        {/* Couche 3 — grandes (30s base) */}
        <div className="star-layer-3" style={{ position:'absolute', top:0, left:0, width:'2px', height:'2px', borderRadius:'50%', boxShadow:stars3, willChange:'transform' }} />
        <div className="star-layer-3" style={{ position:'absolute', top:'2000px', left:0, width:'2px', height:'2px', borderRadius:'50%', boxShadow:stars3, willChange:'transform' }} />

        {/* ── ASTRES SOMBRES — desktop only (too GPU-heavy on mobile) ── */}
        {!isMobile && !isMediumTier && (
          <>
            {/* Astre 1 — Violet, haut-gauche */}
            <motion.div
              animate={{ x:['-5%','2%','-3%','0%','-5%'], y:['-4%','1%','3%','-1%','-4%'] }}
              transition={{ duration:80, repeat:Infinity, ease:'easeInOut', times:[0,0.25,0.5,0.75,1] }}
              style={{
                position:'absolute', width:900, height:900, top:'-380px', left:'-340px',
                borderRadius:'50%', background:'#050508',
                boxShadow:`
                  inset -60px -60px 120px -40px rgba(138,43,226,0.18),
                  inset 30px 30px 80px -50px rgba(20,10,40,0.8),
                  0 0 140px 40px rgba(138,43,226,0.06),
                  0 0 280px 80px rgba(80,0,160,0.04)
                `,
                willChange:'transform',
              }}
            />

            {/* Astre 2 — Cyan, haut-droit */}
            <motion.div
              animate={{ x:['3%','-1%','4%','1%','3%'], y:['-5%','0%','-2%','2%','-5%'] }}
              transition={{ duration:100, repeat:Infinity, ease:'easeInOut', delay:12, times:[0,0.25,0.5,0.75,1] }}
              style={{
                position:'absolute', width:700, height:700, top:'-260px', right:'-280px',
                borderRadius:'50%', background:'#050508',
                boxShadow:`
                  inset 50px -50px 100px -30px rgba(0,200,255,0.14),
                  inset -20px 20px 60px -40px rgba(0,10,20,0.9),
                  0 0 120px 30px rgba(0,200,255,0.05),
                  0 0 240px 60px rgba(0,100,160,0.03)
                `,
                willChange:'transform',
              }}
            />

            {/* Astre 3 — Violet pâle, bas-centre */}
            <motion.div
              animate={{ x:['-2%','3%','0%','-3%','-2%'], y:['5%','1%','6%','3%','5%'] }}
              transition={{ duration:120, repeat:Infinity, ease:'easeInOut', delay:30, times:[0,0.25,0.5,0.75,1] }}
              style={{
                position:'absolute', width:1100, height:1100, bottom:'-600px', left:'20%',
                borderRadius:'50%', background:'#050508',
                boxShadow:`
                  inset 0px 60px 140px -60px rgba(160,60,255,0.10),
                  inset 0px -30px 80px -50px rgba(5,3,10,0.95),
                  0 0 160px 50px rgba(100,20,200,0.04),
                  0 0 320px 100px rgba(60,0,120,0.03)
                `,
                willChange:'transform',
              }}
            />
          </>
        )}

        {/* ── THE ORACLE — Sound-reactive particle field (disabled on low-end devices) ── */}
        {!isLowEnd && !isMediumTier && <OracleField currentSection={currentSection} isMobile={isMobile} />}

        {/* ── GRILLE FINE ── */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)',
          backgroundSize:'52px 52px',
          maskImage:'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.4) 0%, transparent 70%)',
          WebkitMaskImage:'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.4) 0%, transparent 70%)',
        }} />

        {/* ── NOISE TEXTURE ── */}
        <div style={{
          position:'absolute', inset:0, opacity:0.025,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* ── VIGNETTE RADIALE ── */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(3,3,5,0.55) 75%, rgba(2,2,4,0.82) 100%)',
        }} />

      </div>
    </>
  );
};

export default GlobalBackground;
