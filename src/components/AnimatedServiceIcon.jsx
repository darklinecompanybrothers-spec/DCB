/**
 * AnimatedServiceIcon — Lottie-style animated icon wrapper.
 *
 * Renders the provided Lucide icon inside:
 *   • Two concentric pulsing rings (sonar-ping effect)
 *   • A rotating orbital dot
 *   • An ambient colored glow
 *
 * Used in Services.jsx and ProcessSection.jsx.
 *
 * Props:
 *   icon      — Lucide React component (e.g. Mic2)
 *   color     — accent hex string (e.g. '#a855f7')
 *   size      — outer container size in px (default 80)
 *   iconSize  — icon stroke size (default 32)
 *   active    — if true, pulse rings animate faster (hover state)
 */

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedServiceIcon = ({ icon: Icon, color, size = 80, iconSize = 32, active = false }) => {
  const half = size / 2;

  const ringVariants = (delay, scale) => ({
    animate: {
      scale: [1, scale, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: active ? 1.6 : 2.8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  });

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* ── Ambient glow ────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          filter: `blur(${active ? 10 : 6}px)`,
          transition: 'filter 0.35s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Outer pulse ring ────────────────────────────────────────── */}
      <motion.div
        variants={ringVariants(0, 1.55)}
        animate="animate"
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          border: `1px solid ${color}`,
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* ── Inner pulse ring ────────────────────────────────────────── */}
      <motion.div
        variants={ringVariants(0.55, 1.28)}
        animate="animate"
        style={{
          position: 'absolute',
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: '50%',
          border: `1px solid ${color}`,
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />

      {/* ── Rotating orbital dot ─────────────────────────────────────── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: active ? 2.2 : 4.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: half - 3,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
          }}
        />
      </motion.div>

      {/* ── Static base circle ──────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.58,
          height: size * 0.58,
          borderRadius: '50%',
          background: `${color}0f`,
          border: `1px solid ${color}30`,
        }}
      />

      {/* ── Icon ─────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ scale: active ? 1.1 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          color,
          filter: `drop-shadow(0 0 ${active ? 10 : 5}px ${color}aa)`,
          transition: 'filter 0.35s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={iconSize} strokeWidth={1.4} />
      </motion.div>
    </div>
  );
};

export default AnimatedServiceIcon;
