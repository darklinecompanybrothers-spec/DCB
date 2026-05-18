/**
 * CardPreview.jsx — Page de preview isolée pour BusinessCard3D
 * Écran noir avec la carte au centre. Rien d'autre.
 * Pour activer : modifier main.jsx → importer CardPreview au lieu de App
 */

import React from 'react';
import BusinessCard3D from './components/BusinessCard3D';

export default function CardPreview() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050508',
        /* Grille très subtile pour donner de la profondeur */
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Orbe violet en arrière-plan — très discret */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138,43,226,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <BusinessCard3D />

      {/* Label en bas de page */}
      <p
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(115,115,115,0.45)',
          fontFamily: "'Inter', sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        DCB Authority Group — Phase 1 Preview
      </p>
    </div>
  );
}
