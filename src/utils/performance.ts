import Lenis from '@studio-freight/lenis';

// Performance metrics for debugging
const metrics: Record<string, number> = {};

export function optimizePerformance() {
  // Enhanced device capability detection
  const isLowEndDevice = () => {
    // Create a composite score based on multiple factors
    let score = 0;
    
    // Check connection type
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection?.saveData) score += 2;
      if (connection?.effectiveType === 'slow-2g') score += 3;
      if (connection?.effectiveType === '2g') score += 2;
      if (connection?.effectiveType === '3g') score += 1;
    }
    
    // Check device memory
    if ('deviceMemory' in navigator) {
      const memory = (navigator as any).deviceMemory;
      if (memory && memory < 4) score += (4 - memory);
    }
    
    // Check hardware concurrency (CPU cores)
    if ('hardwareConcurrency' in navigator) {
      const cores = navigator.hardwareConcurrency;
      if (cores < 4) score += (4 - cores);
    }
    
    // Check device pixel ratio
    if (window.devicePixelRatio < 1.5) score += 1;
    
    // Battery status if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.charging === false && battery.level < 0.15) {
          // Battery low and not charging - add to score asynchronously
          score += 2;
          if (score >= 4) {
            document.documentElement.classList.add('save-power');
          }
        }
      }).catch(() => {/* Ignore errors */});
    }
    
    return score >= 4;
  };
  
  // Apply performance classes based on enhanced detection
  const lowEnd = isLowEndDevice();
  if (lowEnd) {
    document.documentElement.classList.add('save-data', 'reduced-motion', 'low-end-device');
  }

  // Adaptive loading based on device capability
  const adaptiveLoad = () => {
    // Determine quality tier (high, medium, low)
    const qualityTier = lowEnd ? 'low' : 'high';
    
    // Apply data-quality attribute to html element for CSS targeting
    document.documentElement.setAttribute('data-quality', qualityTier);
    
    // Select appropriate image sources based on quality tier
    document.querySelectorAll('img[data-src-high], img[data-src-low]').forEach(img => {
      const qualityAttr = qualityTier === 'low' ? 'data-src-low' : 'data-src-high';
      if (img.hasAttribute(qualityAttr)) {
        img.setAttribute('data-src', img.getAttribute(qualityAttr)!);
      }
    });
  };

  // Call adaptive loading setup
  adaptiveLoad();

  // Enhanced animation observer with idle callback scheduling
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Schedule non-critical animations using requestIdleCallback if available
          const scheduleAnimation = window.requestIdleCallback || setTimeout;
          
          scheduleAnimation(() => {
            entry.target.classList.add('animate-in');
            entry.target.classList.add('will-change');
            
            // Remove will-change after animation completes
            const animationDuration = getComputedStyle(entry.target)
              .getPropertyValue('animation-duration')
              .replace('s', '') || '0.5';
            
            setTimeout(() => {
              entry.target.classList.remove('will-change');
            }, parseFloat(animationDuration) * 1000 + 100);
            
            animationObserver.unobserve(entry.target);
          }, { timeout: 500 });
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
  );

  // Advanced image and iframe loading with priority tiers
  const loadPriority: Record<string, number> = {
    'critical': 0,
    'high': 1,
    'medium': 2,
    'low': 3,
    'off-screen': 4
  };
  
  // Selectors for content to preload
  const contentSelectors = [
    'img[data-priority="critical"]',
    'iframe[data-priority="critical"]',
    'img[data-src][data-priority="high"]',
    'iframe[data-src][data-priority="high"]',
    'img[data-src]', 
    'iframe[data-src]'
  ];
  
  // Load content by priority tier
  contentSelectors.forEach((selector, index) => {
    // Add delay for lower priority tiers
    setTimeout(() => {
      const contentObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              
              // For images
              if (el.tagName.toLowerCase() === 'img' && el.hasAttribute('data-src')) {
                const src = el.getAttribute('data-src')!;
                
                // Use modern loading attributes
                if (!el.hasAttribute('loading') && index > 0) {
                  el.setAttribute('loading', 'lazy');
                }
                
                if (!el.hasAttribute('decoding')) {
                  el.setAttribute('decoding', index === 0 ? 'sync' : 'async');
                }
                
                if (!el.hasAttribute('fetchpriority')) {
                  const priority = el.getAttribute('data-priority') || 
                    (index === 0 ? 'high' : index === 1 ? 'medium' : 'low');
                  el.setAttribute('fetchpriority', priority);
                }
                
                el.setAttribute('src', src);
                el.removeAttribute('data-src');
              }
              
              // For iframes
              if (el.tagName.toLowerCase() === 'iframe' && el.hasAttribute('data-src')) {
                const src = el.getAttribute('data-src')!;
                el.setAttribute('src', src);
                el.removeAttribute('data-src');
              }
              
              contentObserver.unobserve(el);
            }
          });
        },
        { rootMargin: index === 0 ? '0px' : '200px 0px' }
      );
      
      document.querySelectorAll(selector).forEach(el => contentObserver.observe(el));
      
    }, index * 200); // Stagger loading for better main thread utilization
  });

  // More sophisticated scroll performance optimizations
  const optimizeScrollableElements = () => {
    // Find elements that might be scrollable
    document.querySelectorAll('.scroll-container, [data-scroll-container]').forEach(container => {
      // Add contain: content to improve scroll performance
      container.classList.add('contain-layout');
      
      // Find large lists/tables that would benefit from virtualization
      container.querySelectorAll('ul > li, ol > li, tbody > tr').forEach((item, idx, items) => {
        if (items.length > 20) {
          // Apply content-visibility to long lists
          item.classList.add('content-visibility-auto');
          
          // Set intrinsic size based on actual item size
          if (idx === 0) {
            const height = item.getBoundingClientRect().height;
            items.forEach(item => {
              (item as HTMLElement).style.containIntrinsicSize = `auto ${height}px`;
            });
          }
        }
      });
    });
  };

  // Apply scroll optimizations after layout is stable
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      optimizeScrollableElements();
    });
  } else {
    setTimeout(optimizeScrollableElements, 1000);
  }

  // Apply animations to elements
  document.querySelectorAll('.animate-on-scroll').forEach(
    (element) => animationObserver.observe(element)
  );

  // Adaptive scroll behavior setup
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Only create Lenis if we're not in a reduced motion context
  if (!prefersReducedMotion && !lowEnd) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1.2,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Report smooth scroll status
    metrics.smoothScrollEnabled = 1;
  } else {
    metrics.smoothScrollEnabled = 0;
  }
  
  // Monitor long tasks and performance
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log long tasks for debugging
          console.debug('Long task detected:', entry.duration.toFixed(1) + 'ms', entry);
          
          // Track metrics
          metrics.longTaskCount = (metrics.longTaskCount || 0) + 1;
          metrics.totalBlockingTime = (metrics.totalBlockingTime || 0) + entry.duration;
        });
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Ignore errors - PerformanceObserver might not be fully supported
    }
  }

  // Return metrics for debugging
  return metrics;
}

export const measurePerformance = (metricName: string) => {
  if (typeof window === 'undefined' || !window.performance) return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`${metricName}:`, entry.startTime, entry.duration);
      
      // Send to analytics if needed
      if (window.gtag) {
        window.gtag('event', 'performance_metric', {
          metric_name: metricName,
          value: entry.duration,
        });
      }
    });
  });

  observer.observe({ entryTypes: ['measure'] });

  return () => observer.disconnect();
};

export const measureComponentPerformance = (componentName: string) => {
  performance.mark(`${componentName}-start`);
  
  return () => {
    performance.mark(`${componentName}-end`);
    performance.measure(
      `${componentName}-measure`,
      `${componentName}-start`,
      `${componentName}-end`
    );
  };
};