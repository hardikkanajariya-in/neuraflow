'use client';

import { useState, useEffect } from 'react';

export function useScrollDirection(): { direction: 'up' | 'down'; scrollY: number } {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    function update() {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setDirection('down');
      } else {
        setDirection('up');
      }
      lastScrollY = currentScrollY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { direction, scrollY };
}
