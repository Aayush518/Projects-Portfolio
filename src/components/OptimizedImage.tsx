import { useEffect, useRef } from 'react';

// Create a single shared IntersectionObserver instance
const observerOptions = { rootMargin: '200px', threshold: 0.01 };
let sharedObserver: IntersectionObserver;

// Map to store load callbacks
const loadCallbacks = new WeakMap<HTMLImageElement, () => void>();

// Initialize observer once in browser
if (typeof window !== 'undefined') {
  sharedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
          // Load the image
          const tempImage = new Image();
          tempImage.onload = () => {
            img.src = src;
            img.style.opacity = '1';
            // Call stored callback if exists
            const callback = loadCallbacks.get(img);
            if (callback) callback();
          };
          tempImage.src = src;
          img.removeAttribute('data-src');
          sharedObserver.unobserve(img);
        }
      }
    });
  }, observerOptions);
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  lowQuality?: string;
  onLoad?: () => void;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  lowQuality,
  onLoad
}: OptimizedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const img = imgRef.current;
    if (!img || priority || !sharedObserver) return;

    // Store onLoad callback if provided
    if (onLoad) {
      loadCallbacks.set(img, onLoad);
    }

    // Check for low-end device to use lower quality image
    if (lowQuality && document.documentElement.classList.contains('low-end-device')) {
      img.dataset.src = lowQuality;
    } else {
      img.dataset.src = src;
    }
    
    // Start observing
    sharedObserver.observe(img);

    return () => {
      if (img) {
        sharedObserver.unobserve(img);
        loadCallbacks.delete(img);
      }
    };
  }, [src, lowQuality, priority, onLoad]);

  return (
    <div className="relative overflow-hidden bg-dark-200/50">
      <img
        ref={imgRef}
        src={priority ? src : ''}
        alt={alt}
        className={className}
        style={{ 
          opacity: priority ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={priority ? onLoad : undefined}
      />
    </div>
  );
}