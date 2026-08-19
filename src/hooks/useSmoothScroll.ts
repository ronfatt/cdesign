import { useEffect } from 'react';
import Lenis from 'lenis';
import { useIsTouchDevice } from './useMediaQuery';

export function useSmoothScroll() {
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    // Respect prefers-reduced-motion or touch devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isTouch]);
}
