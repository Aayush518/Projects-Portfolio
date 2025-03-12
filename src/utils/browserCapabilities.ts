// This file provides optimized feature detection with memoized results

// Use memoization for expensive checks
const memoize = <T>(fn: () => T): () => T => {
  let computed = false;
  let result: T;
  
  return () => {
    if (!computed) {
      result = fn();
      computed = true;
    }
    return result;
  };
};

// Check for intersection observer
export const hasIntersectionObserver = memoize(() => 
  typeof IntersectionObserver !== 'undefined'
);

// Check for idle callback support
export const hasIdleCallback = memoize(() => 
  typeof requestIdleCallback !== 'undefined'
);

// Check for passive event listeners
export const supportsPassiveEvents = memoize(() => {
  let passiveSupported = false;
  
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    
    window.addEventListener('test', null as any, options);
    window.removeEventListener('test', null as any, options);
  } catch (err) {
    passiveSupported = false;
  }
  
  return passiveSupported;
});

// Check for battery status API
export const hasBatteryAPI = memoize(() => 
  typeof navigator !== 'undefined' && 'getBattery' in navigator
);

// Detect if device is low-end
export const isLowEndDevice = memoize(() => {
  // Skip on SSR
  if (typeof window === 'undefined') return false;
  
  // Connection API check
  const poorConnection = 'connection' in navigator && 
    ((navigator as any).connection?.saveData || 
     ['slow-2g', '2g'].includes((navigator as any).connection?.effectiveType));
  
  // Device memory/CPU check
  const lowHardware = 
    ('deviceMemory' in navigator && (navigator as any).deviceMemory < 4) ||
    ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4);
  
  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return poorConnection || lowHardware || prefersReducedMotion;
});

// Get optimal animation settings based on device
export const getAnimationSettings = memoize(() => {
  if (isLowEndDevice()) {
    return {
      enabled: false,
      duration: 0
    };
  }
  
  return {
    enabled: true,
    duration: window.innerWidth < 768 ? 300 : 500 // Shorter duration on mobile
  };
});
