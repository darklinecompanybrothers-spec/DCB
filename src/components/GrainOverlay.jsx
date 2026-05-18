import React, { memo } from 'react';

const svgGrain = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="200" height="200" filter="url(#noise)" opacity="1"/>
</svg>
`);

const GrainOverlay = memo(() => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9998,
      pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml,${svgGrain}")`,
      backgroundSize: '200px 200px',
      opacity: 0.04,
      mixBlendMode: 'overlay',
    }}
  />
));

GrainOverlay.displayName = 'GrainOverlay';
export default GrainOverlay;
