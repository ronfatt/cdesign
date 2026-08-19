import { useState, useEffect, useRef } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime.current;

      if (timeDiff > 0) {
        const delta = currentScrollY - lastScrollY.current;
        const currentVelocity = delta / timeDiff; // px per ms

        // Clamped subtle skew between -1.5 and 1.5 deg
        const clampedVelocity = Math.max(Math.min(currentVelocity * 1.8, 1.5), -1.5);
        setVelocity(clampedVelocity);
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;

      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setVelocity(0);
      }, 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return velocity;
}
