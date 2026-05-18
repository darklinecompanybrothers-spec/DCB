/**
 * useDeviceTier — Détection du niveau de performance de l'appareil.
 *
 * Retourne { isLowEnd, isMobile, prefersReducedMotion, isMediumTier, isAmdGpu }
 *
 * isLowEnd = true si l'un des critères suivants est détecté :
 *   • prefers-reduced-motion : reduce  (accessibilité + performance)
 *   • navigator.hardwareConcurrency < 4 (moins de 4 cœurs CPU)
 *   • navigator.connection.saveData = true (mode économie de données)
 *   • GPU/renderer connu pour mal supporter les effets lourds du site
 *
 * isMobile = window.innerWidth < 768 (proxy rapide, pas de resize listener)
 *
 * Décisions de dégradation recommandées par ItsLit :
 *   isLowEnd → OracleField: return null
 *   isLowEnd → AudioWave: step = 12 (canvas léger, pas SVG statique)
 *   isMobile && isLowEnd → CinematicCurtain: simple fade
 *   isMobile && isLowEnd → HeroSection video: afficher poster JPG uniquement
 */
import { useMemo } from 'react';

function getGpuRenderer() {
  if (typeof document === 'undefined') return '';

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    if (!gl) return '';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);

    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR);

    return `${vendor || ''} ${renderer || ''}`.toLowerCase();
  } catch {
    return '';
  }
}

export default function useDeviceTier() {
  return useMemo(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cores =
      typeof navigator !== 'undefined'
        ? (navigator.hardwareConcurrency ?? 4)
        : 4;

    const memory =
      typeof navigator !== 'undefined'
        ? (navigator.deviceMemory ?? 4)
        : 4;

    const saveData =
      typeof navigator !== 'undefined'
        ? (navigator?.connection?.saveData ?? false)
        : false;

    const connection =
      typeof navigator !== 'undefined'
        ? navigator?.connection?.effectiveType
        : undefined;

    const isMobile =
      typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    const renderer = getGpuRenderer();
    const isAmdGpu = /amd|radeon|ati/.test(renderer);
    const isIntelGpu = /intel/.test(renderer);
    const slowConnection = ['slow-2g', '2g', '3g'].includes(connection);

    const isMediumTier =
      isMobile ||
      cores <= 6 ||
      memory <= 4 ||
      isAmdGpu ||
      isIntelGpu ||
      slowConnection;

    const isLowEnd =
      prefersReducedMotion ||
      saveData ||
      cores < 4 ||
      memory < 4 ||
      slowConnection;

    return {
      isLowEnd,
      isMobile,
      prefersReducedMotion,
      isMediumTier,
      isAmdGpu,
      renderer,
    };
  }, []);
}
