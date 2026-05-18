import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Film, Music, Globe, Clock, ArrowUpRight } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useAudio } from '../context/SoundContext';

/* ── Project slots data ──────────────────────────────────────────────────────
   Each slot defines:
   - category : 'studio' | 'visuals' | 'agency'  (drives color theming)
   - type     : 'video'  | 'audio'  | 'web'       (drives icon)
   - mediaAspect: aspect-ratio CSS value
   Replace placeholder* values with real assets when ready.
─────────────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: '01',
    title: 'VILLA CARTHAGE',
    client: 'Immobilier Premium',
    category: 'visuals',
    type: 'video',
    tags: ['Cinematic Film', 'Drone Shots', '4K Production'],
    accent: '#06b6d4',
    bg: 'linear-gradient(135deg, #042830 0%, #0c4a6e 50%, #050508 100%)',
    /* TODO: replace with real video src */
    videoSrc: null,
    /* TODO: replace with real poster image */
    imageSrc: null,
  },
  {
    id: '02',
    title: 'RAMADAN CAMPAIGN',
    client: 'Brand Audio Identity',
    category: 'studio',
    type: 'audio',
    tags: ['Jingle Production', 'Voice Over', 'Sound Design'],
    accent: '#a855f7',
    bg: 'linear-gradient(135deg, #1e0a3c 0%, #4c1d95 50%, #050508 100%)',
    videoSrc: null,
    imageSrc: null,
  },
  {
    id: '03',
    title: 'GLOW CLINIC',
    client: 'Beauty & Wellness',
    category: 'agency',
    type: 'web',
    tags: ['Web Platform', 'Booking System', 'UI/UX Design'],
    accent: '#a3e635',
    bg: 'linear-gradient(135deg, #0d1f02 0%, #365314 50%, #050508 100%)',
    videoSrc: null,
    imageSrc: null,
  },
  {
    id: '04',
    title: 'RESTAURANT AZUR',
    client: 'Fine Dining Identity',
    category: 'visuals',
    type: 'video',
    tags: ['Brand Film', 'Food Photography', 'Ambiance Reel'],
    accent: '#06b6d4',
    bg: 'linear-gradient(135deg, #042830 0%, #155e75 50%, #050508 100%)',
    videoSrc: null,
    imageSrc: null,
  },
  {
    id: '05',
    title: 'SONIC LEGACY',
    client: 'Artist Development',
    category: 'studio',
    type: 'audio',
    tags: ['Album Production', 'Mixing & Mastering', 'Artist Branding'],
    accent: '#a855f7',
    bg: 'linear-gradient(135deg, #1e0245 0%, #581c87 50%, #050508 100%)',
    videoSrc: null,
    imageSrc: null,
  },
  {
    id: '06',
    title: 'IMMO DIGITAL',
    client: 'Real Estate Platform',
    category: 'agency',
    type: 'web',
    tags: ['Custom Software', 'CRM Integration', 'Digital Strategy'],
    accent: '#a3e635',
    bg: 'linear-gradient(135deg, #0d1f02 0%, #3f6212 50%, #050508 100%)',
    videoSrc: null,
    imageSrc: null,
  },
];

const TYPE_ICON = { video: Film, audio: Music, web: Globe };

const CATEGORY_COLOR = {
  studio:  { text: 'text-purple-400', border: 'border-purple-500/25', bg: 'bg-purple-500/10' },
  visuals: { text: 'text-cyan-400',   border: 'border-cyan-500/25',   bg: 'bg-cyan-500/10'   },
  agency:  { text: 'text-lime-400',   border: 'border-lime-500/25',   bg: 'bg-lime-500/10'   },
};

