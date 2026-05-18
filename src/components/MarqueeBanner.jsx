import React, { memo } from 'react';

const ROW1 = [
  'WE BUILD LEGACIES', 'SOUND IS POWER', 'MADE IN TUNISIA', 'VISUAL TRUTH',
  'DIGITAL DOMINANCE', 'STUDIO · VISUALS · AGENCY', 'BUILT DIFFERENT', 'CREATIVE AUTHORITY',
];
const ROW2 = [
  'DCB AUTHORITY GROUP', 'WHERE CULTURE MEETS CRAFT', 'THE TRINITY', 'AUDIO · FILM · WEB',
  'FROM TUNIS TO THE WORLD', 'ENGINEER YOUR LEGACY', 'CINEMATIC BY NATURE', 'BUILT TO LAST',
];

const SEP = (
  <span className="mx-6 text-white/20 select-none" aria-hidden="true">✦</span>
);

/* Each row duplicated for seamless 50% loop */
const buildRow = (words) => [...words, ...words];

const MarqueeBanner = memo(() => (
  <div
    className="relative py-5 overflow-hidden border-y border-white/[0.05]"
    style={{ background: 'rgba(5,5,8,0.8)' }}
    aria-hidden="true"
  >
    {/* Fade edges */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
      style={{ background: 'linear-gradient(90deg, #05050a, transparent)' }} />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
      style={{ background: 'linear-gradient(-90deg, #05050a, transparent)' }} />

    {/* Row 1 — left → right */}
    <div className="flex whitespace-nowrap animate-marquee mb-3">
      {buildRow(ROW1).map((word, i) => (
        <React.Fragment key={i}>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500 select-none">
            {word}
          </span>
          {SEP}
        </React.Fragment>
      ))}
    </div>

    {/* Row 2 — right → left */}
    <div className="flex whitespace-nowrap animate-marquee-reverse">
      {buildRow(ROW2).map((word, i) => (
        <React.Fragment key={i}>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.22em] select-none"
            style={{
              color: i % 8 < 4 ? 'rgba(139,92,246,0.55)' : 'rgba(6,182,212,0.45)',
            }}
          >
            {word}
          </span>
          {SEP}
        </React.Fragment>
      ))}
    </div>
  </div>
));

MarqueeBanner.displayName = 'MarqueeBanner';
export default MarqueeBanner;
