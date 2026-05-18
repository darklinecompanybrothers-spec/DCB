import { useRef, useState, useEffect } from 'react';

export default function useReveal(opts = {}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.unobserve(el); } },
      { threshold: opts.threshold || 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    ob.observe(el);
    return () => ob.unobserve(el);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, vis };
}
