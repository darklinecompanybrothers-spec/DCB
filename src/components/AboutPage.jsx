import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Zap, Award, Globe, Heart } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useAudio } from '../context/SoundContext';

/* ── Static visual config (colours / icons — not translatable content) ───── */
const TIMELINE_COLORS = ['#a855f7', '#06b6d4', '#a3e635', '#f43f5e', '#f59e0b'];
const TRINITY_COLORS  = ['#a855f7', '#06b6d4', '#a3e635'];
const VALUE_ICONS     = [Zap, Heart, Globe, Award];

/* Matches order of TRANSLATIONS[lang].team.members */
const TEAM_ACCENTS = [
  { accent: '#a855f7', initials: 'DI' }, /* Daboussi Iheb     */
  { accent: '#a3e635', initials: 'DY' }, /* Daboussi Yassine  */
  { accent: '#f43f5e', initials: 'MD' }, /* Marwen Daboussi   */
  { accent: '#06b6d4', initials: 'KB' }, /* Khaled Boulila    */
  { accent: '#a3e635', initials: 'AK' }, /* Ahmed Kalboussi   */
  { accent: '#06b6d4', initials: 'OG' }, /* Omar Guitouni     */
];

/* ── Sub-components ─────────────────────────────────────────────────────── */

const MemberCard = ({ m, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay: i * 0.07 }}
    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors duration-300"
  >
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm text-black shrink-0"
      style={{ background: `linear-gradient(135deg, ${m.accent}cc, ${m.accent}44)` }}
    >
      {m.initials}
    </div>
    <div>
      <p className="font-bold text-sm text-white">{m.name}</p>
      <p className="text-[11px] text-neutral-500">{m.role}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: m.accent }}>
        {m.division}
      </p>
    </div>
  </motion.div>
);

const ValueCard = ({ v, i }) => {
  const Icon = v.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: i * 0.1 }}
      className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-400 group"
    >
      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/15 transition-colors duration-300">
        <Icon size={18} className="text-purple-400" />
      </div>
      <h3 className="font-bold text-white text-sm mb-2">{v.title}</h3>
      <p className="text-neutral-500 text-xs leading-relaxed">{v.desc}</p>
    </motion.div>
  );
};

/* ── About Page ──────────────────────────────────────────────────────────── */
const AboutPage = ({ onNavigate, lang }) => {
  const { playClick, playHover } = useAudio();
  const t  = TRANSLATIONS[lang].about;
  const teamMembers = TRANSLATIONS[lang].team.members.map((m, i) => ({
    ...m,
    ...TEAM_ACCENTS[i],
  }));

  return (
    <div className="min-h-screen pt-24">

      {/* ── Back button ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <button
          onClick={() => { playClick(); onNavigate('home', null, { history: 'back' }); }}
          onMouseEnter={playHover}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors duration-300 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          {t.backBtn}
        </button>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <hr className="accent-line" />
            <span className="section-overline">{t.hero.overline}</span>
          </div>

          <h1 className="section-title text-6xl md:text-8xl lg:text-[120px] text-white mb-6">
            {t.hero.title}
            <br />
            <span className="text-outline">{t.hero.titleOutline}</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <p className="text-neutral-300 text-base leading-relaxed">{t.hero.desc1}</p>
            <div className="flex flex-col gap-4">
              <p className="text-neutral-500 text-sm leading-relaxed">{t.hero.desc2}</p>
              <div className="flex items-center gap-2 text-neutral-600 text-xs">
                <MapPin size={12} />
                <span>{t.hero.location}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Stats banner ───────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.05] bg-white/[0.01] py-10 mb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map(({ number, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-black text-white">{number}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mt-2">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── The Trinity ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <hr className="accent-line" />
            <span className="section-overline">{t.trinity.overline}</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl text-white">
            {t.trinity.title}<br />
            <span className="text-outline">{t.trinity.titleOutline}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.trinity.pillars.map((pillar, i) => {
            const color = TRINITY_COLORS[i];
            return (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="p-7 rounded-2xl border group hover:-translate-y-1 transition-all duration-400"
                style={{
                  borderColor: `${color}20`,
                  background:  `linear-gradient(135deg, ${color}08 0%, transparent 100%)`,
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-black opacity-20" style={{ color }}>0{i + 1}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                </div>
                <h3 className="font-black text-xl text-white mb-1">{pillar.name}</h3>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color }}>{pillar.tagline}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Timeline ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <hr className="accent-line" />
            <span className="section-overline">{t.timeline.overline}</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl text-white">
            {t.timeline.title} <span className="text-outline">{t.timeline.titleOutline}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />
          <div className="flex flex-col gap-10">
            {t.timeline.events.map((item, i) => {
              const color = TIMELINE_COLORS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 pl-10 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color }}>{item.year}</span>
                    <h3 className="font-bold text-white text-lg mt-1 mb-1">{item.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div
                    className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#050508] mt-1"
                    style={{ background: color }}
                  />
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Values ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <hr className="accent-line" />
            <span className="section-overline">{t.values.overline}</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl text-white">
            {t.values.title} <span className="text-outline">{t.values.titleOutline}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {t.values.items.map((item, i) => (
            <ValueCard key={item.title} v={{ ...item, icon: VALUE_ICONS[i] }} i={i} />
          ))}
        </div>
      </div>

      {/* ── Team ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <hr className="accent-line" />
            <span className="section-overline">{t.team.overline}</span>
          </div>
          <h2 className="section-title text-5xl md:text-6xl text-white">
            {t.team.title} <span className="text-outline">{t.team.titleOutline}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teamMembers.map((m, i) => <MemberCard key={m.name} m={m} i={i} />)}
        </div>
      </div>

      {/* ── Location ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.05] bg-white/[0.01] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 mb-4">
              {t.location.label}
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">🇹🇳</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                {t.location.city}
              </h2>
            </div>
            <p className="text-neutral-600 text-sm max-w-md mx-auto leading-relaxed">
              {t.location.desc}
            </p>

            <div className="flex items-center justify-center flex-wrap gap-8 mt-10">
              {t.location.offices.map(({ flag, label, tel }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl mb-1">{flag}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">{label}</p>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">{tel}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
