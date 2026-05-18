import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, Linkedin, Facebook } from 'lucide-react';
import { Tiktok } from './Icons';
import TRANSLATIONS from '../data/translations';
import { PHONE_NUMBERS as PHONES, EMAIL } from '../data/contacts';
import { useAudio } from '../context/SoundContext';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/dcb_label/', Icon: Instagram, label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/dcb-authority-group/', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.facebook.com/profile.php?id=61581256820726', Icon: Facebook, label: 'Facebook' },
  { href: 'https://www.tiktok.com/@darkline.multimedia', Icon: Tiktok, label: 'TikTok' },
  { href: `mailto:${EMAIL}`, Icon: Mail, label: 'Email' },
];

const NAV_SECTIONS = ['about', 'services', 'process', 'pricing', 'team', 'contact'];

const LEGAL_CONTENT = {
  legal: {
    en: { title: 'Legal Notice', body: 'DCB Authority Group — Registered in Tunisia. All content on this site is the exclusive property of DCB Authority Group. Reproduction without prior written consent is prohibited. For any legal inquiry, contact: contact@dcbag.net' },
    fr: { title: 'Mentions Légales', body: 'DCB Authority Group — Société enregistrée en Tunisie. Tout le contenu de ce site est la propriété exclusive de DCB Authority Group. Toute reproduction sans accord préalable écrit est interdite. Pour toute demande juridique, contactez : contact@dcbag.net' },
    ar: { title: 'الإشعار القانوني', body: 'مجموعة DCB Authority — شركة مسجلة في تونس. جميع المحتويات الواردة في هذا الموقع هي ملكية حصرية لمجموعة DCB Authority. يُحظر إعادة الإنتاج دون موافقة خطية مسبقة. للاستفسارات القانونية، تواصل معنا عبر: contact@dcbag.net' },
  },
  privacy: {
    en: { title: 'Privacy Policy', body: 'DCB Authority Group collects only the data necessary to respond to your requests (name, email, phone). Your data is never sold to third parties. You may request deletion at any time by emailing contact@dcbag.net. Cookies are used solely for analytics (anonymous).' },
    fr: { title: 'Politique de Confidentialité', body: 'DCB Authority Group collecte uniquement les données nécessaires pour répondre à vos demandes (nom, e-mail, téléphone). Vos données ne sont jamais revendues à des tiers. Vous pouvez demander leur suppression à tout moment en écrivant à contact@dcbag.net. Les cookies sont utilisés uniquement à des fins analytiques (anonymes).' },
    ar: { title: 'سياسة الخصوصية', body: 'تجمع مجموعة DCB Authority فقط البيانات الضرورية للرد على طلباتك (الاسم، البريد الإلكتروني، الهاتف). لا تُباع بياناتك لأطراف ثالثة. يمكنك طلب حذفها في أي وقت عبر المراسلة على: contact@dcbag.net. تُستخدم ملفات تعريف الارتباط فقط لأغراض تحليلية مجهولة الهوية.' },
  },
};

/* ── Analog Clock — distinct format from ContactSection digital clocks ── */
const AnalogClock = ({ timezone, city }) => {
  const getHands = () => {
    try {
      const parts = new Intl.DateTimeFormat('en', {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false, timeZone: timezone,
      }).formatToParts(new Date());
      const h = parseInt(parts.find(p => p.type === 'hour')?.value   || '0', 10);
      const m = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
      const s = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);
      return { h, m, s };
    } catch { return { h: 0, m: 0, s: 0 }; }
  };

  const [{ h, m, s }, setHands] = useState(getHands);

  useEffect(() => {
    const id = setInterval(() => setHands(getHands()), 1000);
    return () => clearInterval(id);
  }, [timezone]);

  const hourDeg = ((h % 12) / 12 + m / 720) * 360 - 90;
  const minDeg  = (m / 60 + s / 3600) * 360 - 90;

  const hx = (15 + 7 * Math.cos(hourDeg * Math.PI / 180)).toFixed(2);
  const hy = (15 + 7 * Math.sin(hourDeg * Math.PI / 180)).toFixed(2);
  const mx = (15 + 10 * Math.cos(minDeg  * Math.PI / 180)).toFixed(2);
  const my = (15 + 10 * Math.sin(minDeg  * Math.PI / 180)).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        {/* Face */}
        <circle cx="15" cy="15" r="12" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        {/* 12 hour ticks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * 360 * Math.PI / 180;
          return (
            <line key={i}
              x1={(15 + 9  * Math.cos(a - Math.PI / 2)).toFixed(2)}
              y1={(15 + 9  * Math.sin(a - Math.PI / 2)).toFixed(2)}
              x2={(15 + 11 * Math.cos(a - Math.PI / 2)).toFixed(2)}
              y2={(15 + 11 * Math.sin(a - Math.PI / 2)).toFixed(2)}
              stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"
            />
          );
        })}
        {/* Hour hand */}
        <line x1="15" y1="15" x2={hx} y2={hy}
          stroke="rgba(168,85,247,0.75)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Minute hand */}
        <line x1="15" y1="15" x2={mx} y2={my}
          stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
        {/* Center */}
        <circle cx="15" cy="15" r="1.5" fill="rgba(168,85,247,0.9)" />
      </svg>
      <span style={{
        fontSize: '7px', fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        {city}
      </span>
    </div>
  );
};

const LegalModal = ({ type, lang, onClose }) => {
  const content = LEGAL_CONTENT[type]?.[lang] || LEGAL_CONTENT[type]?.en;
  if (!content) return null;
  return (
    <div
      className="fixed inset-0 z-[300] flex items-end md:items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={content.title}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors text-xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-black text-white mb-4">{content.title}</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">{content.body}</p>
      </div>
    </div>
  );
};

