import { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function Layout({ children }) {
  const hasMounted = useRef(false);

  useEffect(() => {
    // Only run once
    if (hasMounted.current) return;
    hasMounted.current = true;
    
    // Make sure body is visible
    document.body.style.opacity = "1";
    document.documentElement.style.opacity = "1";
    
    // Apply browser optimizations
    document.documentElement.classList.add('optimize-performance');
    
    // Disable animations during initial load
    document.documentElement.classList.add('disable-animations');
    setTimeout(() => {
      document.documentElement.classList.remove('disable-animations');
    }, 300);
    
    // Detect low-end devices
    const isLowEndDevice = 
      ('deviceMemory' in navigator && (navigator as any).deviceMemory < 4) ||
      ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
    if (isLowEndDevice) {
      document.documentElement.classList.add('low-end-device');
    }
    
    // Set up basic intersection observer for lazy-loaded content
    const lazyLoadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            lazyLoadObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    document.querySelectorAll('.lazy-section').forEach(el => 
      lazyLoadObserver.observe(el)
    );
    
    return () => {
      lazyLoadObserver.disconnect();
    };
  }, []);

  useSmoothScroll();

  return (
    <div className="bg-dark text-white">
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
}