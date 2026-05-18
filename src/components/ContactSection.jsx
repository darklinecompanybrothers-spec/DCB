import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowDown, MessageCircle } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { PHONE_NUMBERS } from '../data/contacts';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { useAudio } from '../context/SoundContext';

const CARD_STYLES = [
  { accentHover: 'hover:border-purple-500/30 hover:bg-purple-500/5', iconHover: 'group-hover:text-purple-400' },
  { accentHover: 'hover:border-cyan-500/30 hover:bg-cyan-500/5',    iconHover: 'group-hover:text-cyan-400'   },
  { accentHover: 'hover:border-lime-500/30 hover:bg-lime-500/5',    iconHover: 'group-hover:text-lime-400'   },
];
const CONTACT_CARDS = PHONE_NUMBERS.map((p, i) => ({ ...p, ...CARD_STYLES[i] }));

/* ─────────────────────────────────────────────────────────────────────────────
   CONCEPT 10 — NORTH AFRICA TIME ZONES
   Live clocks for Tunis / Paris / Oregon using Intl.DateTimeFormat.
   Each clock dims automatically when outside business hours (09:00 – 19:00 local).
   Updates every second via setInterval.
───────────────────────────────────────────────────────────────────────────── */
const CLOCK_ZONES = [
  { tz: 'Africa/Tunis',        label: 'Tunis',      flag: '🇹🇳', accent: '#a855f7', open: [9, 19] },
  { tz: 'Europe/Paris',        label: 'Paris',      flag: '🇫🇷', accent: '#06b6d4', open: [9, 19] },
  { tz: 'America/Los_Angeles', label: 'Oregon, USA',flag: '🇺🇸', accent: '#a3e635', open: [9, 19] },
];

/* Extract h/m/s in a given timezone reliably via Intl */
const getZoneTime = (date, tz) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour:     '2-digit',
    minute:   '2-digit',
    second:   '2-digit',
    hour12:   false,
  }).formatToParts(date);
  const get = (t) => parts.find(p => p.type === t)?.value ?? '00';
  const h = parseInt(get('hour'),   10);
  const m = parseInt(get('minute'), 10);
  const s = parseInt(get('second'), 10);
  /* hour12: false can return 24 for midnight in some engines — normalise */
  return { h: h === 24 ? 0 : h, m, s };
};

const pad = (n) => String(n).padStart(2, '0');

const LiveClocks = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="mt-14 md:mt-18 pt-10 border-t border-white/[0.05]"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500/30" />
        <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-neutral-600">
          Live Office Hours
        </span>
      </div>

      {/* Clock cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {CLOCK_ZONES.map(({ tz, label, flag, accent, open }) => {
          const { h, m, s } = getZoneTime(now, tz);
          const isOpen = h >= open[0] && h < open[1];

          return (
            <div
              key={tz}
              className="p-4 md:p-5 rounded-xl border transition-all duration-700"
              style={{
                borderColor: isOpen ? `${accent}28` : 'rgba(255,255,255,0.04)',
                background:  isOpen ? `${accent}06` : 'transparent',
                opacity:     isOpen ? 1 : 0.38,
              }}
            >
              {/* Flag + status dot */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl leading-none" role="img" aria-label={label}>{flag}</span>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: isOpen ? accent : 'rgba(255,255,255,0.18)' }}
                  animate={isOpen ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Digital clock */}
              <div
                className="font-mono font-black tabular-nums leading-none mb-2"
                style={{ color: isOpen ? accent : 'rgba(255,255,255,0.2)' }}
              >
                <span className="text-lg md:text-xl">{pad(h)}:{pad(m)}</span>
                <span className="text-sm opacity-55">:{pad(s)}</span>
              </div>

              {/* Label */}
              <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 mb-1.5 truncate">
                {label}
              </div>

              {/* Open / After hours badge */}
              <div
                className="text-[8px] font-bold uppercase tracking-widest flex items-center gap-1"
                style={{ color: isOpen ? accent : 'rgba(255,255,255,0.18)' }}
              >
                {isOpen ? (
                  <><span>●</span><span>Open</span></>
                ) : (
                  <><span>◐</span><span>After hours</span></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ── ContactSection ───────────────────────────────────────────────────────── */
const ContactSection = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang].contactSection;
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.15 });
  const { containerRef, getItemStyle } = useStaggerReveal(5, 120);
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useAudio();

  const scrollToWizard = () => {
    playClick();
    const el = document.getElementById('wizard');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: '#04040a' }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Overline */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 12 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-purple-400/40" />
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.35em]">
            {t.overline}
          </span>
        </motion.div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Headline */}
          <div>
            <div style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
              <motion.h2
                initial={{ y: '110%' }}
                animate={headerVisible ? { y: '0%' } : {}}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="block text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.88] tracking-tighter"
              >
                {t.title}
              </motion.h2>
            </div>

            <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={headerVisible ? { y: '0%' } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-5xl sm:text-7xl md:text-8xl font-display italic font-black leading-[0.88] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-lime-400 mb-8 md:mb-12"
              >
                {t.titleAccent}
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10 max-w-sm"
            >
              {t.subtitle}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={playHover}
              onClick={scrollToWizard}
              data-cursor="cta"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-white transition-all duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.35)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)' }}
            >
              {t.cta}
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-1" />
            </motion.button>
          </div>

          {/* Right — Contact cards */}
          <div ref={containerRef} className="flex flex-col gap-3">
            {CONTACT_CARDS.map(({ flag, region, tel, display, accentHover, iconHover }, idx) => (
              <a
                key={region}
                href={tel}
                style={getItemStyle(idx)}
                onMouseEnter={playHover}
                className={`group flex items-center gap-5 p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] ${accentHover} transition-all duration-400`}
              >
                <span className="text-2xl select-none">{flag}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-[10px] font-bold text-neutral-600 uppercase tracking-widest transition-colors duration-300 ${iconHover}`}>
                    {region}
                  </div>
                  <div className="font-mono text-white text-sm md:text-base mt-0.5">{display}</div>
                </div>
                <Phone size={14} className={`text-neutral-700 transition-colors duration-300 ${iconHover} shrink-0`} />
              </a>
            ))}

            {/* Email card */}
            <a
              href="mailto:contact@dcbag.net"
              style={getItemStyle(3)}
              onMouseEnter={playHover}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-white/20 hover:bg-white/5 transition-all duration-400"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                <Mail size={15} className="text-neutral-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-white/60 transition-colors duration-300">
                  Email
                </div>
                <div className="font-mono text-white text-sm md:text-base mt-0.5">contact@dcbag.net</div>
              </div>
            </a>

            {/* WhatsApp card */}
            <a
              href="https://wa.me/21693647542"
              target="_blank"
              rel="noopener noreferrer"
              style={getItemStyle(4)}
              onMouseEnter={playHover}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-400"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                <MessageCircle size={15} className="text-neutral-500 group-hover:text-green-400 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-green-400/70 transition-colors duration-300">
                  WhatsApp
                </div>
                <div className="font-mono text-white text-sm md:text-base mt-0.5">+216 93 647 542</div>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-green-500/60 group-hover:text-green-400 transition-colors duration-300 shrink-0">
                Message
              </span>
            </a>
          </div>
        </div>

        {/* ── Concept 10: Live Office Clocks ── */}
        <LiveClocks />

      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  );
};

export default ContactSection;