/* ── Single project card ─────────────────────────────────────────────────── */
const ProjectCard = ({ project, catLabel, comingSoonLabel, inProductionLabel }) => {
  const [hovered, setHovered] = useState(false);
  const { playHover } = useAudio();
  const TypeIcon = TYPE_ICON[project.type];
  const cc = CATEGORY_COLOR[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { setHovered(true); playHover(); }}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-[#07070f]
                 hover:border-white/[0.14] transition-colors duration-500"
      style={{
        boxShadow: hovered
          ? `0 0 48px ${project.accent}18, 0 24px 64px rgba(0,0,0,0.55)`
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.45s ease',
      }}
    >
      {/* ── Media placeholder ──────────────────────────────────────────── */}
      <div className="relative w-full" style={{ aspectRatio: '16 / 9', background: project.bg }}>

        {/* Grid lines overlay — gives "screen" feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Accent corner glow */}
        <div
          className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${project.accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Media type icon — large watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <TypeIcon
            size={64}
            strokeWidth={0.8}
            style={{ color: project.accent, opacity: 0.12 }}
          />
        </div>

        {/* Project number */}
        <div
          className="absolute top-4 left-4 font-black text-[11px] tracking-[0.25em] uppercase"
          style={{ color: project.accent, opacity: 0.7 }}
        >
          {project.id}
        </div>

        {/* Media type badge — top right */}
        <div
          className={`absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${cc.border} ${cc.bg} ${cc.text}`}
        >
          <TypeIcon size={10} />
          {project.type}
        </div>

        {/* ── COMING SOON overlay ──────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            background: 'rgba(5,5,8,0.72)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          {/* Animated pulse ring */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-14 h-14 rounded-full"
              style={{ border: `1px solid ${project.accent}`, opacity: 0.35 }}
            />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `${project.accent}18`,
                border: `1px solid ${project.accent}40`,
              }}
            >
              <Lock size={16} style={{ color: project.accent }} />
            </div>
          </div>

          <div className="text-center">
            <p
              className="font-black text-[11px] tracking-[0.3em] uppercase"
              style={{ color: project.accent }}
            >
              {comingSoonLabel}
            </p>
            <p className="text-[9px] text-neutral-600 tracking-widest uppercase mt-0.5">
              {inProductionLabel}
            </p>
          </div>
        </div>

        {/* Bottom gradient — blends into card body */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#07070f] to-transparent pointer-events-none" />
      </div>

      {/* ── Card body ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Category chip */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border ${cc.border} ${cc.bg} ${cc.text}`}
          >
            {catLabel}
          </span>
          {/* Arrow — appears on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.25 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${cc.bg} border ${cc.border}`}
          >
            <ArrowUpRight size={11} style={{ color: project.accent }} />
          </motion.div>
        </div>

        {/* Title + client */}
        <div>
          <h3 className="font-black text-base text-white tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="text-[11px] text-neutral-500 mt-0.5">{project.client}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/[0.05]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] text-neutral-600 px-2 py-0.5 rounded border border-white/[0.05] bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

/* ── Section ─────────────────────────────────────────────────────────────── */
const CaseStudiesSection = ({ lang }) => {
  const t = TRANSLATIONS[lang]?.caseStudies || TRANSLATIONS.en.caseStudies;
  const catLabels = TRANSLATIONS[lang]?.caseStudies?.categories || TRANSLATIONS.en.caseStudies.categories;

  return (
    <section id="case-studies" className="relative">

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* ── Section header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          {/* Overline */}
          <div className="flex items-center gap-3 mb-5">
            <hr className="accent-line" />
            <span className="section-overline">{t.overline}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="section-title text-5xl md:text-7xl text-white">
                {t.title}
                <br />
                <span className="text-outline">{t.titleOutline}</span>
              </h2>
            </div>

            <div className="max-w-xs">
              <p className="text-sm text-neutral-500 leading-relaxed">{t.subtitle}</p>

              {/* "In production" global badge */}
              <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-full border border-amber-500/20 bg-amber-500/[0.07] w-fit">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-amber-400"
                />
                <Clock size={11} className="text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  {t.globalBadge}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Project grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={project}
                catLabel={catLabels[project.category]}
                comingSoonLabel={t.comingSoon}
                inProductionLabel={t.inProduction}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA note ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-xs text-neutral-700 uppercase tracking-[0.2em]">{t.footerNote}</p>
        </motion.div>

      </div>
    </section>
  );
};

export default CaseStudiesSection;
