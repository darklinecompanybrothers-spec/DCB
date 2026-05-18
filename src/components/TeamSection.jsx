import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useAudio } from '../context/SoundContext';

/**
 * TeamSection — Cinematic Member Spotlight (Semaine 3 refonte).
 *
 * Self-contained 100vh carousel. No extra scroll budget.
 *  • Monumental Clash Display name — clip-reveal (y: 110% → 0%)
 *  • Direction-aware AnimatePresence slide (x: ±6%)
 *  • Giant watermark initials behind content (4% opacity)
 *  • Accent glow morphs per member
 *  • Portrait monogram (right column) with gradient + noise
 *  • Progress dots + Prev/Next arrows + 01/06 counter
 */

/* ── Member visual config — order matches translations.team.members ── */
const MEMBERS_META = [
  {
    photo: null,
    initials: 'DI',
    accent: '#f59e0b',
    accentMuted: 'rgba(245,158,11,0.10)',
    accentBorder: 'rgba(245,158,11,0.32)',
    gradFrom: '#f59e0b',
    gradTo: '#b45309',
    roleColor: '#fcd34d',
  },
  {
    photo: null,
    initials: 'DY',
    accent: '#06b6d4',
    accentMuted: 'rgba(6,182,212,0.10)',
    accentBorder: 'rgba(6,182,212,0.32)',
    gradFrom: '#06b6d4',
    gradTo: '#0e7490',
    roleColor: '#67e8f9',
  },
  {
    photo: null,
    initials: 'DM',
    accent: '#f43f5e',
    accentMuted: 'rgba(244,63,94,0.10)',
    accentBorder: 'rgba(244,63,94,0.32)',
    gradFrom: '#f43f5e',
    gradTo: '#9f1239',
    roleColor: '#fda4af',
  },
  {
    photo: null,
    initials: 'KB',
    accent: '#8b5cf6',
    accentMuted: 'rgba(139,92,246,0.10)',
    accentBorder: 'rgba(139,92,246,0.32)',
    gradFrom: '#8b5cf6',
    gradTo: '#5b21b6',
    roleColor: '#c4b5fd',
  },
  {
    photo: null,
    initials: 'AK',
    accent: '#10b981',
    accentMuted: 'rgba(16,185,129,0.10)',
    accentBorder: 'rgba(16,185,129,0.32)',
    gradFrom: '#10b981',
    gradTo: '#065f46',
    roleColor: '#6ee7b7',
  },
  {
    photo: null,
    initials: 'OG',
    accent: '#84cc16',
    accentMuted: 'rgba(132,204,22,0.10)',
    accentBorder: 'rgba(132,204,22,0.32)',
    gradFrom: '#84cc16',
    gradTo: '#3f6212',
    roleColor: '#bef264',
  },
];

