/**
 * WhatWeBuild.jsx  Phase 4.3 (FINAL)
 *
 * Toutes les démos actives (status: 'live') :
 *  • Real Estate    Scanner Line dorée, UI villa glassmorphism
 *  • Fine Dining    Floating Menu Card + Lens Flare, widget bordeaux
 *  • Wellness       Breathing Halo émeraude, mini-cartes biométriques
 *  • EdTech         Data Flow orbital, player vidéo holographique
 *  • FinTech & Web3 Holographic Grid, chart SVG animé, compteur portfolio
 *  • Luxury E-Com   Soft Spotlight, sélecteur matériaux, page produit épurée
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import TRANSLATIONS from '../data/translations';
import { useAudio } from '../context/SoundContext';
import useDeviceTier from '../hooks/useDeviceTier';
import Reveal from './Reveal';
import PressureCard from './PressureCard';
import {
  Building2, UtensilsCrossed, Sparkles, BookOpen,
  LineChart, ShoppingBag,
  MapPin, BedDouble, Bath, Maximize2, Wifi,
  Car, Eye, ChevronRight, CheckCircle2, Cpu, Zap,
  Calendar, Clock, Users, Star, Activity, Droplets,
  ShieldCheck, Scan, Play, Pause, Bot, TrendingUp,
  Wallet, Shield, Lock, Package, Tag
} from 'lucide-react';

/*
   CATEGORIES (toutes -> 'live')
 */
const CATEGORIES = [
  {
    id: 'realEstate',
    label: 'Real Estate',
    sublabel: 'Immobilier Prestige',
    icon: Building2,
    status: 'live',
    color: '#D4AF37',
    colorRgb: '212,175,55',
  },
  {
    id: 'fineDining',
    label: 'Fine Dining',
    sublabel: 'Restaurants',
    icon: UtensilsCrossed,
    status: 'live',
    color: '#C41E3A',
    colorRgb: '196,30,58',
  },
  {
    id: 'wellness',
    label: 'Wellness',
    sublabel: 'Beauté & Spa',
    icon: Sparkles,
    status: 'live',
    color: '#10B981',
    colorRgb: '16,185,129',
  },
  {
    id: 'edtech',
    label: 'EdTech',
    sublabel: 'Éducation',
    icon: BookOpen,
    status: 'live',            //   Phase 4.3
    color: '#2563EB',
    colorRgb: '37,99,235',
  },
  {
    id: 'fintech',
    label: 'FinTech & Web3',
    sublabel: 'Finance',
    icon: LineChart,
    status: 'live',            //   Phase 4.3
    color: '#06B6D4',
    colorRgb: '6,182,212',
  },
  {
    id: 'luxury',
    label: 'Luxury E-Commerce',
    sublabel: 'Mode / Auto',
    icon: ShoppingBag,
    status: 'live',            //   Phase 4.3
    color: '#E5E7EB',
    colorRgb: '229,231,235',
  },
];

/* 
   SHARED BROWSER CHROME
 */
