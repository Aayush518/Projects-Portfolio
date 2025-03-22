import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
  fallbackSrc?: string;
}

// Enhanced image component with better error handling and debugging
export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  objectPosition = 'center',
  fallbackSrc = '/placeholder.jpg' 
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  
  // Log on mount to debug
  useEffect(() => {
    console.log(`OptimizedImage attempting to load: ${src}`);
    
    // Preload image for better rendering
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      console.log(`Successfully loaded image: ${src}`);
      setLoaded(true);
      setError(false);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setError(true);
      // Try fallback if available
      if (fallbackSrc && fallbackSrc !== src) {
        console.log(`Trying fallback image: ${fallbackSrc}`);
        setImageSrc(fallbackSrc);
      }
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);
  
  // Show error state with more details
  if (error && imageSrc === src) {
    return (
      <div className={`bg-dark-300/50 flex flex-col items-center justify-center ${className}`}
           style={{ minHeight: '200px', ...style }}>
        <span className="text-white/70 text-sm mb-2">Image not available</span>
        <span className="text-white/40 text-xs">{src}</span>
        <button 
          className="mt-3 text-xs text-primary hover:text-primary-light transition-colors"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }
  
  // Use combined style with good defaults
  const combinedStyle = {
    ...style,
    objectPosition,
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.5s ease-in'
  };
  
  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-300/50">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      <img 
        src={imageSrc} 
        alt={alt}
        className={`${className} h-full w-full object-cover`}
        style={combinedStyle}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.error(`Error loading image in render: ${imageSrc}`);
          if (imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
        }}
        loading="eager"
      />
    </div>
  );
}