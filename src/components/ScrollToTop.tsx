import { useRef, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
  // Use refs to avoid unnecessary renders
  const buttonRef = useRef<HTMLButtonElement>(null);
  const visibleRef = useRef(false);
  
  useEffect(() => {
    // Skip for low-end devices
    if (document.documentElement.classList.contains('low-end-device')) {
      return;
    }
    
    // Highly optimized scroll detection
    let ticking = false;
    let scrollTimeout: number;
    
    const updateButtonVisibility = (show: boolean) => {
      if (visibleRef.current === show || !buttonRef.current) return;
      visibleRef.current = show;
      
      buttonRef.current.style.display = show ? 'block' : 'none';
      buttonRef.current.style.opacity = show ? '1' : '0';
    };
    
    const handleScroll = () => {
      if (ticking) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        ticking = false;
      }, 100);
      
      ticking = true;
      
      // Use requestAnimationFrame to batch visual updates
      requestAnimationFrame(() => {
        updateButtonVisibility(window.scrollY > 300);
      });
    };
    
    // Add passive event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };
  
  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-primary hover:bg-primary-light 
               shadow-lg shadow-primary/20 z-50 gpu-accelerate"
      aria-label="Scroll to top"
      style={{
        display: 'none',
        opacity: 0,
        transform: 'translateZ(0)',
        transition: 'opacity 0.2s'
      }}
    >
      <FiArrowUp className="w-6 h-6 text-white" />
    </button>
  );
}