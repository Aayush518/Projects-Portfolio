export function detectLowEndDevice() {
  // Only run in browser
  if (typeof window === 'undefined') return false;
  
  // Device Memory API
  const lowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
  
  // Hardware Concurrency (CPU cores)
  const lowCPU = 'hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4;
  
  // Network Connection
  const poorConnection = 'connection' in navigator && 
    ((navigator as any).connection?.saveData || 
     ['slow-2g', '2g', '3g'].includes((navigator as any).connection?.effectiveType));
  
  // Motion Preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Battery Status (if available)
  let batteryLow = false;
  if ('getBattery' in navigator) {
    (navigator as any).getBattery().then((battery: any) => {
      batteryLow = battery.level < 0.15 && !battery.charging;
    }).catch(() => {});
  }
  
  // Mobile device check
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || ''
  );
  
  // Low-res screen
  const lowResScreen = window.devicePixelRatio < 1.5;
  
  // Combined detection
  return lowMemory || lowCPU || poorConnection || reducedMotion || batteryLow || (isMobile && lowResScreen);
}

export function applyPerformanceOptimizations() {
  if (typeof window === 'undefined') return;
  
  // Set initial state
  document.documentElement.classList.add('optimize-performance');
  
  // Detect low-end device
  if (detectLowEndDevice()) {
    document.documentElement.classList.add('low-end-device');
    
    // Disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Set reduced animation
    document.body.style.setProperty('--animation-duration', '0s');
    
    // Load low quality images if available
    document.querySelectorAll('img[data-low-src]').forEach(img => {
      if (img instanceof HTMLImageElement && img.dataset.lowSrc) {
        img.src = img.dataset.lowSrc;
      }
    });
  }
  
  // Temporarily disable animations during load
  document.documentElement.classList.add('disable-animations');
  setTimeout(() => {
    document.documentElement.classList.remove('disable-animations');
  }, 300);
  
  // Optimize DOM content with content-visibility
  document.querySelectorAll('section, footer').forEach(section => {
    section.classList.add('optimize-offscreen');
  });
}
