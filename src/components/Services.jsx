/**
 * Services.jsx — Phase 3 : La Trinité
 *
 * CORRECTIONS v2 :
 *  • Bug lévitation corrigé : revealStyle et floatY séparés sur deux motion.div distincts
 *  • Background dynamique : crossfade image de fond selon la carte survolée (AnimatePresence)
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion';
import { Mic, Camera, Monitor, RotateCcw, ChevronRight } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import { useAudio } from '../context/SoundContext';
import Reveal from './Reveal';
import AnimatedServiceIcon from './AnimatedServiceIcon';

/* ─────────────────────────────────────────────────────────────────────────────
   BACKGROUND IMAGES — Unsplash high-quality placeholders
   Chaque clé correspond à l'index de la carte (0, 1, 2) + null pour défaut
───────────────────────────────────────────────────────────────────────────── */
const BG_IMAGES = {
  null: null, // fond par défaut : noir pur + noise (pas d'image)
  0: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&auto=format&fit=crop',
  // Studio d'enregistrement sombre — micro pro, console de mixage
  1: 'https://images.unsplash.com/photo-1606103836293-0a063ee20566?w=1600&q=80&auto=format&fit=crop',
  // Caméra de cinéma / plateau de tournage — RED camera
  2: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&auto=format&fit=crop',
  // Data / code / hologramme abstrait
};

