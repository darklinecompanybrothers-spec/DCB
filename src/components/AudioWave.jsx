import { useRef, useEffect } from 'react';
import useDeviceTier from '../hooks/useDeviceTier';

/**
 * AudioWave — Canvas-based multi-layer sine wave signature.
 *
 * Three layers (purple / cyan / lime) animate continuously with a dual-harmonic
 * sine formula. Mouse position subtly warps amplitude (Y) and frequency (X).
 * Designed to sit at the bottom of the Hero section as a translucent visual layer.
 */

const LAYERS = [
  //        r    g    b  fillOp strokeOp  amp   freq    speed  phaseShift  yPos
  { r: 138, g:  43, b: 226, fillOp: 0.22, strokeOp: 0.52, amp: 72, freq: 0.0022, speed: 0.011, phase: 0.00, yPos: 0.46 },
  { r:   0, g: 212, b: 255, fillOp: 0.14, strokeOp: 0.36, amp: 46, freq: 0.0038, speed: 0.017, phase: 2.10, yPos: 0.57 },
  { r: 163, g: 230, b:  53, fillOp: 0.08, strokeOp: 0.20, amp: 28, freq: 0.0058, speed: 0.024, phase: 4.30, yPos: 0.68 },
];

const AudioWave = () => {
  const canvasRef = useRef(null);
  const { isLowEnd, isMobile, isMediumTier } = useDeviceTier();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let rafId = null;
    const mouse = { x: 0.5, y: 0.5 };

    /* step: fewer draw points on degraded devices → GPU savings
       isLowEnd (< 4 cores / saveData) → step 12 (canvas allégé, animation préservée)
       isMobile                         → step 6  (déjà optimisé)
       desktop                          → step 3  (qualité max) */
    let step = isLowEnd ? 16 : isMediumTier ? 10 : isMobile ? 6 : 4;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = Math.round(window.innerHeight * 0.62);
      step = isLowEnd ? 16 : isMediumTier ? 10 : window.innerWidth < 768 ? 6 : 4;
    };
    resize();

    const onMouse = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('resize',    resize,  { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });

    const drawLayer = (layer) => {
      const W     = canvas.width;
      const H     = canvas.height;
      const baseY = H * layer.yPos;
      /* Mouse warp — subtle */
      const ampMod  = 1 + (mouse.y - 0.5) * 0.35;
      const freqMod = 1 + (mouse.x - 0.5) * 0.25;

      /* ── Filled wave shape (crest → bottom) ── */
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let px = 0; px <= W; px += step) {
        const nx = px / W;
        const y  = baseY
          + Math.sin(nx * W * layer.freq * freqMod + frame * layer.speed + layer.phase)
            * layer.amp * ampMod
          + Math.sin(nx * W * layer.freq * 2.1 * freqMod + frame * layer.speed * 0.65 + layer.phase * 1.5)
            * layer.amp * 0.32 * ampMod;
        ctx.lineTo(px, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - layer.amp * 1.5, 0, H);
      grad.addColorStop(0, `rgba(${layer.r},${layer.g},${layer.b},${layer.fillOp})`);
      grad.addColorStop(1, `rgba(${layer.r},${layer.g},${layer.b},0)`);
      ctx.fillStyle = grad;
      ctx.fill();

      /* ── Crest stroke (glow line) ── */
      ctx.beginPath();
      for (let px = 0; px <= W; px += step) {
        const nx = px / W;
        const y  = baseY
          + Math.sin(nx * W * layer.freq * freqMod + frame * layer.speed + layer.phase)
            * layer.amp * ampMod
          + Math.sin(nx * W * layer.freq * 2.1 * freqMod + frame * layer.speed * 0.65 + layer.phase * 1.5)
            * layer.amp * 0.32 * ampMod;
        px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      }
      ctx.strokeStyle = `rgba(${layer.r},${layer.g},${layer.b},${layer.strokeOp})`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    };

    let lastFrame = 0;
    const fps = isLowEnd ? 20 : isMediumTier ? 30 : 45;
    const frameMs = 1000 / fps;

    const tick = (now = 0) => {
      rafId = requestAnimationFrame(tick);
      if (now - lastFrame < frameMs) return;
      lastFrame = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      LAYERS.forEach(drawLayer);
      frame++;
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [isLowEnd, isMediumTier, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default AudioWave;
