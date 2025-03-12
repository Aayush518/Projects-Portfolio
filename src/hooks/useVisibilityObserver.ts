import { useEffect, useRef, useState } from 'react';

// Create a single shared observer instance for better performance
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, (isVisible: boolean) => void>();

const createObserver = () => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const callback = observerCallbacks.get(entry.target);
        if (callback) callback(entry.isIntersecting);
      });
    },
    { threshold: 0.1, rootMargin: '100px' }
  );
};

// Initialize shared observer
const getObserver = () => {
  if (!sharedObserver && typeof window !== 'undefined') {
    sharedObserver = createObserver();
  }
  return sharedObserver;
};

export function useVisibilityObserver<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = getObserver();
    const element = ref.current;
    
    if (!observer || !element) return;
    
    // Store callback in shared map
    const callback = (visible: boolean) => setIsVisible(visible);
    observerCallbacks.set(element, callback);
    
    // Start observing the element
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
      observerCallbacks.delete(element);
    };
  }, []);
  
  return { ref, isVisible };
}
