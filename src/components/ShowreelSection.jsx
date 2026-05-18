import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useAudio } from '../context/SoundContext';

/*
 * ShowreelSection — full-screen cinematic showreel.
 *
 * TO ACTIVATE:
 *   1. Set VIDEO_SRC to your actual video URL (MP4 / WebM recommended)
 *   2. Set POSTER_SRC to a high-res thumbnail image
 *   3. The placeholder overlay will auto-hide once VIDEO_SRC is set.
 *
 * Tips:
 *   - Use a WebM for Chrome + a MP4 fallback for Safari
 *   - Recommended resolution: 1920×1080 minimum
 *   - Keep file size under 30 MB for fast load (use Cloudinary or Bunny CDN)
 */
const VIDEO_SRC  = null;   // TODO: '/videos/dcb-showreel-2025.mp4'
const POSTER_SRC = null;   // TODO: '/images/showreel-poster.jpg'

/* ── Animated film-grain overlay ─────────────────────────────────────────── */
const FilmGrain = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none mix-blend-overlay"
    aria-hidden="true"
  >
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

/* ── Scan-line overlay ────────────────────────────────────────────────────── */
const ScanLines = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
    }}
  />
);

/* ── Main ─────────────────────────────────────────────────────────────────── */
const ShowreelSection = () => {
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(true);
  const [showCtrl,  setShowCtrl]  = useState(false);
  const videoRef = useRef(null);
  const { playClick, playInterface } = useAudio();

  const hasVideo = Boolean(VIDEO_SRC);

  const handlePlay = () => {
    if (!hasVideo) return;
    playClick();
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !muted;
    setMuted(m => !m);
  };

  return (
    <section
      id="showreel"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '85vh' }}
      onMouseEnter={() => setShowCtrl(true)}
      onMouseLeave={() => setShowCtrl(false)}
    >
      {/* ── Background ────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#03030a]">
        {/* Ambient gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%), ' +
              'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(6,182,212,0.04) 0%, transparent 60%)',
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <FilmGrain />
        <ScanLines />

        {/* Real video (hidden until VIDEO_SRC is set) */}
        {hasVideo && (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC || undefined}
            muted={muted}
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: playing ? 1 : 0, transition: 'opacity 0.8s ease' }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        )}

        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: playing
              ? 'rgba(3,3,10,0.25)'
              : 'linear-gradient(180deg, rgba(3,3,10,0.55) 0%, rgba(3,3,10,0.35) 50%, rgba(3,3,10,0.75) 100%)',
            transition: 'background 0.8s ease',
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[85vh] px-4 text-center">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-8"
        >
          <hr className="accent-line" />
          <span className="section-overline">DCB AUTHORITY GROUP — SHOWREEL</span>
          <hr className="accent-line" style={{ transform: 'scaleX(-1)' }} />
        </motion.div>

        {/* Giant title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <h2
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(52px, 10vw, 140px)', letterSpacing: '-0.04em' }}
          >
            OUR
          </h2>
          <h2
            className="font-black leading-none tracking-tight text-outline"
            style={{ fontSize: 'clamp(52px, 10vw, 140px)', letterSpacing: '-0.04em' }}
          >
            SHOWREEL
          </h2>
          <p
            className="font-black text-neutral-600 leading-none"
            style={{ fontSize: 'clamp(28px, 5vw, 64px)', letterSpacing: '-0.02em' }}
          >
            2025
          </p>
        </motion.div>

        {/* Play button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlay}
            onMouseEnter={playInterface}
            aria-label={hasVideo ? 'Play Showreel' : 'Showreel coming soon'}
            className="relative group"
          >
            {/* Outer ring animation */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-[-12px] rounded-full border border-purple-500/40"
            />
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-[-24px] rounded-full border border-purple-500/20"
            />

            {/* Button core */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/[0.12] transition-all duration-300">
              <Play
                size={28}
                className="text-white ml-1.5 group-hover:scale-110 transition-transform duration-300"
                fill="white"
              />
            </div>
          </motion.button>
        </motion.div>

        {/* Coming soon badge — only when no video */}
        {!hasVideo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center gap-2.5 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/[0.07]"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
            />
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.25em]">
              Video in production — Coming soon
            </span>
          </motion.div>
        )}

        {/* Pill tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2.5 mt-10"
        >
          {['Studio Sessions', 'Cinematic Film', 'Brand Campaigns', 'Live Events', 'Digital Launches'].map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Video controls (when playing) ─────────────────────────────────── */}
      <AnimatePresence>
        {playing && showCtrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 right-8 z-20 flex items-center gap-3"
          >
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur border border-white/10 text-white hover:bg-black/60 transition-all"
              aria-label="Toggle mute"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={() => videoRef.current?.requestFullscreen?.()}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur border border-white/10 text-white hover:bg-black/60 transition-all"
              aria-label="Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom fade ───────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
};

export default ShowreelSection;
