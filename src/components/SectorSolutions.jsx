import React, { useState } from 'react';
import { ArrowRight, Check, Building2, UtensilsCrossed, Sparkles } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import { useAudio } from '../context/SoundContext';

const SectorSolutions = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang].sectors;
  const [expandedCard, setExpandedCard] = useState(null);
  const { playHover2, playClick2 } = useAudio();
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { containerRef, getItemStyle } = useStaggerReveal(3, 200);

  const sectors = [
    {
      key: 'realEstate',
      icon: <Building2 size={28} />,
      data: t.realEstate,
      gradient: 'from-purple-600/20 via-purple-900/10 to-transparent',
      accentBorder: 'hover:border-purple-500/30',
      accentText: 'text-purple-400',
      accentBg: 'bg-purple-500/10',
      accentGlow: 'hover:shadow-[0_0_60px_rgba(168,85,247,0.1)]',
      iconBg: 'bg-purple-500/10',
      statColor: 'text-purple-400',
      checkColor: 'bg-purple-500/20 text-purple-400'
    },
    {
      key: 'restaurants',
      icon: <UtensilsCrossed size={28} />,
      data: t.restaurants,
      gradient: 'from-lime-600/20 via-lime-900/10 to-transparent',
      accentBorder: 'hover:border-lime-500/30',
      accentText: 'text-lime-400',
      accentBg: 'bg-lime-500/10',
      accentGlow: 'hover:shadow-[0_0_60px_rgba(163,230,53,0.1)]',
      iconBg: 'bg-lime-500/10',
      statColor: 'text-lime-400',
      checkColor: 'bg-lime-500/20 text-lime-400'
    },
    {
      key: 'aesthetics',
      icon: <Sparkles size={28} />,
      data: t.aesthetics,
      gradient: 'from-white/10 via-neutral-400/5 to-transparent',
      accentBorder: 'hover:border-white/20',
      accentText: 'text-neutral-200',
      accentBg: 'bg-white/5',
      accentGlow: 'hover:shadow-[0_0_60px_rgba(255,255,255,0.05)]',
      iconBg: 'bg-white/5',
      statColor: 'text-white',
      checkColor: 'bg-white/10 text-neutral-300'
    }
  ];

  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
      {/* Background with depth */}
      <div className="absolute inset-0" style={{ background: '#0a0a0f' }}></div>

      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

      {/* Ambient orbs */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[200px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-lime-900/8 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 md:mb-24 transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] rounded-full px-5 py-2 mb-6 backdrop-blur-md">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">The Agency</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">{t.title}</h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-8 mx-auto h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>

        {/* Sector Cards */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {sectors.map((sector, index) => {
            const isExpanded = expandedCard === sector.key;

            return (
              <div
                key={sector.key}
                style={getItemStyle(index)}
                className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-700 hover:-translate-y-3 ${sector.accentBorder} ${sector.accentGlow} overflow-hidden`}
              >
                {/* Card top gradient bar */}
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${sector.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                {/* Ambient card glow */}
                <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${sector.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                <div className="relative p-6 md:p-8">
                  {/* Icon + Label */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${sector.iconBg} ${sector.accentText} transition-all duration-500`}>
                      {sector.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">{sector.data.label}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                    {sector.data.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {sector.data.description}
                  </p>

                  {/* Stat highlight */}
                  <div className={`inline-flex items-baseline gap-2 ${sector.accentBg} px-4 py-2 rounded-lg mb-6`}>
                    <span className={`text-3xl font-black ${sector.statColor}`}>{sector.data.stat}</span>
                    <span className="text-xs text-neutral-400 max-w-[200px]">{sector.data.statLabel}</span>
                  </div>

                  {/* Features List */}
                  <ul className={`space-y-3 mb-8 transition-all duration-500 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-[135px] opacity-100'} overflow-hidden`}>
                    {sector.data.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm">
                        <div className={`p-0.5 rounded-full ${sector.checkColor} mt-0.5 flex-shrink-0`}>
                          <Check size={10} />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expand/Collapse toggle */}
                  {!isExpanded && (
                    <button
                      onMouseEnter={playHover2}
                      onClick={() => { playClick2(); setExpandedCard(sector.key); }}
                      className="text-xs text-neutral-500 hover:text-white transition-colors mb-6 cursor-pointer"
                    >
                      + {lang === 'ar' ? 'عرض الكل' : lang === 'fr' ? 'Voir tout' : 'Show all features'}
                    </button>
                  )}
                  {isExpanded && (
                    <button
                      onMouseEnter={playHover2}
                      onClick={() => { playClick2(); setExpandedCard(null); }}
                      className="text-xs text-neutral-500 hover:text-white transition-colors mb-6 cursor-pointer"
                    >
                      - {lang === 'ar' ? 'إخفاء' : lang === 'fr' ? 'Réduire' : 'Show less'}
                    </button>
                  )}

                  {/* CTA Button */}
                  <button
                    onMouseEnter={playHover2}
                    onClick={() => { playClick2(); onNavigate('contact', { service: 'agency', step: 2 }); }}
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-500 border border-white/[0.06] bg-white/[0.03] text-white hover:bg-white hover:text-black group/btn flex items-center justify-center gap-2`}
                  >
                    {t.cta}
                    <ArrowRight size={16} className={`transition-transform duration-300 ${lang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"></div>
    </section>
  );
};

export default SectorSolutions;
