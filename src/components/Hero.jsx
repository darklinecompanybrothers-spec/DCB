import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ─── Business Card 3D Tilt + Flip Component ─────────────────────────────── */

const CARD_PEOPLE = [
  { name: 'Daboussi Iheb', title: 'CEO' },
  { name: 'Daboussi Yassine', title: 'COO' },
];

const CircuitLines = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.18]"
    viewBox="0 0 380 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Horizontal bus lines */}
    <line x1="0" y1="55" x2="140" y2="55" stroke="#8A2BE2" strokeWidth="0.6" />
    <line x1="160" y1="55" x2="380" y2="55" stroke="#8A2BE2" strokeWidth="0.6" />
    <line x1="0" y1="165" x2="220" y2="165" stroke="#00D4FF" strokeWidth="0.6" />
    <line x1="240" y1="165" x2="380" y2="165" stroke="#00D4FF" strokeWidth="0.6" />

    {/* Diagonal trace — top-right corner */}
    <path d="M320 0 L380 60" stroke="#8A2BE2" strokeWidth="0.7" />
    <path d="M340 0 L380 40" stroke="#00D4FF" strokeWidth="0.5" />

    {/* Diagonal trace — bottom-left */}
    <path d="M0 160 L60 220" stroke="#8A2BE2" strokeWidth="0.7" />
    <path d="M0 180 L40 220" stroke="#00D4FF" strokeWidth="0.5" />

    {/* Vertical connectors */}
    <line x1="80" y1="0" x2="80" y2="55" stroke="#8A2BE2" strokeWidth="0.6" />
    <line x1="80" y1="55" x2="80" y2="165" stroke="#8A2BE2" strokeWidth="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="55" x2="300" y2="165" stroke="#00D4FF" strokeWidth="0.3" strokeDasharray="4 4" />
    <line x1="300" y1="165" x2="300" y2="220" stroke="#00D4FF" strokeWidth="0.6" />

    {/* IC pads — top-right cluster */}
    <rect x="348" y="28" width="6" height="6" rx="1" fill="#8A2BE2" fillOpacity="0.7" />
    <rect x="360" y="28" width="6" height="6" rx="1" fill="#8A2BE2" fillOpacity="0.5" />
    <rect x="348" y="40" width="6" height="6" rx="1" fill="#00D4FF" fillOpacity="0.5" />

    {/* IC pads — bottom-left cluster */}
    <rect x="18" y="176" width="6" height="6" rx="1" fill="#8A2BE2" fillOpacity="0.7" />
    <rect x="30" y="176" width="6" height="6" rx="1" fill="#00D4FF" fillOpacity="0.5" />

    {/* Corner accent dots */}
    <circle cx="8" cy="8" r="2.5" fill="#8A2BE2" fillOpacity="0.6" />
    <circle cx="372" cy="212" r="2.5" fill="#00D4FF" fillOpacity="0.6" />
    <circle cx="372" cy="8" r="1.5" fill="#8A2BE2" fillOpacity="0.4" />
    <circle cx="8" cy="212" r="1.5" fill="#00D4FF" fillOpacity="0.4" />
  </svg>
);