const BrowserChrome = ({ url, accentColor, accentRgb }) => (
  <div style={{
    position: 'relative',
    zIndex: 20,
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 16px',
    background: 'rgba(5,5,8,0.92)',
    borderBottom: `1px solid rgba(${accentRgb},0.10)`,
  }}>
    <div style={{ display: 'flex', gap: 5 }}>
      {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
      ))}
    </div>
    <div style={{
      flex: 1, height: 24,
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid rgba(${accentRgb},0.12)`,
      borderRadius: 6,
      display: 'flex', alignItems: 'center',
      padding: '0 10px', gap: 6,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28CA41', boxShadow: '0 0 6px #28CA41' }} />
      <span style={{ fontFamily: 'monospace', fontSize: 9, color: `rgba(${accentRgb},0.6)`, letterSpacing: '0.04em' }}>
        {url}
      </span>
    </div>
    <span style={{
      fontSize: 8, fontWeight: 800, letterSpacing: '0.2em',
      color: `rgba(${accentRgb},0.5)`,
      fontFamily: "'Space Grotesk', sans-serif",
      textTransform: 'uppercase',
    }}>DCB</span>
  </div>
);

/* 
   SCANNER LINE  (Real Estate)
 */
const ScannerLine = ({ color = '#D4AF37' }) => {
  const y = useMotionValue(0);
  useEffect(() => {
    const ctrl = animate(y, ['0%', '100%', '0%'], { duration: 4.5, repeat: Infinity, ease: 'easeInOut' });
    return ctrl.stop;
  }, [y]);
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute', left: 0, right: 0, height: 2, top: y,
        background: `linear-gradient(90deg, transparent 0%, ${color}88 20%, ${color} 50%, ${color}88 80%, transparent 100%)`,
        boxShadow: `0 0 12px 3px ${color}55, 0 0 30px 6px ${color}22`,
        pointerEvents: 'none', zIndex: 20,
      }}
    />
  );
};

/* 
   REAL ESTATE DEMO
 */
const RealEstateDemo = () => {
  const features = [
    { icon: <BedDouble size={12} />, label: '5 Chambres' },
    { icon: <Bath size={12} />, label: '3 SdB' },
    { icon: <Maximize2 size={12} />, label: '420 m²' },
    { icon: <Car size={12} />, label: 'Garage 3 véh.' },
    { icon: <Wifi size={12} />, label: 'Smart Home' },
    { icon: <Eye size={12} />, label: 'Vue Mer' },
  ];

  return (
    <div style={{
      position: 'relative', width: '100%', borderRadius: 16, overflow: 'hidden',
      background: 'rgba(8,8,12,0.85)',
      border: '1px solid rgba(212,175,55,0.18)',
      boxShadow: '0 0 60px rgba(212,175,55,0.08), 0 40px 80px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(24px)',
    }}>
      <BrowserChrome url="prestige-immobilier.tn/villa-sidi-bou" accentColor="#D4AF37" accentRgb="212,175,55" />

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop)',
            backgroundSize: 'cover', backgroundPosition: 'center 40%', transform: 'scale(1.03)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.15) 50%, rgba(5,5,8,0.85) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: '0.14em', color: '#D4AF37', textTransform: 'uppercase', textShadow: '0 0 20px rgba(212,175,55,0.5)' }}>PRESTIGE IMMOBILIER</span>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {['Accueil', 'Ventes', 'Contact'].map(item => (
                <span key={item} style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{item}</span>
              ))}
              <div style={{ padding: '4px 10px', borderRadius: 4, background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.35)', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', color: '#D4AF37', fontFamily: "'Space Grotesk', sans-serif" }}>Nous Contacter</div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 18 }}>
            <p style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>SIDI BOU SAÏD · TUNISIE</p>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 20, color: 'white', letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(0,0,0,0.8)', lineHeight: 1.1 }}>Villa Belvédère</h3>
          </div>
          <div style={{ position: 'absolute', top: 14, right: 18, padding: '3px 8px', borderRadius: 3, background: 'rgba(212,175,55,0.20)', border: '1px solid rgba(212,175,55,0.40)', fontSize: 7, fontWeight: 800, letterSpacing: '0.2em', color: '#FFE066', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif", backdropFilter: 'blur(8px)' }}>EXCLUSIVITÉ</div>
        </div>

        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(8,8,12,0.95)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.25)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.55)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>Prix</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 18, color: '#D4AF37', textShadow: '0 0 20px rgba(212,175,55,0.4)', letterSpacing: '-0.02em', lineHeight: 1 }}>850 000<span style={{ fontSize: 10, fontWeight: 600, marginLeft: 3, color: 'rgba(212,175,55,0.7)' }}>DT</span></p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(180,180,180,0.4)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>Localisation</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={9} style={{ color: '#D4AF37', flexShrink: 0 }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 10, color: 'rgba(220,220,220,0.85)', letterSpacing: '-0.01em', lineHeight: 1 }}>Sidi Bou Saïd</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>Visite</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 6px #D4AF37' }} animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, color: '#D4AF37', letterSpacing: '0.04em' }}>360° Live</p>
              </div>
            </motion.div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', borderRadius: 5, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(180,180,180,0.7)', fontSize: 9, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                <span style={{ color: 'rgba(212,175,55,0.7)', flexShrink: 0 }}>{f.icon}</span>
                {f.label}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }} style={{ padding: '9px 14px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(255,215,0,0.08) 100%)', border: '1px solid rgba(212,175,55,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4AF37' }}>Demander une Visite Privée</span>
            <ChevronRight size={10} style={{ color: '#D4AF37' }} />
          </motion.div>
        </div>

        <ScannerLine color="#D4AF37" />
      </div>
    </div>
  );
};

/* 
   FINE DINING DEMO
 */
const FineDiningDemo = () => {
  const floatY = useMotionValue(0);
  useEffect(() => {
    const ctrl = animate(floatY, [0, -10, 0], { duration: 4, repeat: Infinity, ease: 'easeInOut' });
    return ctrl.stop;
  }, [floatY]);

  const flareX = useMotionValue(-20);
  useEffect(() => {
    const ctrl = animate(flareX, [-20, 130], { duration: 5, repeat: Infinity, repeatDelay: 3, ease: [0.4, 0, 0.6, 1] });
    return ctrl.stop;
  }, [flareX]);

  const menuItems = [
    { name: 'Saint-Jacques Poêlées', price: '48 €', stars: 3 },
    { name: 'Filet de Bœuf Wagyu', price: '95 €', stars: 3 },
    { name: 'Soufflé au Grand Marnier', price: '32 €', stars: 2 },
  ];

  return (
    <div style={{
      position: 'relative', width: '100%', borderRadius: 16, overflow: 'hidden',
      background: 'rgba(5,2,2,0.92)',
      border: '1px solid rgba(196,30,58,0.20)',
      boxShadow: '0 0 60px rgba(139,0,0,0.12), 0 40px 80px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(24px)',
    }}>
      <BrowserChrome url="laterrasse-etoilee.fr/reservation" accentColor="#C41E3A" accentRgb="196,30,58" />

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img loading="lazy"
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80&auto=format&fit=crop"
            alt="Fine dining concept preview"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.04)' }}
          />
          {/* Vidéo au survol (Seulement si le projet possède une videoPreview) */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,2,2,0.5) 0%, rgba(5,2,2,0.2) 40%, rgba(5,2,2,0.90) 100%)' }} />

          <motion.div aria-hidden="true" style={{ position: 'absolute', top: '-30%', bottom: '-30%', width: 80, left: flareX, background: 'linear-gradient(105deg, transparent 0%, rgba(255,200,150,0.08) 40%, rgba(255,240,220,0.14) 50%, rgba(255,200,150,0.08) 60%, transparent 100%)', transform: 'skewX(-20deg)', pointerEvents: 'none', zIndex: 10, filter: 'blur(4px)' }} />

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 2 }}>{[...Array(3)].map((_, i) => <Star key={i} size={8} style={{ color: '#C41E3A', fill: '#C41E3A' }} />)}</div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: '0.18em', color: 'white', textTransform: 'uppercase', textShadow: '0 0 16px rgba(0,0,0,0.8)' }}>LA TERRASSE</span>
            </div>
            <div style={{ padding: '3px 10px', borderRadius: 3, background: 'rgba(196,30,58,0.20)', border: '1px solid rgba(196,30,58,0.40)', fontSize: 7, fontWeight: 800, letterSpacing: '0.2em', color: '#E8688A', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif" }}>ÉTOILÉ MICHELIN</div>
          </div>

          <motion.div style={{ y: floatY, position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 130, padding: '10px 12px', borderRadius: 10, background: 'rgba(15,5,5,0.82)', border: '1px solid rgba(196,30,58,0.30)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(139,0,0,0.15)', zIndex: 15 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(196,30,58,0.7)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>MENU DÉGUSTATION</p>
            {menuItems.map((item, i) => (
              <div key={i} style={{ marginBottom: i < menuItems.length - 1 ? 7 : 0, paddingBottom: i < menuItems.length - 1 ? 7 : 0, borderBottom: i < menuItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8.5, color: 'rgba(220,210,200,0.85)', fontStyle: 'italic', lineHeight: 1.3, flex: 1 }}>{item.name}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, fontWeight: 700, color: '#C41E3A', flexShrink: 0 }}>{item.price}</span>
                </div>
                <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>{[...Array(item.stars)].map((_, j) => <Star key={j} size={6} style={{ color: '#C41E3A', fill: '#C41E3A' }} />)}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div style={{ padding: '16px 18px', background: 'rgba(5,2,2,0.97)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(196,30,58,0.6)', fontFamily: "'Space Grotesk', sans-serif" }}> RÉSERVATION</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ icon: <Calendar size={10} />, label: 'Date', value: '14 Juin 2025' }, { icon: <Clock size={10} />, label: 'Heure', value: '20:30' }, { icon: <Users size={10} />, label: 'Couverts', value: '2 pers.' }].map((field, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,30,58,0.18)', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, color: 'rgba(196,30,58,0.6)' }}>{field.icon}<span style={{ fontSize: 7, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(160,130,130,0.5)' }}>{field.label}</span></div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: 'rgba(230,220,215,0.85)' }}>{field.value}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} style={{ position: 'relative' }}>
            <motion.div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'rgba(139,0,0,0.4)', filter: 'blur(8px)', zIndex: 0 }} animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.03, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: '10px 14px', borderRadius: 8, background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 60%, #8B0000 100%)', border: '1px solid rgba(196,30,58,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,220,220,0.95)' }}>CONFIRMER LA RÉSERVATION</span>
              <ChevronRight size={10} style={{ color: 'rgba(255,200,200,0.8)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* 
   WELLNESS DEMO
 */
const WellnessDemo = () => {
  const bioCards = [
    { label: 'Hydratation', value: '98%', icon: <Droplets size={10} />, top: '12%', left: '-8%', delay: 0.3 },
    { label: 'Vitalité', value: '94 / 100', icon: <Activity size={10} />, top: '55%', left: '-10%', delay: 0.5 },
    { label: 'SkinCare Scan', value: 'Terminé', icon: <Scan size={10} />, top: '15%', right: '-8%', delay: 0.4 },
    { label: 'UV Protection', value: 'Optimal', icon: <ShieldCheck size={10} />, top: '60%', right: '-8%', delay: 0.6 },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 16, overflow: 'hidden', background: 'rgba(2,8,6,0.92)', border: '1px solid rgba(16,185,129,0.18)', boxShadow: '0 0 60px rgba(16,185,129,0.08), 0 40px 80px rgba(0,0,0,0.7)', backdropFilter: 'blur(24px)' }}>
      <BrowserChrome url="clinique-lumiere.tn/diagnostic-soin" accentColor="#10B981" accentRgb="16,185,129" />
      <div style={{ position: 'relative', overflow: 'visible' }}>
        <div style={{ position: 'relative', height: 240, overflow: 'visible', margin: '0 48px' }}>
          <motion.div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.08) 45%, transparent 70%)', filter: 'blur(28px)', pointerEvents: 'none', zIndex: 1 }} animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(16,185,129,0.12)', pointerEvents: 'none', zIndex: 1 }} animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center top', borderRadius: 12, zIndex: 2 }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(to bottom, rgba(2,8,6,0.25) 0%, rgba(2,8,6,0.10) 50%, rgba(2,8,6,0.80) 100%)', zIndex: 3 }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'radial-gradient(ellipse at center, transparent 50%, rgba(2,8,6,0.6) 100%)', zIndex: 4 }} />
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, padding: '4px 10px', borderRadius: 4, background: 'rgba(2,8,6,0.75)', border: '1px solid rgba(16,185,129,0.35)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#10B981', fontFamily: "'Space Grotesk', sans-serif" }}>DIAGNOSTIC ACTIF</span>
          </motion.div>
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
            <p style={{ fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(16,185,129,0.7)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 2 }}>SKIN SCORE</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 26, color: '#10B981', textShadow: '0 0 24px rgba(16,185,129,0.6)', letterSpacing: '-0.03em', lineHeight: 1 }}>96<span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(16,185,129,0.6)' }}>/100</span></p>
          </div>
          {bioCards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: card.delay }} style={{ position: 'absolute', top: card.top, ...(card.left ? { left: card.left } : {}), ...(card.right ? { right: card.right } : {}), width: 90, padding: '7px 10px', borderRadius: 9, background: 'rgba(2,8,6,0.82)', border: '1px solid rgba(16,185,129,0.25)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 12px rgba(16,185,129,0.08)', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, color: '#10B981' }}>{card.icon}<span style={{ fontSize: 7, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(100,180,150,0.6)', fontFamily: "'Space Grotesk', sans-serif" }}>{card.label}</span></div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 12, color: '#10B981', textShadow: '0 0 10px rgba(16,185,129,0.4)', letterSpacing: '-0.01em' }}>{card.value}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ padding: '14px 18px', background: 'rgba(2,8,6,0.97)', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          {[{ label: 'Hydratation Profonde', pct: 92 }, { label: 'Luminosité Boost', pct: 78 }, { label: 'Anti-âge Protocol', pct: 65 }].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'rgba(160,210,185,0.7)', width: 110, flexShrink: 0 }}>{item.label}</span>
              <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, rgba(16,185,129,0.6), #10B981)', borderRadius: 2 }} initial={{ width: '0%' }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: [0.23, 1, 0.32, 1] }} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, fontWeight: 700, color: '#10B981', width: 28, textAlign: 'right', flexShrink: 0 }}>{item.pct}%</span>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }} style={{ padding: '9px 14px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.06))', border: '1px solid rgba(16,185,129,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#10B981' }}>Réserver ma Séance Diagnostic</span>
            <ChevronRight size={10} style={{ color: '#10B981' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* 
   EDTECH DEMO
   Animation : Data Flow orbital (particules bleues) + Player vidéo holographique
 */
const EdTechDemo = () => {
  /* Progress bar du lecteur vidéo */
  const progressRef = useRef(null);
  useEffect(() => {
    if (!progressRef.current) return;
    const ctrl = animate(progressRef.current, { scaleX: [0.22, 0.84] }, {
      duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'mirror',
    });
    return ctrl.stop;
  }, []);

  /* Particules Data Flow  8 points qui orbitent */
  const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
    angle: (i / 8) * 360,
    radius: 58 + (i % 3) * 10,
    size: i % 2 === 0 ? 3 : 2,
    delay: i * 0.35,
    opacity: 0.4 + (i % 3) * 0.2,
  }));

  return (
    <div style={{
      position: 'relative', width: '100%', borderRadius: 16, overflow: 'hidden',
      background: 'rgba(2,4,12,0.93)',
      border: '1px solid rgba(37,99,235,0.20)',
      boxShadow: '0 0 60px rgba(37,99,235,0.10), 0 40px 80px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(24px)',
    }}>
      <BrowserChrome url="campus.dcb.build/module-ia-web" accentColor="#2563EB" accentRgb="37,99,235" />

      <div style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Image étudiant / learning */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&auto=format&fit=crop)',
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
            transform: 'scale(1.04)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,4,12,0.55) 0%, rgba(2,4,12,0.20) 40%, rgba(2,4,12,0.92) 100%)' }} />
          {/* Overlay bleu subtil */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(37,99,235,0.18) 0%, transparent 60%)' }} />

          {/* Header fictif plateforme */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={11} style={{ color: 'white' }} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 11, letterSpacing: '0.14em', color: 'white', textTransform: 'uppercase' }}>DCB Campus</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Modules', 'Live', 'Certif'].map(item => (
                <span key={item} style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(180,190,255,0.55)', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{item}</span>
              ))}
            </div>
          </div>

          {/*  LECTEUR VID0O HOLOGRAPHIQUE  */}
          <div style={{
            position: 'absolute', left: '50%', bottom: 12,
            transform: 'translateX(-50%)',
            width: 200, padding: '8px 12px',
            borderRadius: 10,
            background: 'rgba(2,4,20,0.80)',
            border: '1px solid rgba(37,99,235,0.30)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 20px rgba(37,99,235,0.12)',
            zIndex: 10,
          }}>
            {/* Titre module */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: 'rgba(150,170,255,0.65)', letterSpacing: '0.05em', marginBottom: 4 }}>
              Module 3 · Intelligence Artificielle & Web
            </p>
            {/* Contrôles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Play size={9} style={{ color: '#2563EB', marginLeft: 1 }} />
              </div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 9, color: 'rgba(200,210,255,0.85)', flex: 1 }}>Intro au Prompt Engineering</p>
              <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(100,120,200,0.5)' }}>14:32</span>
            </div>
            {/* Barre de progression animée */}
            <div style={{ height: 3, background: 'rgba(37,99,235,0.12)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                ref={progressRef}
                style={{
                  height: '100%', width: '100%', originX: 0,
                  background: 'linear-gradient(90deg, rgba(37,99,235,0.7), #2563EB, #7C3AED)',
                  borderRadius: 2,
                }}
                initial={{ scaleX: 0.22 }}
              />
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(100,120,200,0.4)', marginTop: 3, textAlign: 'right' }}>22% complété</p>
          </div>

          {/*  DATA FLOW ORBITAL  particules bleues  */}
          <div style={{ position: 'absolute', top: 22, right: 22, width: 120, height: 120, zIndex: 8 }}>
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: p.size, height: p.size,
                  borderRadius: '50%',
                  background: '#2563EB',
                  boxShadow: `0 0 ${p.size * 3}px #2563EB`,
                  opacity: p.opacity,
                }}
                animate={{
                  x: [
                    Math.cos((p.angle * Math.PI) / 180) * p.radius,
                    Math.cos(((p.angle + 180) * Math.PI) / 180) * p.radius,
                    Math.cos((p.angle * Math.PI) / 180) * p.radius,
                  ],
                  y: [
                    Math.sin((p.angle * Math.PI) / 180) * p.radius,
                    Math.sin(((p.angle + 180) * Math.PI) / 180) * p.radius,
                    Math.sin((p.angle * Math.PI) / 180) * p.radius,
                  ],
                }}
                transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
              />
            ))}
            {/* Centre du data flow */}
            <motion.div
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              animate={{ boxShadow: ['0 0 8px rgba(37,99,235,0.3)', '0 0 20px rgba(37,99,235,0.6)', '0 0 8px rgba(37,99,235,0.3)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Cpu size={12} style={{ color: '#2563EB' }} />
            </motion.div>
          </div>
        </div>

        {/* Zone inférieure : mini-cartes état */}
        <div style={{ padding: '14px 18px', background: 'rgba(2,4,12,0.97)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* AI Tutor */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ flex: 1, padding: '9px 12px', borderRadius: 9, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.20)', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2563EB', boxShadow: '0 0 6px #2563EB' }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2563EB', fontFamily: "'Space Grotesk', sans-serif" }}>AI TUTOR</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(200,210,255,0.85)' }}>En Ligne</p>
              <p style={{ fontSize: 8, color: 'rgba(100,120,200,0.55)', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>Répond en &lt; 2 sec</p>
            </motion.div>
            {/* Progression module */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} style={{ flex: 1, padding: '9px 12px', borderRadius: 9, background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.20)', backdropFilter: 'blur(8px)' }}>
              <p style={{ fontSize: 7, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.6)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>MODULE 3</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 18, color: '#7C3AED', textShadow: '0 0 16px rgba(124,58,237,0.5)', letterSpacing: '-0.02em', lineHeight: 1 }}>84<span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(167,139,250,0.6)' }}>%</span></p>
              <div style={{ marginTop: 5, height: 2, background: 'rgba(124,58,237,0.10)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #7C3AED, rgba(124,58,237,0.5))', borderRadius: 2 }} initial={{ width: '0%' }} animate={{ width: '84%' }} transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }} />
              </div>
            </motion.div>
            {/* Classement */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} style={{ flex: 1, padding: '9px 12px', borderRadius: 9, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
              <p style={{ fontSize: 7, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(150,150,160,0.5)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>CLASSEMENT</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 18, color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}>#12<span style={{ fontSize: 9, fontWeight: 500, color: 'rgba(150,150,160,0.5)' }}>/847</span></p>
              <p style={{ fontSize: 8, color: 'rgba(100,120,200,0.4)', fontFamily: "'Inter', sans-serif", marginTop: 2 }}>Top 2%</p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} style={{ padding: '9px 14px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(37,99,235,0.20), rgba(124,58,237,0.10))', border: '1px solid rgba(37,99,235,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2563EB' }}>Lancer la Plateforme</span>
            <ChevronRight size={10} style={{ color: '#2563EB' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* 
   FINTECH & WEB3 DEMO
   Animation : Holographic Grid + Chart SVG + Compteur Portfolio
 */
const FinTechDemo = () => {
  /* Compteur portfolio animé */
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const target = 124500;
    const duration = 2200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => requestAnimationFrame(tick), 400);
    return () => clearTimeout(timeout);
  }, []);

  /* Path SVG du graphique  courbe montante avec volatilité */
  const chartPath = 'M 0 55 C 15 50, 25 62, 40 48 S 60 30, 80 38 S 105 22, 120 18 S 145 28, 160 15 S 180 8, 200 5';

  return (
    <div style={{
      position: 'relative', width: '100%', borderRadius: 16, overflow: 'hidden',
      background: 'rgba(0,6,10,0.95)',
      border: '1px solid rgba(6,182,212,0.18)',
      boxShadow: '0 0 60px rgba(6,182,212,0.08), 0 40px 80px rgba(0,0,0,0.8)',
      backdropFilter: 'blur(24px)',
    }}>
      <BrowserChrome url="dcb-wallet.io/portfolio" accentColor="#06B6D4" accentRgb="6,182,212" />

      <div style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Image de fond abstraite + holographic grid */}
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1605792657660-596af9009e82?w=900&q=80&auto=format&fit=crop)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            transform: 'scale(1.05)',
            filter: 'saturate(0.4) brightness(0.5)',
          }} />

          {/*  HOLOGRAPHIC GRID  lignes fines qui défilent vers le haut  */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
              zIndex: 2,
            }}
            animate={{ backgroundPositionY: ['0px', '-28px'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Overlay couleur */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,6,10,0.40) 0%, rgba(0,6,10,0.15) 40%, rgba(0,6,10,0.95) 100%)', zIndex: 3 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.12) 0%, transparent 55%)', zIndex: 3 }} />

          {/* Header terminal fictif */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', zIndex: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={10} style={{ color: '#06B6D4' }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(6,182,212,0.8)' }}>DCB_WALLET v2.4</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 4, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.20)' }}>
              <motion.div style={{ width: 4, height: 4, borderRadius: '50%', background: '#06B6D4' }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
              <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(6,182,212,0.7)' }}>LIVE</span>
            </div>
          </div>

          {/*  PORTFOLIO CARD + CHART SVG  */}
          <div style={{
            position: 'absolute', bottom: 12, left: 18, right: 18, zIndex: 6,
            padding: '10px 14px',
            borderRadius: 10,
            background: 'rgba(0,6,14,0.80)',
            border: '1px solid rgba(6,182,212,0.22)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <p style={{ fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(6,182,212,0.5)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 2 }}>PORTFOLIO TOTAL</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 22, color: '#06B6D4', textShadow: '0 0 20px rgba(6,182,212,0.5)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  ${displayValue.toLocaleString('en-US')}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginBottom: 2 }}>
                  <TrendingUp size={10} style={{ color: '#10B981' }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 12, color: '#10B981' }}>+18.4%</span>
                </div>
                <p style={{ fontSize: 7, color: 'rgba(100,120,130,0.5)', fontFamily: "'Inter', sans-serif" }}>24h change</p>
              </div>
            </div>

            {/* Graphique SVG animé */}
            <div style={{ position: 'relative', height: 45, overflow: 'hidden' }}>
              {/* Zone sous la courbe */}
              <svg width="100%" height="60" viewBox="0 0 200 65" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
                    <stop offset="60%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <clipPath id="chartClip">
                    <motion.rect x="0" y="0" height="65" initial={{ width: 0 }} animate={{ width: 200 }} transition={{ duration: 1.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }} />
                  </clipPath>
                </defs>
                <path d={`${chartPath} L 200 65 L 0 65 Z`} fill="url(#chartFill)" clipPath="url(#chartClip)" />
                <path d={chartPath} fill="none" stroke="url(#chartStroke)" strokeWidth="1.5" strokeLinecap="round" clipPath="url(#chartClip)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Zone inférieure : tokens */}
        <div style={{ padding: '12px 18px', background: 'rgba(0,6,10,0.98)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { symbol: 'ETH', name: 'Ethereum', value: '$67,420', change: '+12.3%', up: true },
            { symbol: 'BTC', name: 'Bitcoin', value: '$42,100', change: '+4.7%', up: true },
            { symbol: 'SOL', name: 'Solana', value: '$14,980', change: '-2.1%', up: false },
          ].map((token, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', borderRadius: 7, background: 'rgba(6,182,212,0.03)', border: '1px solid rgba(6,182,212,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 7, fontWeight: 800, color: '#06B6D4' }}>{token.symbol[0]}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, color: 'rgba(200,220,230,0.85)' }}>{token.symbol}</p>
                  <p style={{ fontSize: 7, color: 'rgba(80,100,110,0.55)', fontFamily: "'Inter', sans-serif" }}>{token.name}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, color: 'rgba(200,220,230,0.85)' }}>{token.value}</p>
                <p style={{ fontSize: 8, fontWeight: 700, color: token.up ? '#10B981' : '#EF4444', fontFamily: "'Space Grotesk', sans-serif" }}>{token.change}</p>
              </div>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} style={{ padding: '9px 14px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(124,58,237,0.08))', border: '1px solid rgba(6,182,212,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
            <Lock size={10} style={{ color: '#06B6D4' }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#06B6D4' }}>Accéder au Terminal</span>
            <ChevronRight size={10} style={{ color: '#06B6D4' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* 
   LUXURY E-COMMERCE DEMO
   Animation : Soft Spotlight (gradient radial qui balaie lentement)
 */
const LuxuryDemo = () => {
  /* Soft Spotlight  position X de 0% à 100% */
  const spotX = useMotionValue(-20);
  useEffect(() => {
    const ctrl = animate(spotX, [-20, 120], {
      duration: 6, repeat: Infinity, repeatDelay: 1.5,
      ease: [0.4, 0, 0.6, 1],
    });
    return ctrl.stop;
  }, [spotX]);

  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const materials = [
    { label: 'Acier', color: '#C8C8CC' },
    { label: 'Titane', color: '#8E8EA0' },
    { label: 'Or Rose', color: '#D4A574' },
  ];

  return (
    <div style={{
      position: 'relative', width: '100%', borderRadius: 16, overflow: 'hidden',
      background: 'rgba(4,4,6,0.97)',
      border: '1px solid rgba(229,231,235,0.10)',
      boxShadow: '0 0 60px rgba(229,231,235,0.04), 0 40px 80px rgba(0,0,0,0.8)',
      backdropFilter: 'blur(24px)',
    }}>
      <BrowserChrome url="maison-dcb.com/collection-horlogerie" accentColor="#E5E7EB" accentRgb="229,231,235" />

      <div style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Image montre de luxe */}
        <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=80&auto=format&fit=crop)',
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
            transform: 'scale(1.04)',
            filter: 'saturate(0.15) brightness(0.85)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,4,6,0.35) 0%, rgba(4,4,6,0.10) 40%, rgba(4,4,6,0.92) 100%)' }} />

          {/*  SOFT SPOTLIGHT  */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute', top: '-20%', bottom: '-20%',
              width: '55%',
              left: spotX,
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)',
              pointerEvents: 'none', zIndex: 4,
              filter: 'blur(10px)',
            }}
          />

          {/* Header fictif Maison */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', zIndex: 5 }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: '0.28em', color: 'rgba(229,231,235,0.90)', textTransform: 'uppercase' }}>MAISON DCB</span>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              {['Collection', 'Atelier', 'Contact'].map(item => (
                <span key={item} style={{ fontSize: 8, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(200,200,200,0.40)', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Badge Édition Limitée flottant */}
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              position: 'absolute', top: 14, right: 18, zIndex: 5,
              padding: '3px 10px', borderRadius: 3,
              background: 'rgba(229,231,235,0.06)',
              border: '1px solid rgba(229,231,235,0.18)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(229,231,235,0.65)', fontFamily: "'Space Grotesk', sans-serif" }}>0DITION LIMIT0E</span>
          </motion.div>

          {/* Titre produit */}
          <div style={{ position: 'absolute', bottom: 14, left: 20, zIndex: 5 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,200,200,0.40)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>COLLECTION PRESTIGE · 2025</p>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 18, color: 'rgba(229,231,235,0.95)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Chronographe Noir</h3>
          </div>
        </div>

        {/* Zone inférieure  page produit épurée */}
        <div style={{ padding: '16px 20px', background: 'rgba(4,4,6,0.99)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Prix + Disponibilité */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(180,180,180,0.35)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 2 }}>Prix</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 22, color: 'rgba(229,231,235,0.95)', letterSpacing: '-0.03em', lineHeight: 1 }}>12 800 <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(180,180,180,0.45)' }}></span></p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 5, background: 'rgba(229,231,235,0.04)', border: '1px solid rgba(229,231,235,0.10)' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#E5E7EB', opacity: 0.5 }} />
              <span style={{ fontSize: 8, color: 'rgba(180,180,180,0.45)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.08em' }}>3 exemplaires restants</span>
            </div>
          </div>

          {/*  SÉLECTEUR DE MATÉRIAUX (verre dépoli)  */}
          <div>
            <p style={{ fontSize: 7, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(150,150,155,0.40)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 7 }}>Matériau du boîtier</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {materials.map((mat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMaterial(i)}
                  style={{
                    flex: 1, padding: '7px 10px', borderRadius: 7,
                    background: selectedMaterial === i ? 'rgba(229,231,235,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${selectedMaterial === i ? 'rgba(229,231,235,0.30)' : 'rgba(255,255,255,0.06)'}`,
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: mat.color, boxShadow: selectedMaterial === i ? `0 0 10px ${mat.color}60` : 'none', transition: 'all 0.2s' }} />
                  <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.08em', color: selectedMaterial === i ? 'rgba(229,231,235,0.85)' : 'rgba(120,120,125,0.50)', fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s' }}>{mat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bouton Ajouter au panier  net, minimaliste */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: 8 }}
          >
            <button style={{
              flex: 1, padding: '11px 16px', borderRadius: 8,
              background: 'rgba(229,231,235,0.96)',
              border: '1px solid rgba(229,231,235,0.96)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Package size={11} style={{ color: '#050508' }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#050508' }}>Ajouter au Panier</span>
            </button>
            <button style={{
              padding: '11px 14px', borderRadius: 8,
              background: 'transparent',
              border: '1px solid rgba(229,231,235,0.12)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Star size={13} style={{ color: 'rgba(200,200,200,0.4)' }} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* 
   PLACEHOLDER "COMING SOON" (au cas où)
 */
const ComingSoonDemo = ({ category }) => (
  <div style={{
    position: 'relative', width: '100%', minHeight: 420, borderRadius: 16, overflow: 'hidden',
    background: 'rgba(8,8,12,0.85)',
    border: `1px solid rgba(${category.colorRgb},0.15)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
  }}>
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 50%, rgba(${category.colorRgb},0.07) 0%, transparent 65%)`, filter: 'blur(40px)' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(${category.colorRgb},0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(${category.colorRgb},0.04) 1px, transparent 1px)`, backgroundSize: '32px 32px', pointerEvents: 'none' }} />
    <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 64, height: 64, borderRadius: '50%', background: `rgba(${category.colorRgb},0.08)`, border: `1px solid rgba(${category.colorRgb},0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: category.color, position: 'relative', zIndex: 1 }}>
      <category.icon size={28} />
    </motion.div>
    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 18, color: 'white', letterSpacing: '-0.02em', marginBottom: 6 }}>{category.label}</p>
      <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: `rgba(${category.colorRgb},0.5)`, fontFamily: "'Space Grotesk', sans-serif" }}>Démo en cours de production</p>
    </div>
  </div>
);

/* 
   DATA PANELS (toutes les 6 catégories)
 */
const PANEL_DATA = {
  realEstate: {
    title: 'Real Estate',
    subtitle: 'Immobilier Prestige',
    videoPreview: '/videos/concept-real-estate.mp4',
    description: "Nous concevons des expériences digitales qui transforment la vente immobilière de luxe. Chaque détail — de la galerie immersive aux formulaires de qualification — est pensé pour convertir vos prospects les plus exigeants.",
    stack: ['Next.js 14', 'Three.js', 'Framer Motion', 'Prisma'],
    features: [
      { label: 'Visites Virtuelles 360°',     badge: 'Three.js',  delay: 0    },
      { label: 'Galerie Cinématique',          badge: 'GSAP',      delay: 0.08 },
      { label: 'Filtres Multi-Critères',       badge: 'Algolia',   delay: 0.16 },
      { label: 'CRM Intégré',                  badge: 'API REST',  delay: 0.24 },
      { label: 'Estimation IA temps réel',     badge: 'ML Model',  delay: 0.32 },
      { label: 'Chat Qualifiant Auto',        badge: 'GPT-4',     delay: 0.40 },
    ],
    metrics: [
      { value: '+340%', label: 'Leads qualifiés' },
      { value: '8.2s',  label: 'Temps de visite' },
      { value: '97%',   label: 'Satisfaction'     },
    ],
    ctaRoute: 'example-realestate',
  },
  fineDining: {
    title: 'Fine Dining',
    subtitle: 'Gastronomie Étoilée',
    videoPreview: '/videos/concept-fine-dining.mp4',
    description: "De la réservation en ligne à la gestion des tables en temps réel, nous construisons des expériences digitales qui honorent l'art de la table et transforment chaque visiteur en convive fidèle.",
    stack: ['Next.js 14', 'WebGL', 'OpenTable API', 'Stripe'],
    features: [
      { label: 'Menu WebGL Interactif',       badge: 'WebGL Menus',    delay: 0    },
      { label: 'Réservation Temps Réel',       badge: 'OpenTable API',  delay: 0.08 },
      { label: 'Paiement Dépôt Anticipé',      badge: 'Stripe Connect', delay: 0.16 },
      { label: 'QR Code Table Management',     badge: 'Realtime DB',    delay: 0.24 },
      { label: 'Waitlist & CRM Invités',       badge: 'Segment.io',     delay: 0.32 },
      { label: 'Notifications SMS Rappel',     badge: 'Twilio',         delay: 0.40 },
    ],
    metrics: [
      { value: '+120%', label: 'Réservations' },
      { value: '-65%',  label: 'No-shows'      },
      { value: '4.9/5',  label: 'Note Google'   },
    ],
    ctaRoute: 'contact',
  },
  wellness: {
    title: 'Wellness',
    subtitle: 'Beauté & Cliniques Spa',
    videoPreview: '/videos/concept-wellness.mp4',
    description: "Nous créons des interfaces médicales-esthétiques qui rassurent et convertissent. Du diagnostic IA à la gestion des rendez-vous, votre clinique devient une expérience digitale premium de bout en bout.",
    stack: ['React 18', 'TensorFlow.js', 'Calendly API', 'HIPAA'],
    features: [
      { label: 'AI Face Scan & Diagnostic',   badge: 'AI Face Scan',    delay: 0    },
      { label: 'Booking System Intelligent',  badge: 'Booking System',  delay: 0.08 },
      { label: 'Conformité Données Médicales',badge: 'HIPAA Compliant', delay: 0.16 },
      { label: 'Suivi Protocole Client',       badge: 'Timeline CRM',    delay: 0.24 },
      { label: 'Before/After Comparateur',     badge: 'Canvas API',      delay: 0.32 },
      { label: 'Programme Fidélité',           badge: 'Loyalty Engine',  delay: 0.40 },
    ],
    metrics: [
      { value: '-40%', label: 'No-Shows'    },
      { value: '+85%', label: 'Taux retour' },
      { value: '98%',  label: 'Satisfaction'},
    ],
    ctaRoute: 'contact',
  },
  edtech: {
    title: 'EdTech',
    subtitle: 'Université du Futur',
    videoPreview: '/videos/concept-edtech.mp4',
    description: "Nous bâtissons des plateformes d'apprentissage de nouvelle génération — IA Tutor, vidéo CDN adaptatif, gamification — qui transforment l'engagement étudiant et propulsent les résultats académiques.",
    stack: ['Next.js 14', 'AI Tutor', 'Video CDN', 'LMS API'],
    features: [
      { label: 'AI Tutor Personnalisé',        badge: 'LMS Integration', delay: 0    },
      { label: 'Correction Automatique IA',    badge: 'AI Grading',      delay: 0.08 },
      { label: 'Vidéo Adaptative HD',          badge: 'Video CDN',       delay: 0.16 },
      { label: 'Gamification & Badges',        badge: 'XP Engine',       delay: 0.24 },
      { label: 'Analytics Pédagogique',        badge: 'Dashboard Pro',   delay: 0.32 },
      { label: 'Certification Blockchain',     badge: 'NFT Cert',        delay: 0.40 },
    ],
    metrics: [
      { value: '+210%', label: 'Engagement'  },
      { value: '99.9%', label: 'Uptime'      },
      { value: '4.8/5',  label: 'App Rating'  },
    ],
    ctaRoute: 'contact',
  },
  fintech: {
    title: 'FinTech & Web3',
    subtitle: 'Finance & Blockchain',
    videoPreview: '/videos/concept-fintech.mp4',
    description: "Des interfaces de trading et de gestion d'actifs numériques qui inspirent confiance. Nous maîtrisons la réglementation, la sécurité AES-256 et l'UX temps réel pour les produits financiers les plus exigeants.",
    stack: ['React 18', 'Smart Contracts', 'Plaid API', 'AES-256'],
    features: [
      { label: 'Smart Contracts Audités',      badge: 'Smart Contracts', delay: 0    },
      { label: 'Connexion Bancaire Open',      badge: 'Plaid API',       delay: 0.08 },
      { label: 'Chiffrement Militaire',        badge: 'AES-256',         delay: 0.16 },
      { label: 'Terminal Temps Réel',          badge: 'WebSocket',       delay: 0.24 },
      { label: 'KYC / AML Intégré',             badge: 'Onfido SDK',      delay: 0.32 },
      { label: 'Wallet Multi-Chain',           badge: 'Web3.js',         delay: 0.40 },
    ],
    metrics: [
      { value: '$50M+', label: 'Processed'   },
      { value: '0ms',   label: 'Latency'     },
      { value: 'SOC 2', label: 'Certified'   },
    ],
    ctaRoute: 'contact',
  },
  luxury: {
    title: 'Luxury E-Commerce',
    subtitle: 'Haute Couture Digitale',
    videoPreview: '/videos/concept-ecommerce.mp4',
    description: "L'excellence du retail de luxe transposée en ligne. Configurateur 3D, expérience d'achat ultra-fluide, et design minimaliste qui mettent en valeur chaque produit comme une œuvre d'art.",
    stack: ['Shopify Plus', '3D Configurator', 'Stripe', 'Contentful'],
    features: [
      { label: 'Configurateur 3D Produit',     badge: '3D Configurator', delay: 0    },
      { label: 'Checkout Ultra-Optimisé',      badge: 'Shopify Plus',    delay: 0.08 },
      { label: 'Paiement Premium',             badge: 'Stripe',          delay: 0.16 },
      { label: 'Gestion Contenu Luxe',         badge: 'Contentful',      delay: 0.24 },
      { label: 'Personnalisation Gravure',     badge: 'Custom API',      delay: 0.32 },
      { label: 'Programme VIP & Fidélité',     badge: 'Loyalty SDK',     delay: 0.40 },
    ],
    metrics: [
      { value: '+65%',  label: 'Conversion' },
      { value: '+180%', label: 'AOV'         },
      { value: '0.8s',  label: 'Load Time'  },
    ],
    ctaRoute: 'contact',
  },
};

/* 
   INFO PANEL  panneau droite réutilisable
 */
const InfoPanel = ({ data, accentColor, accentRgb, isVisible }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 4, background: `rgba(${accentRgb},0.08)`, border: `1px solid rgba(${accentRgb},0.22)` }}>
          <motion.div style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: accentColor, fontFamily: "'Space Grotesk', sans-serif" }}>LIVE DEMO</span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {data.stack.map((s, i) => (
            <span key={i} style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.14em', padding: '2px 7px', borderRadius: 3, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(180,180,180,0.6)', fontFamily: 'monospace' }}>{s}</span>
          ))}
        </div>
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1, marginBottom: 6 }}>
        {data.title}<br />
        <span style={{ background: `linear-gradient(135deg, ${accentColor} 0%, rgba(255,255,255,0.9) 60%, ${accentColor} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{data.subtitle}</span>
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: 'rgba(160,160,170,0.8)' }}>{data.description}</p>
    </div>

    <div style={{ height: 1, background: `linear-gradient(90deg, rgba(${accentRgb},0.4), rgba(${accentRgb},0.1), transparent)` }} />

    <div>
      <p style={{ fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(120,120,130,0.7)', marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}> Modules inclus</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {data.features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + f.delay, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            whileHover={{ background: `rgba(${accentRgb},0.05)`, borderColor: `rgba(${accentRgb},0.15)` }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={12} style={{ color: accentColor, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(200,200,210,0.85)', fontWeight: 500 }}>{f.label}</span>
            </div>
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 3, background: `rgba(${accentRgb},0.10)`, border: `1px solid rgba(${accentRgb},0.20)`, color: accentColor, fontFamily: 'monospace' }}>{f.badge}</span>
          </motion.div>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', gap: 8 }}>
      {data.metrics.map((m, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: `rgba(${accentRgb},0.06)`, border: `1px solid rgba(${accentRgb},0.15)`, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 17, color: accentColor, textShadow: `0 0 16px rgba(${accentRgb},0.4)`, letterSpacing: '-0.02em', marginBottom: 2 }}>{m.value}</p>
          <p style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(140,140,150,0.65)', fontFamily: "'Space Grotesk', sans-serif" }}>{m.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

/* 
   DEMO LAYOUT  wrapper réutilisable (Demo + InfoPanel + CTAs)
 */
const DemoLayout = ({ DemoComponent, panelKey, activeCat, onNavigate, panelData, startProjectLabel }) => {
  const data = panelData[panelKey];
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  const { playClickCard, playInterface } = useAudio();
  const PREFILL_SERVICE_BY_PANEL = {
    realEstate: 'agency',
    fineDining: 'agency',
    wellness: 'agency',
    edtech: 'agency',
    fintech: 'agency',
    luxury: 'agency',
  };

  const prefillService = PREFILL_SERVICE_BY_PANEL[panelKey] || 'agency';

  return (
    <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]">
      <motion.div className="w-full min-w-0" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <PressureCard accentColor={activeCat.color} accentRgb={activeCat.colorRgb}>
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsMediaHovered(true)}
          onMouseLeave={() => setIsMediaHovered(false)}
        >
          <DemoComponent activeProject={data} />

          {/* Overlay Vidéo Universel */}
          {data.videoPreview && (
            <div
              className={`mask-image absolute inset-0 transition-opacity duration-700 ease-in-out z-[5] ${
                isMediaHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
              }}
            >
              <video preload="none"
                src={data.videoPreview}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-[5] contrast-[1.1] brightness-[0.9] saturate-[1.2] blur-[0.5px]"
              />
              <div className="absolute inset-0 z-[6] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
          )}
        </div>
        </PressureCard>
      </motion.div>

      <motion.div className="w-full min-w-0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <InfoPanel data={data} accentColor={activeCat.color} accentRgb={activeCat.colorRgb} isVisible={true} />

        <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
          {data.ctaRoute !== 'contact' && (
            <button
              onClick={() => { playInterface(); onNavigate?.(data.ctaRoute); }}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 9, background: `linear-gradient(135deg, rgba(${activeCat.colorRgb},0.20), rgba(${activeCat.colorRgb},0.08))`, border: `1px solid rgba(${activeCat.colorRgb},0.35)`, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeCat.color, transition: 'all 0.3s' }}
              onMouseEnter={e => { playInterface(); e.currentTarget.style.boxShadow = `0 0 30px rgba(${activeCat.colorRgb},0.2)`; }}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <Eye size={13} /> Voir le site complet
            </button>
          )}
          <button
            onClick={() => { playClickCard(); onNavigate?.('contact', prefillService); }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 9, background: 'white', border: '1px solid white', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#050508', transition: 'all 0.3s' }}
            onMouseEnter={e => { playInterface(); e.currentTarget.style.background = activeCat.color; e.currentTarget.style.borderColor = activeCat.color; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'white'; }}
          >
            {startProjectLabel} <ChevronRight size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* 
   MAIN COMPONENT  WhatWeBuild
 */
const WhatWeBuild = ({ lang, onNavigate }) => {
  /* ── Shared state / refs ── */
  const [activeId, setActiveId] = useState('realEstate');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef  = useRef(null);  /* mobile IntersectionObserver target */
  const outerRef    = useRef(null);  /* desktop useScroll target */
  const touchStartX = useRef(null);
  const { playClicky, playHov, playClickCard, playInterface } = useAudio();

  /* ── Mobile detection (stable on mount) ── */
  const { isMobile, isMediumTier } = useDeviceTier();
  const useCompactShowcase = isMobile || isMediumTier;

  /* ── Desktop: scroll-driven horizontal state ── */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `${-(CATEGORIES.length - 1) * 100}vw`]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (useCompactShowcase) return;
    const idx = Math.round(v * (CATEGORIES.length - 1));
    setActiveIndex(Math.max(0, Math.min(idx, CATEGORIES.length - 1)));
  });

  /* ── Touch swipe (mobile category navigation) ── */
  const CATEGORY_IDS = CATEGORIES.map(c => c.id);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    const idx = CATEGORY_IDS.indexOf(activeId);
    if (delta < 0 && idx < CATEGORY_IDS.length - 1) { playClicky(); setActiveId(CATEGORY_IDS[idx + 1]); }
    if (delta > 0 && idx > 0)                        { playClicky(); setActiveId(CATEGORY_IDS[idx - 1]); }
  };

  const activeCat = CATEGORIES.find(c => c.id === activeId);
  const showcaseTranslations =
    TRANSLATIONS[lang]?.showcase || TRANSLATIONS.en.showcase;
  const panelData = {
    ...PANEL_DATA,
    realEstate: {
      ...PANEL_DATA.realEstate,
      subtitle: showcaseTranslations.realEstate.title,
      description: showcaseTranslations.realEstate.description,
    },
    fineDining: {
      ...PANEL_DATA.fineDining,
      subtitle: showcaseTranslations.fineDining.title,
      description: showcaseTranslations.fineDining.description,
    },
    wellness: {
      ...PANEL_DATA.wellness,
      subtitle: showcaseTranslations.wellness.title,
      description: showcaseTranslations.wellness.description,
    },
    edtech: {
      ...PANEL_DATA.edtech,
      subtitle: showcaseTranslations.edtech.title,
      description: showcaseTranslations.edtech.description,
    },
    fintech: {
      ...PANEL_DATA.fintech,
      subtitle: showcaseTranslations.fintech.title,
      description: showcaseTranslations.fintech.description,
    },
    luxury: {
      ...PANEL_DATA.luxury,
      subtitle: showcaseTranslations.ecommerce.title,
      description: showcaseTranslations.ecommerce.description,
    },
  };
  const mainTitle = showcaseTranslations.mainTitle || 'Experiences we craft';
  const startProjectLabel = showcaseTranslations.startProjectBtn || 'Start this project';
  const DEMO_COMPONENT_BY_ID = {
    realEstate: RealEstateDemo,
    fineDining: FineDiningDemo,
    wellness: WellnessDemo,
    edtech: EdTechDemo,
    fintech: FinTechDemo,
    luxury: LuxuryDemo,
  };
  const PREFILL_SERVICE_BY_PANEL = {
    realEstate: 'agency',
    fineDining: 'agency',
    wellness: 'agency',
    edtech: 'agency',
    fintech: 'agency',
    luxury: 'agency',
  };
  const ActiveDemoComponent = DEMO_COMPONENT_BY_ID[activeId] || null;
  const activePanel = panelData[activeId] || null;
  const prefillService = 'agency';

  /* ── Mobile: IntersectionObserver for section visibility ── */
  useEffect(() => {
    if (!useCompactShowcase) return;
    const el = sectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); ob.unobserve(el); } },
      { threshold: 0.10, rootMargin: '0px 0px -60px 0px' }
    );
    ob.observe(el);
    return () => ob.unobserve(el);
  }, [useCompactShowcase]);

  /* ══════════════════════════════════════════════════════════
     MOBILE RENDER — tab pills + touch swipe (portrait-first)
     ══════════════════════════════════════════════════════════ */
  if (useCompactShowcase) {
    return (
      <section id="showcase" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 6rem' }}>
        <motion.div
          key={activeId + '-mglow'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}
          style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: `radial-gradient(ellipse, rgba(${activeCat.colorRgb},0.07) 0%, transparent 65%)`, filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }}
        />
        <div className="max-w-7xl mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <p className="section-overline mb-3">&mdash; {showcaseTranslations.overline}</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)', marginBottom: 0 }}>
              <span className="text-gradient">{mainTitle}</span>
            </h2>
          </div>

          {/* Category pill tabs */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeId === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => { playClicky(); setActiveId(cat.id); }}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 999, border: `1px solid ${isActive ? `rgba(${cat.colorRgb},0.4)` : 'rgba(255,255,255,0.08)'}`, background: isActive ? `rgba(${cat.colorRgb},0.10)` : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.25s' }}
                >
                  <Icon size={11} style={{ color: isActive ? cat.color : 'rgba(140,140,150,0.6)' }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 10, color: isActive ? 'white' : 'rgba(120,120,130,0.7)', whiteSpace: 'nowrap' }}>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Demo + Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
            >
              <PressureCard accentColor={activeCat.color} accentRgb={activeCat.colorRgb}>
                {ActiveDemoComponent && <ActiveDemoComponent activeProject={activePanel} />}
              </PressureCard>
              <div style={{ marginTop: 20 }}>
                {activePanel && <InfoPanel data={activePanel} accentColor={activeCat.color} accentRgb={activeCat.colorRgb} isVisible={isVisible} />}
                <button
                  onClick={() => { playClickCard(); onNavigate?.('contact', prefillService); }}
                  style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 9, background: 'white', border: '1px solid white', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#050508' }}
                >
                  {startProjectLabel} <ChevronRight size={13} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 24 }}>
            {CATEGORIES.map((cat, i) => (
              <button key={i} onClick={() => { playClicky(); setActiveId(cat.id); }}
                style={{ width: activeId === cat.id ? 22 : 5, height: 5, borderRadius: 3, background: activeId === cat.id ? cat.color : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)', padding: 0 }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ══════════════════════════════════════════════════════════
     DESKTOP RENDER — Sticky horizontal scroll (Awwwards)
     ══════════════════════════════════════════════════════════ */
  const desktopActiveCat = CATEGORIES[activeIndex];

  return (
    <div id="showcase" ref={outerRef} style={{ height: `${CATEGORIES.length * 100}vh`, position: 'relative' }}>
      {/* Sticky viewport — pinned at top while scrolling through outer height */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Dynamic accent glow — morphs per panel */}
        <motion.div
          key={activeIndex + '-desk-glow'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 1000, height: 600, borderRadius: '50%', background: `radial-gradient(ellipse, rgba(${desktopActiveCat.colorRgb},0.08) 0%, transparent 60%)`, filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }}
        />

        {/* Section header — fixed at top of sticky container */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '2rem clamp(1.5rem, 4vw, 3rem) 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, background: 'linear-gradient(to bottom, rgba(5,5,8,0.90) 0%, rgba(5,5,8,0) 100%)' }}>
          <div>
            <p className="section-overline">&mdash; {showcaseTranslations.overline}</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', margin: 0 }}>
              <span className="text-gradient">{mainTitle}</span>
            </h2>
          </div>
          {/* Active category label + counter */}
          <motion.div
            key={activeIndex + '-label'}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 999, border: `1px solid rgba(${desktopActiveCat.colorRgb},0.30)`, background: `rgba(${desktopActiveCat.colorRgb},0.07)` }}>
              {(() => { const Icon = desktopActiveCat.icon; return <Icon size={12} style={{ color: desktopActiveCat.color }} />; })()}
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', color: desktopActiveCat.color }}>{desktopActiveCat.label}</span>
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(120,120,130,0.5)' }}>{activeIndex + 1} / {CATEGORIES.length}</span>
          </motion.div>
        </div>

        {/* ── Horizontal track — all 6 panels laid side-by-side ── */}
        <motion.div style={{ display: 'flex', width: `${CATEGORIES.length * 100}vw`, height: '100%', x: xTranslate, willChange: 'transform' }}>
          {CATEGORIES.map((cat, i) => {
            const DemoComp    = DEMO_COMPONENT_BY_ID[cat.id];
            const data        = panelData[cat.id];
            const panelActive = i === activeIndex;
            const dist        = Math.abs(i - activeIndex);
            return (
              <div
                key={cat.id}
                style={{
                  width: '100vw', height: '100%', flexShrink: 0, display: 'flex', alignItems: 'center',
                  /* Z-depth: off-screen panels blurred + faded */
                  filter: dist > 0 ? `blur(${Math.min(dist * 1.5, 4)}px)` : 'none',
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.40 : 0.12,
                  transition: 'filter 0.5s ease, opacity 0.5s ease',
                }}
              >
                <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '7rem clamp(1.5rem, 4vw, 3rem) 4rem', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem', alignItems: 'center', height: '100%' }}>
                  {/* Demo */}
                  <PressureCard accentColor={cat.color} accentRgb={cat.colorRgb}>
                    <DemoComp activeProject={data} />
                  </PressureCard>
                  {/* Info */}
                  <div>
                    <InfoPanel data={data} accentColor={cat.color} accentRgb={cat.colorRgb} isVisible={panelActive} />
                    <button
                      onClick={() => { playClickCard(); onNavigate?.('contact', 'agency'); }}
                      style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 9, background: 'white', border: '1px solid white', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#050508', transition: 'all 0.3s' }}
                      onMouseEnter={e => { playInterface(); e.currentTarget.style.background = cat.color; e.currentTarget.style.borderColor = cat.color; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'white'; }}
                    >
                      {startProjectLabel} <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Progress dots */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10 }}>
          <div style={{ display: 'flex', gap: 7 }}>
            {CATEGORIES.map((cat, i) => (
              <div key={i} style={{ height: 5, borderRadius: 3, width: i === activeIndex ? 28 : 5, background: i === activeIndex ? cat.color : 'rgba(255,255,255,0.18)', boxShadow: i === activeIndex ? `0 0 10px ${cat.color}80` : 'none', transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: 0.35 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', color: 'white', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: 16, height: 1, background: 'linear-gradient(to right, white, transparent)' }} />
          </div>
        </div>

        {/* Edge lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', zIndex: 1 }} />
      </div>
    </div>
  );
};

export default WhatWeBuild;