/* ── SVG noise data URI (shared with original MemberCard3D) ── */
const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ── Main component ───────────────────────────────────────────── */
const TeamSection = ({ lang }) => {
  const t = TRANSLATIONS[lang].team;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction,   setDirection]   = useState(1);
  const { playClicky } = useAudio();

  const goTo = (idx) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
    playClicky();
  };

  const prev = () => goTo(Math.max(0, activeIndex - 1));
  const next = () => goTo(Math.min(t.members.length - 1, activeIndex + 1));

  const member = t.members[activeIndex];
  const meta   = MEMBERS_META[activeIndex];

  /* Split name for monumental display */
  const words      = member.name.trim().split(/\s+/);
  const givenName  = words[words.length - 1];
  const familyName = words.slice(0, -1).join(' ');

  /* Direction-aware slide variants */
  const slideVariants = {
    enter:  (d) => ({ x: `${d > 0 ? 5  : -5}%`, opacity: 0 }),
    center:         { x: '0%',                    opacity: 1 },
    exit:   (d) => ({ x: `${d > 0 ? -5 : 5}%`,  opacity: 0 }),
  };

  return (
    <section
      id="team"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* ── Giant watermark initials ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex + '-wm'}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-6%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: "'Clash Display', 'Editorial New', serif",
            fontWeight: 900,
            fontSize: 'clamp(10rem, 28vw, 36rem)',
            letterSpacing: '-0.06em',
            color: meta.accent,
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {meta.initials}
        </motion.div>
      </AnimatePresence>

      {/* ── Accent glow ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex + '-glow'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute',
            left: '-12%',
            top: '15%',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${meta.accentMuted} 0%, transparent 68%)`,
            filter: 'blur(90px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* ── Edge lines ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent)', zIndex: 1 }} />

      {/* ── Content wrapper ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(2.5rem, 8vh, 5rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Section overline + counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 6vh, 4rem)' }}>
          <p className="section-overline">— {t.overline}</p>
          <motion.span
            key={activeIndex + '-counter'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(120,120,130,0.45)', letterSpacing: '0.18em' }}
          >
            {String(activeIndex + 1).padStart(2, '0')} / {String(t.members.length).padStart(2, '0')}
          </motion.span>
        </div>

        {/* Two-column grid: text (left) + portrait (right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'clamp(2rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >
          {/* ── LEFT — Monumental text content ── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex + '-text'}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Monumental name — clip reveal per word */}
              <div
                className="display-title"
                style={{ lineHeight: 0.88, marginBottom: 'clamp(1.2rem, 3.5vh, 2.5rem)' }}
              >
                {/* Family name — muted, slightly smaller */}
                {familyName && (
                  <div style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.70, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontSize: 'clamp(2rem, 6vw, 5.5rem)',
                        color: 'rgba(255,255,255,0.28)',
                        display: 'block',
                      }}
                    >
                      {familyName}
                    </motion.div>
                  </div>
                )}

                {/* Given name — full white, monumental */}
                <div style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontSize: 'clamp(3.5rem, 11vw, 10rem)',
                      color: 'white',
                      display: 'block',
                    }}
                  >
                    {givenName}
                  </motion.div>
                </div>
              </div>

              {/* Role + Division badge + Nickname */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.26, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 'clamp(1rem, 2.5vh, 2rem)' }}
              >
                <span
                  style={{
                    color: meta.roleColor,
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontFamily: "'Space Grotesk', sans-serif",
                    whiteSpace: 'nowrap',
                  }}
                >
                  {member.role}
                </span>
                <div style={{ width: 3, height: 3, borderRadius: '50%', background: meta.accent, flexShrink: 0 }} />
                <span
                  style={{
                    padding: '3px 12px',
                    borderRadius: 999,
                    background: meta.accentMuted,
                    border: `1px solid ${meta.accentBorder}`,
                    color: meta.accent,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {member.division}
                </span>
                {member.nickname && (
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
                    aka {member.nickname}
                  </span>
                )}
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.34, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  color: 'rgba(160,160,172,0.72)',
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  lineHeight: 1.78,
                  maxWidth: 480,
                }}
              >
                {member.bio}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* ── RIGHT — Portrait monogram ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + '-portrait'}
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{ opacity: 0, scale: 1.08, y: -8 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'clamp(100px, 14vw, 200px)',
                height: 'clamp(130px, 18vw, 258px)',
                borderRadius: 18,
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: `0 0 0 1px ${meta.accentBorder}, 0 24px 64px rgba(0,0,0,0.55), 0 0 48px ${meta.accentMuted}`,
              }}
            >
              {meta.photo ? (
                <img
                  src={meta.photo}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(160deg, ${meta.gradFrom}, ${meta.gradTo})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Noise texture */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: NOISE_BG,
                      opacity: 0.07,
                      mixBlendMode: 'overlay',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Clash Display', 'Editorial New', serif",
                      fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                      fontWeight: 900,
                      color: 'rgba(255,255,255,0.92)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {meta.initials}
                  </span>
                  <div
                    style={{
                      marginTop: 12,
                      width: 32,
                      height: 1,
                      background: 'rgba(255,255,255,0.30)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation row ── */}
        <div
          style={{
            marginTop: 'clamp(2rem, 5vh, 4rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {t.members.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Member ${i + 1}`}
                style={{
                  width: i === activeIndex ? 28 : 6,
                  height: 6,
                  borderRadius: 3,
                  border: 'none',
                  cursor: 'pointer',
                  background: i === activeIndex ? meta.accent : 'rgba(255,255,255,0.14)',
                  boxShadow: i === activeIndex ? `0 0 10px ${meta.accent}80` : 'none',
                  transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Previous member"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1px solid rgba(255,255,255,${activeIndex === 0 ? '0.06' : '0.15'})`,
                background: 'transparent',
                color: activeIndex === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.75)',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { if (activeIndex > 0) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              disabled={activeIndex === t.members.length - 1}
              aria-label="Next member"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1px solid ${activeIndex === t.members.length - 1 ? 'rgba(255,255,255,0.06)' : meta.accentBorder}`,
                background: activeIndex === t.members.length - 1 ? 'transparent' : meta.accentMuted,
                color: activeIndex === t.members.length - 1 ? 'rgba(255,255,255,0.2)' : meta.accent,
                cursor: activeIndex === t.members.length - 1 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { if (activeIndex < t.members.length - 1) e.currentTarget.style.filter = 'brightness(1.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