const BusinessCard = () => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [gloss, setGloss] = useState({ x: 50, y: 50 });
  const [flipped, setFlipped] = useState(false);
  const [personIdx, setPersonIdx] = useState(0);
  const animFrameRef = useRef(null);

  /* Auto-flip every 4 s */
  useEffect(() => {
    const id = setInterval(() => {
      setFlipped((f) => !f);
      setTimeout(() => setPersonIdx((i) => (i + 1) % CARD_PEOPLE.length), 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* Mouse tilt */
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      setTilt({ x: -dy * 18, y: dx * 18 });
      setGloss({ x: (dx + 1) * 50, y: (dy + 1) * 50 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      setTilt({ x: 0, y: 0 });
      setGloss({ x: 50, y: 50 });
    });
  }, []);

  const person = CARD_PEOPLE[personIdx];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[340px] h-[200px] md:w-[380px] md:h-[220px] cursor-pointer select-none"
      style={{
        perspective: '900px',
        /* Floating animation applied via CSS class */
      }}
    >
      {/* Ambient glow under card */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(138,43,226,0.45), transparent 70%)',
          filter: 'blur(18px)',
          transform: 'translateY(18px) scaleX(0.85)',
          zIndex: -1,
        }}
      />

      {/* Float wrapper — carries only the vertical levitation */}
      <div className="hero-card-float w-full h-full relative">

      {/* Tilt wrapper — carries the 3D rotation + flip */}
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (flipped ? 180 : 0)}deg)`,
          transition: 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)',
          borderRadius: '16px',
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #0d0d12 0%, #131020 50%, #0a0a10 100%)',
            border: '1px solid rgba(138,43,226,0.30)',
            boxShadow: '0 0 0 1px rgba(0,212,255,0.06) inset, 0 24px 60px rgba(0,0,0,0.7)',
          }}
        >
          <CircuitLines />

          {/* Gloss reflection */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${gloss.x}% ${gloss.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
              transition: 'background 0.1s',
            }}
          />

          {/* Top-right violet corner accent */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(138,43,226,0.35), transparent 70%)',
            }}
          />

          {/* Logo + brand */}
          <div className="absolute top-5 left-5 flex items-center gap-2.5">
            <img loading="lazy" src="/dcb-logo1.png" alt="DCB" className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]" />
            <div>
              <p className="text-[10px] font-black tracking-[0.22em] text-white uppercase leading-none">DCB Authority</p>
              <p className="text-[8px] text-purple-400/70 tracking-[0.15em] uppercase mt-0.5">Group</p>
            </div>
          </div>

          {/* Thin separator line */}
          <div
            className="absolute"
            style={{
              top: '52px',
              left: '20px',
              right: '20px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(138,43,226,0.6), rgba(0,212,255,0.3), transparent)',
            }}
          />

          {/* Person info */}
          <div className="absolute bottom-5 left-5 right-5">
            <p
              className="text-white font-bold text-lg leading-tight tracking-tight"
              style={{
                textShadow: '0 0 20px rgba(138,43,226,0.5)',
                fontFamily: "'Space Grotesk', 'Syne', system-ui, sans-serif",
              }}
            >
              {person.name}
            </p>
            <p className="text-[11px] text-purple-300/70 tracking-[0.18em] uppercase mt-1">{person.title}</p>

            {/* Bottom decoration row */}
            <div className="flex items-center gap-1.5 mt-3">
              <div className="w-4 h-[1px] bg-purple-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/80" />
              <div className="w-8 h-[1px] bg-cyan-400/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <div className="w-4 h-[1px] bg-cyan-400/30" />
            </div>
          </div>

          {/* Website label bottom-right */}
          <div className="absolute bottom-5 right-5 text-right">
            <p className="text-[9px] text-neutral-500 tracking-widest uppercase">dcbauthority.com</p>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(225deg, #0d0d12 0%, #110d1e 50%, #0a0a10 100%)',
            border: '1px solid rgba(0,212,255,0.25)',
            boxShadow: '0 0 0 1px rgba(138,43,226,0.05) inset, 0 24px 60px rgba(0,0,0,0.7)',
          }}
        >
          <CircuitLines />

          {/* Central brand stripe */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1"
          >
            <div
              className="w-[180px] h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(138,43,226,0.8), rgba(0,212,255,0.6), transparent)' }}
            />
            <p
              className="text-[11px] font-black tracking-[0.35em] text-white uppercase my-2"
              style={{ textShadow: '0 0 15px rgba(138,43,226,0.7)' }}
            >
              DCB Authority Group
            </p>
            <p className="text-[8px] tracking-[0.25em] text-purple-300/60 uppercase">Studio · Visuals · Agency</p>
            <div
              className="w-[120px] h-[1px] mt-1"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), rgba(138,43,226,0.8), transparent)' }}
            />
          </div>

          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-20 h-20" style={{ background: 'radial-gradient(circle at top left, rgba(0,212,255,0.2), transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-20 h-20" style={{ background: 'radial-gradient(circle at bottom right, rgba(138,43,226,0.2), transparent 70%)' }} />
        </div>

        {/* /Tilt wrapper */}
        </div>

      {/* /Float wrapper */}
      </div>
    </div>
  );
};

/* ─── Animated Background Orbs ───────────────────────────────────────────── */

const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Large violet orb — top-left */}
    <div
      className="hero-orb-1 absolute rounded-full"
      style={{
        width: '700px',
        height: '700px',
        top: '-200px',
        left: '-200px',
        background: 'radial-gradient(circle, rgba(138,43,226,0.18) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }}
    />
    {/* Medium cyan orb — right */}
    <div
      className="hero-orb-2 absolute rounded-full"
      style={{
        width: '500px',
        height: '500px',
        top: '10%',
        right: '-150px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }}
    />
    {/* Small violet orb — bottom-center */}
    <div
      className="hero-orb-3 absolute rounded-full"
      style={{
        width: '400px',
        height: '400px',
        bottom: '-100px',
        left: '40%',
        background: 'radial-gradient(circle, rgba(138,43,226,0.13) 0%, transparent 70%)',
        filter: 'blur(100px)',
      }}
    />

    {/* Fine grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    {/* Noise texture */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

/* ─── CTA Button ──────────────────────────────────────────────────────────── */

const FuturisticButton = ({ children, onClick, variant = 'primary' }) => {
  const [hovered, setHovered] = useState(false);

  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative px-8 py-4 font-bold text-sm uppercase tracking-[0.15em] rounded-sm transition-all duration-400 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.10)',
          color: 'white',
          backdropFilter: 'blur(12px)',
          boxShadow: hovered ? '0 0 30px rgba(138,43,226,0.20), inset 0 0 20px rgba(138,43,226,0.05)' : 'none',
          borderColor: hovered ? 'rgba(138,43,226,0.5)' : 'rgba(255,255,255,0.10)',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group px-8 py-4 font-bold text-sm uppercase tracking-[0.15em] rounded-sm overflow-hidden transition-all duration-400"
      style={{
        background: hovered ? 'transparent' : 'white',
        color: hovered ? 'white' : 'black',
        border: '1px solid white',
        boxShadow: hovered ? '0 0 40px rgba(138,43,226,0.35), 0 0 80px rgba(138,43,226,0.15)' : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {/* Animated bg fill */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #8A2BE2, #00D4FF)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight size={16} className={`transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} />
      </span>
    </button>
  );
};

