export function optimizePerformance() {
  // Optimize animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe elements with animations
  document.querySelectorAll('.animate-on-scroll').forEach(
    (element) => observer.observe(element)
  );

  // Optimize images
  document.querySelectorAll('img').forEach(img => {
    if (img.getAttribute('loading') !== 'eager') {
      img.setAttribute('loading', 'lazy');
    }
  });

  // Add smooth scrolling with momentum
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
} 