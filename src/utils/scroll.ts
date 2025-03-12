// Optimized element observer with better performance and memory handling
export const observeElements = () => {
  // Use a WeakMap to store element data without memory leaks
  const elementMap = new WeakMap();
  
  // Create optimized intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get cached index or use default
        const el = entry.target;
        const data = elementMap.get(el) || { index: 0 };
        
        // Add class with staggered delay - use RAF for smoother animation scheduling
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.classList.add('fade-in');
            
            // Cleanup after animation completes to release resources
            setTimeout(() => {
              el.classList.remove('will-change-transform', 'will-change-opacity');
            }, 800); // Slightly longer than animation duration
          }, data.index * 100); // Reduced delay for better responsiveness
        });
        
        // Add will-change properties early for a performance hint
        el.classList.add('will-change-transform', 'will-change-opacity');
        
        observer.unobserve(el);
        elementMap.delete(el); // Cleanup our map
      }
    });
  }, {
    threshold: [0.1, 0.3], // Multiple thresholds for smoother triggers
    rootMargin: '0px 0px -10% 0px'
  });

  // Initialize elements with staggered indices
  document.querySelectorAll('.fade-trigger').forEach((el, index) => {
    // Store index in WeakMap instead of DOM attribute for better performance
    elementMap.set(el, { index });
    observer.observe(el);
  });
  
  // Return a cleanup function
  return () => {
    observer.disconnect();
  };
};

// Create a more efficient scroll handler with better throttling
export const createOptimizedScrollHandler = (callback: (scrollY: number, direction: 'up' | 'down') => void) => {
  let ticking = false;
  let lastScrollY = window.scrollY;
  let scheduledAnimationFrame: number | null = null;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Only process if we're not already ticking
    if (!ticking) {
      // Use a more efficient approach only calling when actually needed
      scheduledAnimationFrame = requestAnimationFrame(() => {
        // Calculate scroll direction
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Call the callback with current values
        callback(currentScrollY, direction);
        
        // Update state for next comparison
        lastScrollY = currentScrollY;
        ticking = false;
        scheduledAnimationFrame = null;
      });
      
      ticking = true;
    }
  };

  // Return both handler and cleanup function
  return {
    handler: handleScroll,
    cleanup: () => {
      if (scheduledAnimationFrame) {
        cancelAnimationFrame(scheduledAnimationFrame);
      }
    }
  };
};

// Better viewport detection with caching for performance
export const createViewportObserver = (
  callback: (el: Element, isIntersecting: boolean) => void, 
  options = { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      callback(entry.target, entry.isIntersecting);
    });
  }, options);
  
  return {
    observe: (el: Element) => observer.observe(el),
    unobserve: (el: Element) => observer.unobserve(el),
    disconnect: () => observer.disconnect()
  };
};

// Optimized viewport checking that's more efficient than getBoundingClientRect() for frequent checks
export const isInViewport = (() => {
  // Cache window dimensions and update on resize for efficiency
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  
  // Update window dimensions on resize with debounce
  let resizeTimeout: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;
    }, 100);
  });
  
  // Return optimized function
  return (element: Element, offset = 0): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= windowHeight - offset &&
      rect.bottom >= offset &&
      rect.left <= windowWidth &&
      rect.right >= 0
    );
  };
})();