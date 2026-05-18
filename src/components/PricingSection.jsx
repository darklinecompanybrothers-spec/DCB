import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import TRANSLATIONS from '../data/translations';
import PRICING_DATA from '../data/pricing';
import { useAudio } from '../context/SoundContext';
import Reveal from './Reveal';
import useReveal from '../hooks/useReveal';

const PricingSection = ({ onSelectPlan, lang }) => {
  const [tab, setTab] = useState('studio');
  const t = TRANSLATIONS[lang].pricing;
  const { ref, vis } = useReveal();
  const { playPaymentMethod, playHoverSelectPlan, playSelectPlan } = useAudio();

  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/15 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-900/10 blur-[200px] rounded-full pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            {t.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12 overflow-x-auto md:overflow-visible pb-2 md:pb-0 px-2 md:px-0">
          <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-1.5 rounded-2xl md:rounded-full flex flex-wrap md:flex-nowrap justify-center min-w-0 md:min-w-max gap-1 md:gap-0 max-w-full">
            {['studio', 'visuals', 'agency'].map(tb => (
              <button
                key={tb}
                onMouseEnter={playHoverSelectPlan}
                onClick={() => { playPaymentMethod(); setTab(tb); }}
                className={`px-4 sm:px-6 md:px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-500 ${
                  tab === tb ? 'relative text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab === tb && (
                  <motion.div
                    layoutId="pricingTab"
                    className="absolute inset-0 bg-white/10 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{t.tabs[tb]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`grid grid-cols-1 md:grid-cols-2 ${tab === 'visuals' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}
          >
            {PRICING_DATA[lang][tab].map((tier, i) => {
              const beamColor = '#8b5cf6';
              const [amount, ...currencyParts] = String(tier.price).split(' ');
              const currency = currencyParts.join(' ');
              const priceMeta = [currency, tier.unit].filter(Boolean).join(' ');

              return (
                <Reveal key={`${tab}-${i}`} width="100%" delay={i * 0.15}>
                  <div className={`hover:-translate-y-3 transition-transform duration-300 ${tier.highlight ? 'md:scale-105' : ''}`}>
                  <motion.div
                    className="group relative p-[1px] rounded-3xl overflow-hidden"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ y: { duration: 5.6 + i * 0.6, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' } }}
                  >
                    {/* Conic gradient border */}
                    <div
                      className={`absolute inset-[-100%] animate-[spin_4s_linear_infinite] transition-opacity duration-500 ${
                        tier.highlight ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'
                      }`}
                      style={{ background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, ${beamColor} 100%)` }}
                    />

                    <div className="relative h-full w-full bg-[#050508]/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/[0.05]">
                      {tier.highlight && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400 mb-6">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                          {t.popular}
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-white mb-2">{tier.title}</h3>
                      <div className="flex items-baseline mb-2">
                        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">{amount}</span>
                        <span className="text-lg font-normal text-neutral-500 ml-2">{priceMeta}</span>
                      </div>
                      <p className="text-neutral-300 text-sm leading-relaxed mb-6 min-h-[36px]">{tier.description}</p>

                      <ul className="space-y-3 mb-6">
                        {tier.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-3 text-neutral-200 text-sm">
                            <Check size={14} className="text-purple-400/70 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onMouseEnter={playHoverSelectPlan}
                        onClick={() => { playSelectPlan(); onSelectPlan(tab, tier.title, tier.price); }}
                        className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-500 ${
                          tier.highlight
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:brightness-110 hover:shadow-[0_0_36px_rgba(34,211,238,0.35)]'
                            : 'bg-transparent border border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {t.select}
                      </button>
                    </div>
                  </motion.div>
                  </div>
                </Reveal>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingSection;