/* ─────────────────────────────────────────────────────────────────────────────
   THÈMES MATÉRIAUX PRÉCIEUX
───────────────────────────────────────────────────────────────────────────── */
const THEMES = {
  gold: {
    frontBg:           'linear-gradient(145deg, #0d0a00 0%, #1a1000 40%, #0f0b00 100%)',
    backBg:            'linear-gradient(145deg, #0f0c00 0%, #1c1200 50%, #0d0a00 100%)',
    borderColor:       'rgba(212, 175, 55, 0.35)',
    borderColorActive: 'rgba(255, 215, 0, 0.55)',
    glow:              '0 0 60px rgba(212,175,55,0.20), 0 20px 80px rgba(0,0,0,0.6)',
    glowHover:         '0 0 80px rgba(255,215,0,0.30), 0 30px 80px rgba(0,0,0,0.6)',
    innerGlow:         'radial-gradient(ellipse at 30% 20%, rgba(255,200,50,0.12) 0%, transparent 60%)',
    cornerGlow:        'radial-gradient(circle at top right, rgba(255,215,0,0.18) 0%, transparent 55%)',
    iconColor:         '#F5C842',
    iconShadow:        '0 0 24px rgba(255,215,0,0.7), 0 0 48px rgba(255,215,0,0.3)',
    titleGradient:     'linear-gradient(135deg, #F5C842 0%, #FFE066 40%, #D4AF37 70%, #C8960C 100%)',
    pillBg:            'rgba(212,175,55,0.10)',
    pillBorder:        'rgba(212,175,55,0.25)',
    pillColor:         '#D4AF37',
    lineGradient:      'linear-gradient(90deg, rgba(212,175,55,0.8), rgba(255,215,0,0.4), transparent)',
    overline:          '#D4AF37',
  },
  diamond: {
    frontBg:           'linear-gradient(145deg, #00080f 0%, #000d16 40%, #000810 100%)',
    backBg:            'linear-gradient(145deg, #00070e 0%, #000c15 50%, #000810 100%)',
    borderColor:       'rgba(185, 230, 255, 0.28)',
    borderColorActive: 'rgba(220, 245, 255, 0.55)',
    glow:              '0 0 60px rgba(150,220,255,0.12), 0 20px 80px rgba(0,0,0,0.6)',
    glowHover:         '0 0 80px rgba(185,230,255,0.28), 0 30px 80px rgba(0,0,0,0.6)',
    innerGlow:         'radial-gradient(ellipse at 70% 20%, rgba(185,230,255,0.10) 0%, transparent 60%)',
    cornerGlow:        'radial-gradient(circle at top left, rgba(200,240,255,0.14) 0%, transparent 55%)',
    iconColor:         '#B9E6FF',
    iconShadow:        '0 0 24px rgba(185,230,255,0.8), 0 0 48px rgba(100,200,255,0.35)',
    titleGradient:     'linear-gradient(135deg, #E8F8FF 0%, #B9E6FF 35%, #9DD5F5 65%, #C8EDFF 100%)',
    pillBg:            'rgba(185,230,255,0.08)',
    pillBorder:        'rgba(185,230,255,0.22)',
    pillColor:         '#9DD5F5',
    lineGradient:      'linear-gradient(90deg, rgba(185,230,255,0.7), rgba(200,240,255,0.35), transparent)',
    overline:          '#9DD5F5',
  },
  platinum: {
    frontBg:           'linear-gradient(145deg, #080808 0%, #0e0e0e 40%, #080808 100%)',
    backBg:            'linear-gradient(145deg, #070707 0%, #0c0c0c 50%, #080808 100%)',
    borderColor:       'rgba(200, 200, 210, 0.28)',
    borderColorActive: 'rgba(230, 230, 240, 0.55)',
    glow:              '0 0 60px rgba(200,200,210,0.10), 0 20px 80px rgba(0,0,0,0.6)',
    glowHover:         '0 0 80px rgba(220,220,230,0.22), 0 30px 80px rgba(0,0,0,0.6)',
    innerGlow:         'radial-gradient(ellipse at 50% 10%, rgba(210,210,220,0.09) 0%, transparent 60%)',
    cornerGlow:        'radial-gradient(circle at bottom right, rgba(220,220,230,0.10) 0%, transparent 55%)',
    iconColor:         '#D4D4E0',
    iconShadow:        '0 0 24px rgba(210,210,220,0.7), 0 0 48px rgba(180,180,200,0.3)',
    titleGradient:     'linear-gradient(135deg, #F0F0F5 0%, #D4D4E0 35%, #B8B8C8 65%, #E0E0EC 100%)',
    pillBg:            'rgba(200,200,210,0.07)',
    pillBorder:        'rgba(200,200,210,0.20)',
    pillColor:         '#C0C0CC',
    lineGradient:      'linear-gradient(90deg, rgba(200,200,210,0.7), rgba(220,220,230,0.3), transparent)',
    overline:          '#B0B0C0',
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   SPARKLE PARTICLES
───────────────────────────────────────────────────────────────────────────── */
const Sparkle = ({ x, y, delay, theme }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      width: 3, height: 3,
      borderRadius: '50%',
      background: theme.iconColor,
      boxShadow: `0 0 6px ${theme.iconColor}, 0 0 12px ${theme.iconColor}`,
      pointerEvents: 'none',
    }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
    transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const SPARKLE_POSITIONS = [
  { x: 12, y: 18 }, { x: 88, y: 12 }, { x: 75, y: 82 },
  { x: 20, y: 75 }, { x: 55, y: 8  }, { x: 92, y: 55 },
  { x: 35, y: 90 }, { x: 8,  y: 48 },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICE CARD 3D
   Props :
     • revealStyle   — style d'apparition scroll (opacity + y) → motion.div EXTERNE
     • floatY        — MotionValue pour la lévitation → motion.div INTERNE séparé
     • onHoverChange — callback(bool) pour piloter le background parent
───────────────────────────────────────────────────────────────────────────── */
const ServiceCard3D = ({
  theme,
  icon,
  iconComponent,
  cursorMode,
  title,
  desc,
  tags,
  overlineLabel,
  exploreLabel,
  flipBackLabel,
  floatDelay = 0,
  revealStyle = {},
  onHoverChange,
}) => {
  const cardRef = useRef(null);
  const { playSwipe, playHover } = useAudio();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const floatY = useMotionValue(0);
  useEffect(() => {
    const ctrl = animate(floatY, [0, -12, 0], {
      duration: 5.5,
      delay: floatDelay,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return ctrl.stop;
  }, [floatY, floatDelay]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 24, mass: 0.9 };
  const rotX = useSpring(rawX, springConfig);
  const rotY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const apply = () => setIsCoarsePointer(mq.matches);
    apply();
    if (mq.addEventListener) {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  const flipDeg = isFlipped ? 180 : 0;
  const finalRotY = useTransform(rotY, (v) => v + flipDeg);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rawX.set(-dy * 14);
    rawY.set(dx * 14);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
    onHoverChange?.(false);
  }, [rawX, rawY, onHoverChange]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHoverChange?.(true);
    playSwipe();
  }, [onHoverChange, playSwipe]);

  const handleFlip = useCallback(() => {
    playSwipe();
    rawX.set(0);
    rawY.set(0);
    setIsFlipped((f) => !f);
  }, [playSwipe, rawX, rawY]);

  const t = THEMES[theme];
  const beamColor = theme === 'diamond' ? '#06b6d4' : '#8b5cf6';
  const beamOpacity = isHovered ? 1 : (theme === 'platinum' ? 0.08 : 0.2);
  const spinDuration = isHovered ? '2.4s' : '4s';
  const panelClass = 'relative h-full w-full bg-[#050508]/40 backdrop-blur-2xl rounded-2xl p-8 border border-white/[0.08] transition-colors duration-300 group-hover:border-white/20';

  return (
    <motion.div data-cursor={cursorMode} style={{ ...revealStyle, perspective: 1000, position: 'relative' }} className="w-full">
      <motion.div style={{ y: floatY }} className="w-full">
        <motion.div
          ref={cardRef}
          onMouseMove={isCoarsePointer ? undefined : handleMouseMove}
          onMouseLeave={isCoarsePointer ? undefined : handleMouseLeave}
          onMouseEnter={isCoarsePointer ? undefined : handleMouseEnter}
          onClick={handleFlip}
          style={{
            width: '100%',
            height: '420px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            rotateX: isCoarsePointer ? 0 : rotX,
            rotateY: isCoarsePointer ? flipDeg : finalRotY,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          transition={{ rotateY: { type: 'spring', stiffness: 80, damping: 18 } }}
          whileHover={isCoarsePointer ? undefined : { y: -10, scale: 1.01 }}
          whileTap={{ scale: 0.985 }}
          className="group [transform-style:preserve-3d]"
        >
          <div
            className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
            style={{
              borderRadius: 20,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              WebkitTransform: 'rotateY(0deg)',
              overflow: 'hidden',
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl p-[1px]">
              <motion.div
                aria-hidden="true"
                className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
                style={{
                  background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, ${beamColor} 100%)`,
                  opacity: beamOpacity,
                  animationDuration: spinDuration,
                }}
              />

              <div className={`${panelClass} flex flex-col items-center justify-center text-center`}>
                <p
                  style={{
                    position: 'absolute',
                    top: '1.75rem',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: t.overline,
                    fontFamily: "'Space Grotesk', sans-serif",
                    opacity: 0.72,
                  }}
                >
                  {overlineLabel}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  {iconComponent
                    ? <AnimatedServiceIcon icon={iconComponent} color={t.iconColor} size={84} iconSize={34} active={isHovered} />
                    : <div style={{ color: t.iconColor }}>{icon}</div>
                  }
                </div>

                <div style={{ width: 40, height: 1, background: t.lineGradient, marginBottom: '1.25rem', opacity: 0.8 }} />

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                    letterSpacing: '-0.025em',
                    background: t.titleGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.75rem',
                    textAlign: 'center',
                  }}
                >
                  {title}
                </h3>

                <motion.div
                  style={{ position: 'absolute', bottom: '1.75rem', display: 'flex', alignItems: 'center', gap: 6 }}
                  animate={{ opacity: isHovered ? 1 : 0.45, y: isHovered ? 0 : 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    style={{ width: 5, height: 5, borderRadius: '50%', background: t.iconColor }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: t.overline,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {exploreLabel}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{
              borderRadius: 20,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              WebkitTransform: 'rotateY(180deg)',
              overflow: 'hidden',
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl p-[1px]">
              <motion.div
                aria-hidden="true"
                className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
                style={{
                  background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, ${beamColor} 100%)`,
                  opacity: beamOpacity,
                  animationDuration: spinDuration,
                }}
              />

              <div className={`${panelClass} flex flex-col`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ color: t.iconColor, opacity: 0.9 }}>
                      {iconComponent
                        ? React.createElement(iconComponent, { size: 20, strokeWidth: 1.4 })
                        : React.cloneElement(icon, { size: 20 })
                      }
                    </div>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 800,
                        fontSize: 13,
                        letterSpacing: '-0.01em',
                        background: t.titleGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {title}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlip();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: t.overline,
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      playHover();
                      e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }}
                    aria-label="Fermer"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>

                <div style={{ width: '100%', height: 1, background: t.lineGradient, marginBottom: '1.25rem', opacity: 0.6 }} />

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13.5,
                    lineHeight: 1.75,
                    color: 'rgba(200,200,210,0.75)',
                    marginBottom: '1.5rem',
                    flexGrow: 0,
                  }}
                >
                  {desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 'auto' }}>
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '5px 12px',
                        borderRadius: 999,
                        background: t.pillBg,
                        border: `1px solid ${t.pillBorder}`,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: t.pillColor,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: t.iconColor,
                          flexShrink: 0,
                        }}
                      />
                      {tag}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: 6, opacity: 0.55 }}>
                  <ChevronRight size={12} style={{ color: t.overline }} />
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: t.overline,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {flipBackLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
const Services = ({ lang }) => {
  const t = TRANSLATIONS[lang]?.services || TRANSLATIONS.en.services;
  const { containerRef, getItemStyle, isVisible } = useStaggerReveal(3, 180);

  /* Index de la carte survolée : null = aucune */
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cards = [
    {
      theme:         'gold',
      icon:          <Mic size={52} strokeWidth={1.25} />,
      iconComponent: Mic,
      cursorMode:    'studio',
      title:         t.studio.title,
      desc:          t.studio.desc,
      tags:          ['Recording', 'Mixing', 'Mastering', 'Podcasts', 'Beat Lab'],
      overlineLabel: `01 — ${t.studio.title}`,
      exploreLabel:  t.exploreCta,
      flipBackLabel: t.flipBack,
      floatDelay:    0,
    },
    {
      theme:         'diamond',
      icon:          <Camera size={52} strokeWidth={1.25} />,
      iconComponent: Camera,
      cursorMode:    'visuals',
      title:         t.visuals.title,
      desc:          t.visuals.desc,
      tags:          ['Music Videos', 'Commercials', 'Photography', 'Podcast', 'Reels'],
      overlineLabel: `02 — ${t.visuals.title}`,
      exploreLabel:  t.exploreCta,
      flipBackLabel: t.flipBack,
      floatDelay:    0.9,
    },
    {
      theme:         'platinum',
      icon:          <Monitor size={52} strokeWidth={1.25} />,
      iconComponent: Monitor,
      cursorMode:    'agency',
      title:         t.agency.title,
      desc:          t.agency.desc,
      tags:          ['Web Design', 'SEO', 'Social Mgmt', 'Ads', 'Branding'],
      overlineLabel: `03 — ${t.agency.title}`,
      exploreLabel:  t.exploreCta,
      flipBackLabel: t.flipBack,
      floatDelay:    1.8,
    },
  ];

  return (
    <section id="services" style={{ position: 'relative', overflow: 'visible' }}>

      {/* ══════════════════════════════════════════════════
          BACKGROUND DYNAMIQUE — crossfade sur hover carte
      ══════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          zIndex: 0, pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Fond par défaut : très léger bruit + dégradé profond */}
        <AnimatePresence>
          {hoveredIndex === null && (
            <motion.div
              key="bg-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 30%, rgba(138,43,226,0.06) 0%, transparent 65%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Images de fond par carte survolée */}
        <AnimatePresence>
          {hoveredIndex !== null && BG_IMAGES[hoveredIndex] && (
            <motion.div
              key={`bg-${hoveredIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: 0,
              }}
            >
              {/* Image avec fort assombrissement */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${BG_IMAGES[hoveredIndex]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.38,
                  mixBlendMode: 'luminosity',
                  filter: 'blur(2px) saturate(0.6)',
                  transform: 'scale(1.05)', // évite les bords blancs avec blur
                }}
              />
              {/* Overlay gradient noir pour maintenir la lisibilité */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(5,5,8,0.55) 0%, rgba(5,5,8,0.30) 40%, rgba(5,5,8,0.55) 100%)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accent glow centré permanent */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: 800, height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(138,43,226,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════
          CONTENU
      ══════════════════════════════════════════════════ */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 md:px-6 relative" style={{ zIndex: 1 }}>

        {/* En-tête */}
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="section-overline mb-4">— {t.overline || 'What we do'}</p>
          <h2 className="section-title text-4xl md:text-6xl text-white mb-5">
            <span className="text-gradient">{t.title.split(' ')[0]} </span>
            {t.title.split(' ').slice(1).join(' ')}
          </h2>
          <p
            className="text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t.subtitle}
          </p>
          <div className="accent-line mt-6" />
        </motion.div>

        {/* Grille 3 cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {cards.map((card, i) => (
            <Reveal key={i} width="100%" delay={i * 0.15}>
              <ServiceCard3D
                {...card}
                revealStyle={getItemStyle(i)}
                onHoverChange={(hovered) => setHoveredIndex(hovered ? i : null)}
              />
            </Reveal>
          ))}
        </div>

        {/* Hint global */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass-pill flex items-center gap-2.5 px-5 py-2.5">
            <motion.div
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#a855f7', boxShadow: '0 0 8px #a855f7',
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{
              fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(115,115,115,0.65)', fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {t.interactionHint || 'Hover · Click to flip · Click again to close'}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;


