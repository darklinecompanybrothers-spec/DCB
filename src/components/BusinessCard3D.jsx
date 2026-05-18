/**
 * BusinessCard3D — Composant isolé, 100% Framer Motion
 *
 * Props :
 *  • onEnter  — callback déclenché au clic (transition vers le site principal)
 *  • standalone — si true, affiche le hint "Cliquez pour entrer"
 *
 * Fonctionnalités :
 *  • Lévitation infinie (animate keyframes Framer Motion)
 *  • Tilt 3D au survol de la souris (useMotionValue + useSpring)
 *  • Glare holographique qui suit le curseur
 *  • Flip automatique toutes les 4.2 s (Face A ↔ Face B)
 *  • Animation de sortie "plongeon" au clic (scale+opacity via exit)
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
} from 'framer-motion';
import { useAudio } from '../context/SoundContext';

/* ─────────────────────────────────────────────────────────────────────────────
   CIRCUIT SVG  —  tracé de pistes et pads imprimés
───────────────────────────────────────────────────────────────────────────── */
const CircuitSVG = ({ flip = false }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 420 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
  >
    {/* ── Lignes de bus horizontales ── */}
    <line x1="0"   y1="58"  x2="155" y2="58"  stroke="#8A2BE2" strokeWidth="0.7" opacity="0.5" />
    <line x1="175" y1="58"  x2="420" y2="58"  stroke="#8A2BE2" strokeWidth="0.7" opacity="0.5" />
    <line x1="0"   y1="182" x2="245" y2="182" stroke="#00D4FF" strokeWidth="0.7" opacity="0.4" />
    <line x1="265" y1="182" x2="420" y2="182" stroke="#00D4FF" strokeWidth="0.7" opacity="0.4" />

    {/* ── Connecteurs verticaux pointillés ── */}
    <line x1="88"  y1="0"   x2="88"  y2="58"  stroke="#8A2BE2" strokeWidth="0.7" opacity="0.5" />
    <line x1="88"  y1="58"  x2="88"  y2="182" stroke="#8A2BE2" strokeWidth="0.3" strokeDasharray="5 5" opacity="0.35" />
    <line x1="332" y1="58"  x2="332" y2="182" stroke="#00D4FF" strokeWidth="0.3" strokeDasharray="5 5" opacity="0.3" />
    <line x1="332" y1="182" x2="332" y2="240" stroke="#00D4FF" strokeWidth="0.7" opacity="0.4" />

    {/* ── Diagonales coin haut-droit ── */}
    <path d="M350 0 L420 70"  stroke="#8A2BE2" strokeWidth="0.8" opacity="0.45" />
    <path d="M375 0 L420 45"  stroke="#00D4FF" strokeWidth="0.55" opacity="0.35" />

    {/* ── Diagonales coin bas-gauche ── */}
    <path d="M0 170 L70 240"  stroke="#8A2BE2" strokeWidth="0.8" opacity="0.45" />
    <path d="M0 195 L45 240"  stroke="#00D4FF" strokeWidth="0.55" opacity="0.35" />

    {/* ── Pads IC — cluster haut-droit ── */}
    <rect x="386" y="22" width="7" height="7" rx="1.5" fill="#8A2BE2" opacity="0.75" />
    <rect x="400" y="22" width="7" height="7" rx="1.5" fill="#8A2BE2" opacity="0.5" />
    <rect x="386" y="35" width="7" height="7" rx="1.5" fill="#00D4FF" opacity="0.5" />

    {/* ── Pads IC — cluster bas-gauche ── */}
    <rect x="18"  y="198" width="7" height="7" rx="1.5" fill="#8A2BE2" opacity="0.7" />
    <rect x="32"  y="198" width="7" height="7" rx="1.5" fill="#00D4FF" opacity="0.5" />

    {/* ── Points de soudure aux croisements ── */}
    <circle cx="88"  cy="58"  r="2.5" fill="#8A2BE2" opacity="0.8" />
    <circle cx="332" cy="58"  r="2.5" fill="#8A2BE2" opacity="0.5" />
    <circle cx="88"  cy="182" r="2.5" fill="#00D4FF" opacity="0.5" />
    <circle cx="332" cy="182" r="2.5" fill="#00D4FF" opacity="0.8" />

    {/* ── Dots de coin ── */}
    <circle cx="8"   cy="8"   r="3"   fill="#8A2BE2" opacity="0.55" />
    <circle cx="412" cy="232" r="3"   fill="#00D4FF" opacity="0.55" />
    <circle cx="412" cy="8"   r="2"   fill="#8A2BE2" opacity="0.35" />
    <circle cx="8"   cy="232" r="2"   fill="#00D4FF" opacity="0.35" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   FACE AVANT
───────────────────────────────────────────────────────────────────────────── */
const CardFront = ({ name, role }) => (
  <div
    className="absolute inset-0 w-full h-full rounded-2xl bg-[#050505]/60 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.15),inset_0_0_20px_rgba(6,182,212,0.1)] overflow-hidden"
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    }}
  >
    {/* Effet Cyber-Network (Constellation) en arrière-plan de la carte */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lignes de connexion */}
        <motion.path
          d="M50 150 L120 150 L160 180 L250 180 L300 130 L350 130"
          stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.path
          d="M80 80 L140 80 L180 110 L280 110"
          stroke="rgba(255,255,255,0.1)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
        />

        {/* Noeuds Lumineux (Dots) */}
        <circle cx="50" cy="150" r="3" fill="#06b6d4" className="animate-pulse" />
        <circle cx="120" cy="150" r="4" fill="#8b5cf6" className="animate-pulse" />
        <circle cx="160" cy="180" r="3" fill="#06b6d4" />
        <circle cx="250" cy="180" r="4" fill="#8b5cf6" className="animate-pulse" />
        <circle cx="300" cy="130" r="3" fill="#06b6d4" />
        <circle cx="80" cy="80" r="3" fill="#8b5cf6" className="animate-pulse" />
        <circle cx="180" cy="110" r="4" fill="#a3e635" className="animate-pulse" />
      </svg>
    </div>
    {/* Reflet holographique (Sweep) */}
    <motion.div
      className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12"
      animate={{ x: ['-150%', '250%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    />

    <div className="relative z-20 h-full">
      {/* Logo + Marque */}
      <div className="absolute top-5 left-5 flex items-center gap-3">
        <img loading="lazy"
          src="dcb-logo1.png"
          alt="DCB"
          className="h-10 w-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(138,43,226,0.7))' }}
        />
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-[0.25em] text-white uppercase leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            DCB Authority
          </span>
          <span className="text-[8px] tracking-[0.18em] uppercase mt-0.5" style={{ color: 'rgba(168,85,247,0.65)' }}>
            Group
          </span>
        </div>
      </div>

      {/* Séparateur gradient */}
      <div className="absolute" style={{ top: '58px', left: '20px', right: '20px', height: '1px', background: 'linear-gradient(90deg, rgba(138,43,226,0.7), rgba(0,212,255,0.35), transparent)' }} />

      {/* Identité */}
      <div className="absolute bottom-5 left-5 right-5">
        <motion.p
          key={name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-white font-bold text-xl leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 0 22px rgba(138,43,226,0.55)', letterSpacing: '-0.02em' }}
        >
          {name}
        </motion.p>
        <motion.p
          key={role}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-[11px] tracking-[0.2em] uppercase mt-1"
          style={{ color: 'rgba(192,132,252,0.65)' }}
        >
          {role}
        </motion.p>
        <div className="flex items-center gap-1.5 mt-3.5">
          <div className="h-[1px] w-5 bg-purple-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500/80" style={{ boxShadow: '0 0 5px #a855f7' }} />
          <div className="h-[1px] w-8 bg-cyan-400/35" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" style={{ boxShadow: '0 0 5px #22d3ee' }} />
          <div className="h-[1px] w-5 bg-cyan-400/25" />
        </div>
      </div>

      {/* URL bas-droite */}
      <div className="absolute bottom-5 right-5">
        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(115,115,115,0.7)' }}>dcbag.net</p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   FACE ARRIÈRE
───────────────────────────────────────────────────────────────────────────── */
const CardBack = () => (
  <div
    className="absolute inset-0 w-full h-full rounded-2xl bg-[#050505]/60 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.15)] overflow-hidden"
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
    }}
  >
    {/* Électricité Blanche sur la Face Arrière */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Éclair 1 */}
        <motion.path
          d="M20 120 L80 150 L120 100 L200 160 L280 90 L380 130"
          stroke="white" strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
        {/* Éclair 2 */}
        <motion.path
          d="M40 50 L100 80 L150 40 L250 100 L320 60 L360 90"
          stroke="white" strokeWidth="1"
          style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'circIn', delay: 0.5 }}
        />
      </svg>
    </div>

    {/* Centre : identité de marque */}
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5">
      <div className="w-[200px] h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(138,43,226,0.8), rgba(0,212,255,0.6), transparent)' }} />
      <img loading="lazy" src="dcb-logo1.png" alt="DCB" className="h-8 w-auto object-contain opacity-80" style={{ filter: 'drop-shadow(0 0 8px rgba(138,43,226,0.5))' }} />
      <p className="text-[12px] font-black tracking-[0.35em] text-white uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 0 18px rgba(138,43,226,0.75)' }}>
        DCB Authority Group
      </p>
      <div className="flex items-center gap-2">
        {['Studio', 'Visuals', 'Agency'].map((s, i) => (
          <React.Fragment key={s}>
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: i === 1 ? 'rgba(0,212,255,0.7)' : 'rgba(168,85,247,0.55)' }}>{s}</span>
            {i < 2 && <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="w-[140px] h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), rgba(138,43,226,0.8), transparent)' }} />
    </div>

    <div className="absolute bottom-4 left-5 z-20">
      <p className="text-[8px] tracking-widest uppercase" style={{ color: 'rgba(115,115,115,0.6)' }}>contact@dcbag.net</p>
    </div>
    <div className="absolute top-4 right-5 z-20">
      <p className="text-[8px] tracking-widest uppercase" style={{ color: 'rgba(115,115,115,0.5)' }}>Tunisia · 2025</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL  —  BusinessCard3D
───────────────────────────────────────────────────────────────────────────── */
const PERSONS = [
  { name: 'Daboussi Iheb',    role: 'CEO' },
  { name: 'Daboussi Yassine', role: 'COO' },
];

export default function BusinessCard3D({ onEnter, standalone = false }) {
  const cardRef = useRef(null);
  const { playHoverCard, playClickCard } = useAudio();

  /* ── Motion values pour le tilt ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 22, mass: 0.8 };
  const rotateX = useSpring(rawX, springConfig);
  const rotateY = useSpring(rawY, springConfig);

  /* ── Glare ── */
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  /* ── Lévitation infinie ── */
  const floatY = useMotionValue(0);
  useEffect(() => {
    const ctrl = animate(floatY, [0, -16, 0], { duration: 5, repeat: Infinity, ease: 'easeInOut' });
    return ctrl.stop;
  }, [floatY]);

  /* ── Flip + changement de personne ── */
  const [flipped, setFlipped] = useState(false);
  const [personIdx, setPersonIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setFlipped(f => !f);
      setTimeout(() => setPersonIdx(i => (i + 1) % PERSONS.length), 380);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* ── rotateY composite : tilt + flip ── */
  const flipDeg = flipped ? 180 : 0;
  const finalRotateY = useTransform(rotateY, v => v + flipDeg);

  /* ── Gestion souris ── */
  const handleMouseMove = e => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    rawX.set(-dy * 20);
    rawY.set( dx * 20);
    setGlareX(((e.clientX - rect.left) / rect.width)  * 100);
    setGlareY(((e.clientY - rect.top)  / rect.height) * 100);
  };
  const handleMouseLeave = () => {
    rawX.set(0); rawY.set(0);
    setGlareX(50); setGlareY(50);
  };
  const handleCardClick = () => {
    playClickCard();
    onEnter?.();
  };

  /* ── Glow sous la carte lié à l'inclinaison ── */
  const glowOpacity = useTransform(rotateX, [-20, 0, 20], [0.3, 0.55, 0.3]);

  const person = PERSONS[personIdx];

  return (
    <div className="flex flex-col items-center gap-6 select-none">

      {/* Label hint */}
      <motion.p
        className="text-[10px] tracking-[0.35em] uppercase"
        style={{ color: 'rgba(115,115,115,0.7)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {standalone ? 'Identity · Hover to interact' : 'Identity · Click to enter'}
      </motion.p>

      {/* Wrapper perspective + lévitation */}
      <motion.div
        className="w-full aspect-[1.6/1] max-w-full"
        style={{
          perspective: 1000,
          y: floatY,
        }}
      >

        {/* Glow sous la carte */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, borderRadius: 16, zIndex: -1,
            background: 'radial-gradient(ellipse 85% 55% at 50% 115%, rgba(138,43,226,0.55), transparent 70%)',
            filter: 'blur(20px)',
            transform: 'translateY(22px) scaleX(0.82)',
            opacity: glowOpacity,
          }}
        />

        {/* Carte — tilt + flip + clic */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={playHoverCard}
          onClick={handleCardClick}
          style={{
            width: '100%', height: '100%', position: 'relative',
            transformStyle: 'preserve-3d',
            rotateX,
            rotateY: finalRotateY,
            cursor: onEnter ? 'pointer' : 'default',
          }}
          /* Anneau pulsant au hover si cliquable */
          whileHover={onEnter ? { scale: 1.04 } : {}}
          transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
        >
          <CardFront name={person.name} role={person.role} glareX={glareX} glareY={glareY} />
          <CardBack />
        </motion.div>
      </motion.div>

      {/* Pill indicateur */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#a855f7', boxShadow: '0 0 6px #a855f7' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(115,115,115,0.65)' }}>
          {onEnter ? 'Cliquez pour entrer · Auto-flip 4s' : 'Survol · Auto-flip 4s'}
        </span>
      </div>
    </div>
  );
}

