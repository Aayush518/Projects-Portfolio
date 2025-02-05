import { useState, useEffect } from 'react';

interface ScrollValues {
  scrollY: number;
  scrollX: number;
  scrollDirection: 'up' | 'down' | null;
}

export function useScroll(): ScrollValues {
  const [scroll, setScroll] = useState<ScrollValues>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      setScroll({
        scrollY,
        scrollX,
        scrollDirection: direction,
      });
      
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return scroll;
} 