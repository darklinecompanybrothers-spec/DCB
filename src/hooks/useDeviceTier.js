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

function getPerformanceOverride() {
  if (typeof window === 'undefined') return null;

  const urlMode = new URLSearchParams(window.location.search).get('performance');
  const storedMode = window.localStorage?.getItem('dcbPerformanceMode');
  return urlMode || storedMode;
}

export default function useDeviceTier() {
  return useMemo(() => {
    const overrideMode = getPerformanceOverride();
    const forceFull = overrideMode === 'full' || overrideMode === 'heavy';
    const forceLight = overrideMode === 'light' || overrideMode === 'lite';

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cores =
      typeof navigator !== 'undefined'
        ? (navigator.hardwareConcurrency ?? 4)
        : 4;

    const hasMemoryInfo =
      typeof navigator !== 'undefined' &&
      typeof navigator.deviceMemory === 'number';

    const memory = hasMemoryInfo ? navigator.deviceMemory : Infinity;

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
    const isDesktop = !isMobile;

    const renderer = getGpuRenderer();
    const isAmdGpu = /amd|radeon|ati/.test(renderer);
    const isIntelGpu = /intel/.test(renderer);
    const slowConnection = ['slow-2g', '2g', '3g'].includes(connection);

    // Keep iPhone/mobile devices in the full experience unless the user/browser
    // explicitly asks for reduced data or reduced motion.
    const likelyWeakDesktopGpu = isDesktop && (isAmdGpu || isIntelGpu);
    const weakDesktopSpecs = isDesktop && (cores <= 4 || memory <= 4);

    const autoLowEnd =
      prefersReducedMotion ||
      saveData ||
      slowConnection ||
      (isDesktop && (cores < 4 || memory < 4));

    const autoMediumTier = likelyWeakDesktopGpu || weakDesktopSpecs;
    const isLowEnd = forceFull ? false : forceLight ? true : autoLowEnd;
    const isMediumTier = forceFull ? false : forceLight ? true : autoMediumTier;

    return {
      isLowEnd,
      isMobile,
      prefersReducedMotion,
      isMediumTier,
      isAmdGpu,
      renderer,
      performanceMode: isLowEnd || isMediumTier ? 'light' : 'full',
    };
  }, []);
}
