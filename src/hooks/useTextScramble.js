import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?/\\|^~';

/**
 * useTextScramble — decodes text from random characters to the final string.
 * @param {string}  finalText   — target text to decode into
 * @param {boolean} isActive    — trigger: starts decoding when true
 * @param {number}  duration    — total duration in ms (default 1300)
 */
const useTextScramble = (finalText, isActive, duration = 1300) => {
  const [display, setDisplay] = useState('');
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    let frame = 0;
    const totalFrames = duration / 16; // ~60 fps
    const chars = finalText.split('');

    const tick = () => {
      const progress = Math.min(frame / totalFrames, 1);

      const result = chars.map((ch, i) => {
        if (ch === ' ') return '\u00A0'; // non-breaking space
        // Each character has its own stagger threshold
        const threshold = i / chars.length;
        if (progress > threshold) return ch;
        // Return a random scramble char while below threshold
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      setDisplay(result.join(''));

      if (progress < 1) {
        frame++;
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(finalText);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, finalText, duration]);

  return display;
};

export default useTextScramble;
