import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ResourcePreloader } from '../utils/resourcePreloader';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  blur?: boolean;
  quality?: number;
}

export default function SmartImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  blur = true,
  quality = 75 
}: SmartImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const preloader = ResourcePreloader.getInstance();

  useEffect(() => {
    if (blur) {
      // Generate tiny placeholder
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 10;
        canvas.height = 10;
        if (ctx) {
          ctx.drawImage(img, 0, 0, 10, 10);
          setBlurDataUrl(canvas.toDataURL('image/jpeg', 0.1));
        }
      };
    }

    if (priority) {
      preloader.preloadImage(src, 'high');
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && imgRef.current) {
              preloader.preloadImage(src, 'low').then(() => {
                imgRef.current!.src = src;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [src, priority, blur]);

  return (
    <motion.div
      className="relative overflow-hidden"
      animate={{ opacity: isLoaded ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <img
        ref={imgRef}
        src={priority ? src : blurDataUrl || ''}
        alt={alt}
        className={`transition-all duration-300 ${className} ${
          !isLoaded && blur ? 'scale-110 blur-xl' : 'scale-100 blur-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(quality && { srcSet: `${src} ${quality}w` })}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-dark-200/50 animate-pulse" />
      )}
    </motion.div>
  );
} 