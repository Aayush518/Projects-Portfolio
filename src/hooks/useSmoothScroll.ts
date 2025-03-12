import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    // Skip on SSR
    if (typeof window === 'undefined') return;
    
    // Early optimization detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSaveData = 'connection' in navigator && (navigator as any).connection?.saveData;
    const isLowEndDevice = 
      ('deviceMemory' in navigator && (navigator as any).deviceMemory < 4) ||
      ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4) ||
      document.documentElement.classList.contains('low-end-device');
    
    // Skip smooth scroll for reduced motion, save-data, or low-end devices
    if (prefersReducedMotion || isSaveData || isLowEndDevice) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }
    
    // Use native CSS smooth scrolling for maximum performance
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optimized anchor handler
    const handleAnchorClick = (e: MouseEvent) => {
      // Early return if event is being handled elsewhere
      if (e.defaultPrevented) return;
      
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Calculate offset accounting for sticky headers
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Scroll with optimized native behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };
    
    // Use capture phase for better performance
    document.addEventListener('click', handleAnchorClick, { passive: false, capture: true });
    
    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
    };
  }, []);
}