/**
 * NotFound.jsx — Page 404 cinématique
 *
 * Full-viewport. SonicMembrane WebGL bg. "404" en Clash Display
 * avec clip-reveal. Gradient text identity. CTA sharp-corner "RETURN TO THE VOID".
 */
import React from 'react';
import { motion } from 'framer-motion';
import SonicMembrane from './SonicMembrane';

const NotFound = ({ onNavigate }) => (
  <div
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    style={{ background: '#050508' }}
  >
    {/* ── WebGL SonicMembrane background ── */}
    <div className="absolute inset-0 z-[2] pointer-events-none">
      <SonicMembrane />
    </div>

    {/* ── Dark overlay ── */}
    <div className="absolute inset-0 z-[3] bg-[#050508]/80" />

    {/* ── Fine grid ── */}
    <div
      className="absolute inset-0 z-[3] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />

    {/* ── Content ── */}
    <div className="relative z-10 text-center px-4 select-none">

      {/* Giant 404 — gradient text, NO overflow:hidden (breaks bg-clip-text) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="display-title block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white/80 to-lime-400 leading-none"
          style={{ fontSize: 'clamp(7rem, 28vw, 20rem)' }}
        >
          404
        </span>
      </motion.div>

      {/* Signal tag */}
      <motion.p
        className="font-mono uppercase tracking-[0.45em] text-neutral-600 mt-2 mb-3"
        style={{ fontSize: '9px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        — Signal Lost —
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-neutral-500 text-sm max-w-xs mx-auto mb-12 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        The page you're looking for has dissolved into the void.
      </motion.p>

      {/* CTA — matches HeroSection button style exactly */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        <button
          onClick={() => onNavigate('home')}
          className="relative inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase bg-white overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] rounded-sm"
        >
          <span
            className="absolute inset-0 w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] origin-bottom bg-lime-400 scale-y-0 group-hover:scale-y-100 z-0"
            aria-hidden="true"
          />
          <span className="relative z-10 flex items-center gap-2">
            ← RETURN TO THE VOID
          </span>
        </button>
      </motion.div>

    </div>

    {/* ── Corner coordinates — ambient data texture ── */}
    <p
      className="absolute bottom-6 right-6 font-mono text-neutral-800 pointer-events-none select-none"
      style={{ fontSize: '8px', letterSpacing: '0.15em' }}
      aria-hidden="true"
    >
      ERR_PAGE_NOT_FOUND · 0x404
    </p>
  </div>
);

export default NotFound;
