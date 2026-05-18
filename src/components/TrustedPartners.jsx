import React from 'react';
import { ChevronRight, ExternalLink, Quote } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import { TEASER_PARTNERS } from '../data/partners';
import useReveal from '../hooks/useReveal';
import { useAudio } from '../context/SoundContext';

const LIVE_PORTFOLIO_URL = '';

const PartnerCard = ({ p }) => {
  const { playHoverPartner } = useAudio();
  return (
    <div
      onMouseEnter={playHoverPartner}
      className="group p-7 bg-white/[0.02] rounded-2xl border border-white/[0.06] transition-all duration-700 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]"
    >
      <div className="flex items-center gap-4 mb-5">
        {p.logo ? (
          <img
            loading="lazy"
            src={p.logo}
            alt={p.client}
            className="w-12 h-12 rounded-full object-cover border-2 border-neutral-800 group-hover:border-purple-500/50 transition-colors duration-500"
          />
        ) : (
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-black bg-gradient-to-br from-purple-400 to-purple-600">
            {p.client.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{p.client}</h3>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{p.type || p.service}</span>
        </div>
      </div>
      <div className="relative">
        <Quote size={20} className="text-neutral-800 absolute -top-1 -left-1 opacity-50" />
        <p className="text-neutral-400 text-sm leading-relaxed pl-5 italic">"{p.description}"</p>
      </div>
    </div>
  );
};

const TrustedPartners = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang].portfolio;
  const { ref, vis } = useReveal();
  const { playClickPartner, playHoverPartner } = useAudio();

  return (
    <section id="partners" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div
          className="flex justify-between items-end mb-12 transition-all duration-700"
          style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">{t.title}</h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-purple-600 to-transparent" />
          </div>
          <button
            onClick={() => { playClickPartner(); onNavigate('portfolio'); }}
            className="hidden md:flex items-center gap-2 text-lime-400 hover:text-white transition-colors font-bold uppercase tracking-wider text-sm group"
          >
            {t.viewAll}
            <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEASER_PARTNERS[lang].map((p, i) => (
            <div
              key={i}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms`,
              }}
            >
              <PartnerCard p={p} />
            </div>
          ))}
        </div>

        <div
          className="mt-10 md:mt-14 flex justify-center transition-all duration-700"
          style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <a
            href={LIVE_PORTFOLIO_URL}
            onMouseEnter={playHoverPartner}
            onClick={(e) => {
              playClickPartner();
              if (!LIVE_PORTFOLIO_URL) e.preventDefault();
            }}
            className="group relative inline-flex max-w-full items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-full border border-lime-300/30 bg-lime-300 px-5 py-4 text-center text-[11px] sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.18em] text-black shadow-[0_0_35px_rgba(190,242,100,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-lime-200 hover:bg-white hover:shadow-[0_0_55px_rgba(190,242,100,0.34)] focus:outline-none focus:ring-2 focus:ring-lime-300/70 focus:ring-offset-2 focus:ring-offset-black sm:px-8"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">{t.livePortfolio}</span>
            <ExternalLink size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <div className="mt-8 md:hidden text-center">
          <button
            onClick={() => { playClickPartner(); onNavigate('portfolio'); }}
            className="text-lime-400 font-bold uppercase tracking-wider text-sm"
          >
            {t.viewAll}
          </button>
        </div>
      </div>
    </section>
  );
};

export { PartnerCard };
export default TrustedPartners;
