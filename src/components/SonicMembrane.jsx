import { useRef, useEffect } from 'react';
import useDeviceTier from '../hooks/useDeviceTier';

/**
 * SonicMembrane — Raw WebGL GLSL fragment shader (~5KB gzip).
 *
 * Concept 16 — Awwwards Sprint 2.
 * Simulates an audio-reactive membrane using fBm (fractional Brownian motion)
 * noise in a GLSL fragment shader. A bass "pulse" cycles at ~60 BPM,
 * displacing the membrane geometry. Two Trinity colors (cyan + purple) blend
 * across the surface.
 *
 * Runs only on high/mid-end devices (isLowEnd → null).
 * mixBlendMode: 'screen' — composites over the video background.
 */

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_bass;   /* 0.0 → 1.0 simulated bass pulse */

/* ── fBm helpers ─────────────────────────────────────────── */
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2  shift = vec2(100.0);
  mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

/* ── Trinity palette ──────────────────────────────────────── */
vec3 CYAN   = vec3(0.024, 0.714, 1.000); /* #06B6D4 */
vec3 PURPLE = vec3(0.659, 0.333, 0.969); /* #A855F7 */
vec3 LIME   = vec3(0.639, 0.902, 0.208); /* #A3E635 */

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  /* Bass displacement */
  float bass = u_bass * 0.28;

  /* Primary membrane */
  float q1x = fbm(uv + 0.0);
  float q1y = fbm(uv + vec2(5.2, 1.3));
  vec2 q  = vec2(q1x, q1y);

  float r1x = fbm(uv + 1.7 * q + vec2(1.7, 9.2) + 0.15 * u_time);
  float r1y = fbm(uv + 1.7 * q + vec2(8.3, 2.8) + 0.126 * u_time);
  vec2 r  = vec2(r1x, r1y);

  float f = fbm(uv + 1.7 * r + bass);
  f = (f + 1.0) * 0.5; /* remap to [0,1] */

  /* Color blend along fBm field */
  vec3 col = mix(PURPLE, CYAN,   clamp(f * 2.0,       0.0, 1.0));
  col      = mix(col,    LIME,   clamp(f * 2.0 - 1.0, 0.0, 1.0));

  /* Radial vignette — strong fade at edges so it blends with hero bg */
  float dist = length(uv);
  float vignette = 1.0 - smoothstep(0.35, 0.85, dist);

  /* Membrane intensity — thin bright line around the f=0.5 iso-surface */
  float edge = 1.0 - abs(f - 0.5) * 8.0;
  edge = max(edge, 0.0);

  /* Bass pulse glow at center */
  float pulse = bass * (1.0 - smoothstep(0.0, 0.4, dist));

  float alpha = (edge * 0.55 + f * 0.18 + pulse * 0.35) * vignette;

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.72));
}
`;

/* Compile helper */
function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('SonicMembrane shader error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const SonicMembrane = () => {
  const canvasRef = useRef(null);
  const { isLowEnd, isMediumTier, isAmdGpu } = useDeviceTier();
  const shouldDisable = isLowEnd || isMediumTier || isAmdGpu;

  /* Disabled on low-end devices */
  useEffect(() => {
    if (shouldDisable) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── WebGL context ── */
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true });
    if (!gl) return;

    /* ── Compile & link program ── */
    const vert = compileShader(gl, gl.VERTEX_SHADER,   VERT);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('SonicMembrane link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    /* ── Full-screen quad ── */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    /* ── Uniforms ── */
    const uRes  = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uBass = gl.getUniformLocation(prog, 'u_bass');

    /* Blending */
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);   /* additive blend → screen-like effect */

    /* ── Simulated bass pulse at ~60 BPM (1 Hz) ── */
    let bassPhase = 0;
    const BASS_HZ = 1.0;  /* 60 BPM */

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* ── Render loop ── */
    let rafId;
    let lastTime = 0;

    const tick = (ts) => {
      const dt  = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime  = ts;
      bassPhase += dt * BASS_HZ * Math.PI * 2;
      const bass = Math.max(0, Math.sin(bassPhase)) ** 2.5;

      gl.uniform2f(uRes,  canvas.width, canvas.height);
      gl.uniform1f(uTime, ts / 1000);
      gl.uniform1f(uBass, bass);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buf);
    };
  }, [shouldDisable]);

  if (shouldDisable) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: 0.65,
        zIndex: 2,
      }}
    />
  );
};

export default SonicMembrane;