/* ─── Floating stat badge ─────────────────────────────────────────────────── */

const StatBadge = ({ value, label, delay = 0 }) => (
  <div
    className="hero-float-badge px-4 py-3 rounded-xl"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(16px)',
      animationDelay: `${delay}ms`,
    }}
  >
    <p
      className="text-2xl font-black leading-none"
      style={{
        background: 'linear-gradient(135deg, #c084fc, #67e8f9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {value}
    </p>
    <p className="text-[10px] text-neutral-400 tracking-widest uppercase mt-1">{label}</p>
  </div>
);

/* ─── Hero ────────────────────────────────────────────────────────────────── */

const Hero = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang]?.hero ?? TRANSLATIONS['en'].hero;
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: '#050508' }}
    >
      <BackgroundOrbs />

      {/* Top thin gradient line (brand accent) */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(138,43,226,0.6) 30%, rgba(0,212,255,0.5) 70%, transparent 100%)' }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 min-h-[calc(100vh-5rem)] py-16 lg:py-0">

          {/* ── LEFT: Text Content ── */}
          <div
            className="flex-1 flex flex-col items-start max-w-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1), transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {/* Status pill */}
            <div
              className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-emerald-400"
                style={{ boxShadow: '0 0 6px #34d399, 0 0 12px #34d399' }}
              />
              <span className="text-[11px] font-semibold text-neutral-300 tracking-[0.2em] uppercase">
                {t.status}
              </span>
            </div>

            {/* Main title */}
            <h1
              className="font-black leading-[0.92] tracking-tighter mb-6 text-white"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontFamily: "'Space Grotesk', 'Syne', system-ui, sans-serif",
                letterSpacing: '-0.03em',
              }}
            >
              {lang === 'fr' ? (
                <>
                  AMPLIFIEZ<br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #67e8f9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    VOTRE
                  </span>{' '}
                  <span
                    style={{
                      WebkitTextStroke: '1px rgba(255,255,255,0.6)',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    RÉALITÉ
                  </span>
                </>
              ) : lang === 'ar' ? (
                <>
                  {t.title1}<br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #c084fc 0%, #67e8f9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t.title2}
                  </span>
                </>
              ) : (
                <>
                  {t.title1}<br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #67e8f9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    YOUR
                  </span>{' '}
                  <span
                    style={{
                      WebkitTextStroke: '1px rgba(255,255,255,0.6)',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    REALITY
                  </span>
                </>
              )}
            </h1>

            {/* Thin separator */}
            <div
              className="mb-6 h-[1px] w-24"
              style={{ background: 'linear-gradient(90deg, rgba(138,43,226,0.8), transparent)' }}
            />

            {/* Description */}
            <p
              className="text-neutral-400 leading-relaxed mb-10 max-w-lg"
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {t.desc}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4">
              <FuturisticButton onClick={() => onNavigate('contact')} variant="primary">
                {t.cta1}
              </FuturisticButton>
              <FuturisticButton onClick={() => onNavigate('services')} variant="secondary">
                {t.cta2}
              </FuturisticButton>
            </div>

            {/* Stat badges */}
            <div
              className="flex flex-wrap gap-3 mt-12"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1.1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s, transform 1.1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s',
              }}
            >
              <StatBadge value="3+" label="Pôles créatifs" delay={0} />
              <StatBadge value="100+" label="Projets livrés" delay={100} />
              <StatBadge value="∞" label="Possibilités" delay={200} />
            </div>
          </div>

          {/* ── RIGHT: 3D Business Card ── */}
          <div
            className="flex-shrink-0 flex flex-col items-center gap-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              transition: 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s',
            }}
          >
            {/* Card hint label */}
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-1"
            >
              Identity Card
            </p>

            <BusinessCard />

            {/* Below-card pill: "hover to interact" */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full mt-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full bg-purple-400"
                style={{ boxShadow: '0 0 5px #a855f7' }}
              />
              <span className="text-[10px] text-neutral-500 tracking-widest uppercase">
                Survoler pour interagir
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #050508, transparent)' }}
      />
    </section>
  );
};

export default Hero;

