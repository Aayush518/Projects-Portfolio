import { useEffect, useRef, useState } from 'react';

interface ScrollData {
  y: number;
  direction: 'up' | 'down' | null;
  isScrolling: boolean;
}

// Shared state for better performance across components
const scrollState = {
  y: typeof window !== 'undefined' ? window.scrollY : 0,
  direction: null as ('up' | 'down' | null),
  isScrolling: false,
  callbacks: new Set<(data: ScrollData) => void>(),
};

// Only set up one global scroll listener
let isListenerActive = false;

const setupScrollListener = () => {
  if (isListenerActive || typeof window === 'undefined') return;
  
  let lastScrollY = window.scrollY;
  let scrollTimeout: number;
  let ticking = false;
  
  const handleScroll = () => {
    scrollState.y = window.scrollY;
    scrollState.isScrolling = true;
    scrollState.direction = scrollState.y > lastScrollY ? 'down' : 'up';
    
    clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      scrollState.isScrolling = false;
      notifyCallbacks();
    }, 200);
    
    if (!ticking) {
      requestAnimationFrame(() => {
        notifyCallbacks();
        lastScrollY = scrollState.y;
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  isListenerActive = true;
};

const notifyCallbacks = () => {
  scrollState.callbacks.forEach(callback => {
    callback({
      y: scrollState.y,
      direction: scrollState.direction,
      isScrolling: scrollState.isScrolling
    });
  });
};

export function useOptimizedScroll(): ScrollData {
  const [scrollData, setScrollData] = useState<ScrollData>({
    y: scrollState.y,
    direction: scrollState.direction,
    isScrolling: scrollState.isScrolling,
  });
  
  const callbackRef = useRef((data: ScrollData) => {
    setScrollData(data);
  });
  
  useEffect(() => {
    setupScrollListener();
    scrollState.callbacks.add(callbackRef.current);
    
    return () => {
      scrollState.callbacks.delete(callbackRef.current);
    };
  }, []);
  
  return scrollData;
}
