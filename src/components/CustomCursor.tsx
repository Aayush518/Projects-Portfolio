import { useRef, useState, useEffect } from 'react';

export default function CustomCursor() {
  // Skip on SSR or mobile devices
  if (typeof window === 'undefined' || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent || '') ||
      window.matchMedia?.('(max-width: 768px)').matches) {
    return null;
  }
  
  // Use refs for all values to prevent re-renders
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Set up cursor only once after component mounts
  useEffect(() => {
    // Only update DOM when needed
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 
          `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }
      rafRef.current = null;
    };
    
    // Highly optimized throttled mouse move handler
    let lastMove = 0;
    const THROTTLE = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      // Show cursor on first movement
      if (!visibleRef.current && cursorRef.current) {
        cursorRef.current.style.opacity = '1';
        visibleRef.current = true;
      }
      
      // Update position immediately
      positionRef.current = { x: e.clientX, y: e.clientY };
      
      // Throttle rendering
      if (now - lastMove < THROTTLE) {
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(updateCursorPosition);
        }
        return;
      }
      
      lastMove = now;
      
      // Apply position directly for smoother cursor on high-performance devices
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };

    // Use passive listener for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-0"
      style={{ 
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform', 
        transition: 'opacity 0.2s',
      }}
    />
  );
}