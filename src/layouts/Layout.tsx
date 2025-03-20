import { useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { measurePerformance } from '../utils/performance';
import { ResourcePreloader } from '../utils/resourcePreloader';
import ResourceHints from '../components/ResourceHints';

export default function Layout({ children }) {
  const preloader = ResourcePreloader.getInstance();

  useEffect(() => {
    // Performance monitoring
    measurePerformance('FCP');
    measurePerformance('LCP');
    measurePerformance('CLS');
    measurePerformance('FID');

    // Preload critical fonts
    preloader.preloadFont('Inter', '400');
    preloader.preloadFont('Inter', '600');
    preloader.preloadFont('Clash Display', '600');
    preloader.preloadFont('JetBrains Mono', '400');

    // Optimize resource loading
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.saveData || connection.effectiveType === '2g') {
        document.body.classList.add('save-data');
        // Disable non-critical animations
        document.body.style.setProperty('--animation-duration', '0s');
      }
    }

    // Optimize paint operations
    document.documentElement.style.setProperty('content-visibility', 'auto');
    document.documentElement.style.setProperty('contain', 'paint');
    
    // Add intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
            // Prefetch linked resources
            const links = entry.target.querySelectorAll('a[href]');
            links.forEach(link => {
              if (link instanceof HTMLAnchorElement) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('/')) {
                  const prefetchLink = document.createElement('link');
                  prefetchLink.rel = 'prefetch';
                  prefetchLink.href = href;
                  document.head.appendChild(prefetchLink);
                }
              }
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    document.querySelectorAll('.lazy-load').forEach(
      el => observer.observe(el)
    );

    return () => observer.disconnect();
  }, []);

  useSmoothScroll();

  return (
    <div className="bg-dark text-white">
      <ResourceHints />
      <div className="contents" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
        <EnhancedCursor />
        <ScrollProgress />
        {children}
      </div>
    </div>
  );
} 