const Footer = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang].footer;
  const isRtl = lang === 'ar';
  const { playHover, playClick } = useAudio();
  const [modal, setModal] = useState(null); /* 'legal' | 'privacy' | null */

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#04040a' }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top separator line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-10 relative z-10">

        {/* ── Top section: Brand + columns ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/[0.05]">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="text-xl font-black text-white tracking-tight mb-1">
                DCB <span className="text-purple-500">AUTHORITY</span> GROUP
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-[220px]">
                {t.tagline}
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-neutral-500 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_12px_rgba(139,92,246,0.2)] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-white/[0.07] bg-white/[0.02] rounded-full px-3 py-1.5 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                {lang === 'ar' ? 'متاح للمشاريع' : lang === 'fr' ? 'Disponible pour projets' : 'Available for projects'}
              </span>
            </div>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-5">
              {t.navTitle}
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_SECTIONS.map((key) => (
                <li key={key}>
                  <button
                    onMouseEnter={playHover}
                    onClick={() => { playClick(); onNavigate && onNavigate(key); }}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                    style={{ direction: 'ltr' }}
                  >
                    <span
                      className="w-3 h-px bg-neutral-700 group-hover:w-5 group-hover:bg-purple-500 transition-all duration-300"
                    />
                    {t.links[key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-5">
              {t.contactTitle}
            </p>
            <div className="flex flex-col gap-4">
              {PHONES.map(({ flag, region, tel, display }) => (
                <a
                  key={region}
                  href={tel}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-lg select-none">{flag}</span>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-purple-400 transition-colors duration-300">
                      {region}
                    </div>
                    <div className="font-mono text-sm text-neutral-400 group-hover:text-white transition-colors duration-300">
                      {display}
                    </div>
                  </div>
                </a>
              ))}
              <a
                href="mailto:contact@dcbag.net"
                className="flex items-center gap-3 group mt-1"
              >
                <div className="w-[26px] flex justify-center">
                  <Mail size={16} className="text-neutral-600 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                <span className="font-mono text-sm text-neutral-400 group-hover:text-white transition-colors duration-300">
                  contact@dcbag.net
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-600">{t.copyright}</p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button onClick={() => setModal('legal')} className="text-xs text-neutral-700 hover:text-neutral-400 transition-colors duration-200">{t.legal}</button>
            <div className="w-px h-3 bg-neutral-800" />
            <button onClick={() => setModal('privacy')} className="text-xs text-neutral-700 hover:text-neutral-400 transition-colors duration-200">{t.privacy}</button>
            <div className="w-px h-3 bg-neutral-800" />
            <p className="text-xs text-neutral-700 font-medium">{t.madeIn} 🇹🇳</p>
          </div>
        </div>

      </div>

      {modal && <LegalModal type={modal} lang={lang} onClose={() => setModal(null)} />}

      {/* ── Topographic data strip ─────────────────────────────────── */}
      <div className="relative border-t border-white/[0.03] overflow-hidden" style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>

        {/* Topo contour lines — SVG background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {['M-10 28 Q150 18, 300 30 Q450 42, 600 25 Q750 12, 900 28 Q1050 40, 1210 25',
            'M-10 48 Q150 38, 300 50 Q450 62, 600 45 Q750 32, 900 48 Q1050 60, 1210 45',
            'M-10 68 Q150 58, 300 70 Q450 82, 600 65 Q750 52, 900 68 Q1050 80, 1210 65',
            'M-10 88 Q150 78, 300 90 Q450 102, 600 85 Q750 72, 900 88 Q1050 100, 1210 85',
          ].map((d, i) => (
            <path key={i} d={d} fill="none"
              stroke="rgba(255,255,255,0.025)" strokeWidth="1"
            />
          ))}
        </svg>

        {/* GPS coordinates */}
        <p
          className="text-center font-mono"
          style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.18)', marginBottom: '1.5rem' }}
        >
          36.8065°N &nbsp;·&nbsp; 10.1815°E &nbsp;·&nbsp; TUNIS, TUNISIA
        </p>

        {/* Analog clocks */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3.5rem', marginBottom: '2rem' }}>
          <AnalogClock timezone="Africa/Tunis"    city="TUN" />
          <AnalogClock timezone="America/New_York" city="NYC" />
          <AnalogClock timezone="Europe/Paris"     city="PAR" />
        </div>

        {/* Animated SVG signature — draws itself on scroll reveal */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.svg
            width="340"
            height="48"
            viewBox="0 0 340 48"
            fill="none"
            aria-hidden="true"
            style={{ overflow: 'visible' }}
          >
            {/* Primary signature stroke */}
            <motion.path
              d="M 12 34 C 32 12, 68 46, 108 30 C 138 18, 158 40, 192 30"
              stroke="rgba(168,85,247,0.38)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
            {/* Secondary stroke — pen lift continuation */}
            <motion.path
              d="M 196 30 C 228 18, 252 42, 284 30 C 308 22, 320 34, 332 28"
              stroke="rgba(168,85,247,0.22)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
            {/* Tail underline */}
            <motion.path
              d="M 60 40 Q 170 44, 280 40"
              stroke="rgba(168,85,247,0.10)"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.0, delay: 2.4, ease: 'easeOut' }}
            />
          </motion.svg>
        </div>

      </div>

      {/* ── Monumental brand wordmark — scroll-reveal precision moment ── */}
      <div
        aria-hidden="true"
        className="w-full select-none pointer-events-none pb-2 px-2"
      >
        <motion.p
          className="font-black text-center text-white leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(18px, 5.6vw, 92px)',
            letterSpacing: '-0.04em',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.032 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          DCB AUTHORITY GROUP
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
