import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations.
 * Uses IntersectionObserver for performant scroll detection.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.15
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @param {boolean} options.once - Only trigger once (default true)
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * Hook for staggered children reveals.
 * Each child appears with a delay after the parent becomes visible.
 *
 * @param {number} itemCount - Number of children to stagger
 * @param {number} staggerDelay - Delay between each child (ms), default 100
 * @param {Object} observerOptions - Options for the IntersectionObserver
 * @returns {{ containerRef: React.RefObject, getItemStyle: (index: number) => Object, isVisible: boolean }}
 */
export function useStaggerReveal(itemCount, staggerDelay = 100, observerOptions = {}) {
  const { ref: containerRef, isVisible } = useScrollReveal(observerOptions);

  const getItemStyle = (index) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`,
  });

  return { containerRef, getItemStyle, isVisible };
}
