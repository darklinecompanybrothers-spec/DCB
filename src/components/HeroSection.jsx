import React, { useRef, useState, useEffect } from 'react';
import useTextScramble from '../hooks/useTextScramble';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useAudio } from '../context/SoundContext';
import Reveal from './Reveal';
import AudioWave from './AudioWave';
import MagneticButton from './MagneticButton';
import SonicMembrane from './SonicMembrane';
import useDeviceTier from '../hooks/useDeviceTier';

/**
 * HeroSection — Full-screen opening with:
 *  • Video background + gradient/grid overlays
 *  • AudioWave canvas (brand-colored sine waves)
 *  • Scroll-driven parallax on title, description, and wave
 *  • Scroll indicator that fades out after first scroll interaction
 */
const HeroSection = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang].hero;
  const { playClickCard, playInterface } = useAudio();
  const { isLowEnd, isMediumTier } = useDeviceTier();
  const heroRef = useRef(null);
  /* Skip autoplay video on slow connections (2G/3G) to save data & battery */
  const [slowConn] = useState(() => {
    try {
      const c = navigator?.connection;
      return !!c && ['slow-2g', '2g', '3g'].includes(c.effectiveType);
    } catch { return false; }
  });
  const useStaticHero = slowConn || isLowEnd || isMediumTier;
  const [videoLoaded, setVideoLoaded] = useState(false);

  /* ── Text scramble on title line 1 — triggers when clip reveal starts ── */
  const [scrambleActive, setScrambleActive] = useState(false);
  useEffect(() => {
    // Start scramble 350ms after mount (matches clip reveal delay)
    const timer = setTimeout(() => setScrambleActive(true), 350);
    return () => clearTimeout(timer);
  }, []);
  const scrambledTitle = useTextScramble(t.title1, scrambleActive, 1350);

  /* ── Scroll-driven motion values ── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleY       = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.50], [1, 0]);
  const descY        = useTransform(scrollYProgress, [0, 1], [0,  -60]);
  const descOpacity  = useTransform(scrollYProgress, [0, 0.40], [1, 0]);
  /* Wave moves down slightly relative to hero → lags behind, creates depth */
  const waveY        = useTransform(scrollYProgress, [0, 1], [0,   80]);
  const indicatorOp  = useTransform(scrollYProgress, [0, 0.12], [1,  0]);

  return (
    <div
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-20"
    >
      {/* ── Video background — cinematic fade-in + slow Ken Burns zoom ── */}
      <motion.div
        data-cursor="play"
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={(videoLoaded || useStaticHero)
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 1.08 }}
        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
      >
        {useStaticHero ? (
          /* Slow connection (2G/3G) — static poster, no video download */
          <img
            src="hand.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain opacity-45"
          />
        ) : (
          <video
            autoPlay loop muted playsInline
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
          >
            {/* WebM first — better compression, supported in Chrome/Firefox/Edge */}
            {/* MP4 fallback — Safari + older browsers */}
            <source src="Hero-Video.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* ── Gradient + grid overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/72 to-[#050508] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-purple-900/15 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* ── SonicMembrane — WebGL fBm shader, screen blend, high-end only ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <SonicMembrane />
      </div>

      {/* ── AudioWave — parallax: lags behind scroll to create depth ── */}
      <motion.div
        style={{ y: waveY }}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[38%] md:h-[65%] pointer-events-none z-[1]"
      >
        {!isLowEnd && !isMediumTier && <AudioWave />}
      </motion.div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">

        {/* Title block with parallax */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] rounded-full px-5 py-2 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">{t.status}</span>
          </motion.div>

          <h1 className="display-title text-white mb-6 mx-auto max-w-full" style={{ fontSize: 'clamp(2.75rem, 14vw, 9rem)' }}>
            {/* Line 1 — clip reveal + scramble decode */}
            <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono tracking-[0.02em] sm:tracking-[0.05em]"
              >
                {scrambledTitle || t.title1}
              </motion.div>
            </div>

            {/* Line 2 — gradient color animation, NO overflow:hidden parent
                (-webkit-background-clip:text breaks inside overflow:hidden) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-lime-400 bg-[length:200%_auto] animate-gradient-shift">
                {t.title2}
              </span>
            </motion.div>
          </h1>
        </motion.div>

        {/* Description + CTAs with parallax */}
        <motion.div style={{ y: descY, opacity: descOpacity }}>
          <Reveal width="100%" delay={0.2}>
            <p className="text-base md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.desc}
            </p>
          </Reveal>

          <Reveal width="100%" delay={0.35}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              {/* Primary CTA */}
              <MagneticButton strength={0.35} className="w-full sm:w-auto">
                <button
                  onClick={() => { playClickCard(); onNavigate('contact'); }}
                  onMouseEnter={playInterface}
                  className="relative inline-flex w-full sm:w-auto items-center justify-center px-5 sm:px-8 py-4 text-[11px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.2em] text-black uppercase bg-white overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] rounded-sm"
                >
                  <span className="absolute inset-0 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] origin-bottom bg-lime-400 scale-y-0 group-hover:scale-y-100 z-0" />
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                    {t.cta1}
                    <ArrowRight size={18} className={`transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                  </span>
                </button>
              </MagneticButton>

              {/* Secondary CTA */}
              <MagneticButton strength={0.35} className="w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('services')}
                  onMouseEnter={playInterface}
                  className="relative inline-flex w-full sm:w-auto items-center justify-center px-5 sm:px-8 py-4 text-[11px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.2em] text-white uppercase border border-white/20 overflow-hidden group transition-all duration-500 hover:border-white/50 backdrop-blur-md rounded-sm bg-white/5"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0" />
                  <span className="relative z-10 flex items-center gap-2">{t.cta2}</span>
                </button>
              </MagneticButton>
            </div>
          </Reveal>
        </motion.div>
      </div>

      {/* ── Scroll indicator — fades out after first scroll ── */}
      <motion.div
        style={{ opacity: indicatorOp }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer select-none"
        onClick={() => onNavigate('services')}
        whileHover={{ scale: 1.15 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-neutral-600 font-mono">Scroll</span>
        <motion.div
          className="w-px h-10 rounded-full bg-gradient-to-b from-neutral-500/80 to-transparent"
          animate={{ scaleY: [1, 0.25, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
        />
      </motion.div>

      {/* ── Bottom fade to next section ── */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[rgba(5,5,8,0.95)] to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default HeroSection;
