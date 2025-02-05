import { useEffect } from 'react';

const criticalResources = [
  { type: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
  { type: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  // Add your critical resources here
];

export default function ResourceHints() {
  useEffect(() => {
    // Add dynamic resource hints based on user interaction
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('http')) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = new URL(href).origin;
        document.head.appendChild(link);
      }
    };

    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    return () => document.removeEventListener('mouseover', handleMouseEnter);
  }, []);

  return (
    <>
      {criticalResources.map((resource, index) => (
        <link 
          key={index}
          rel={resource.type}
          href={resource.href}
          {...(resource.crossOrigin && { crossOrigin: resource.crossOrigin })}
        />
      ))}
    </>
  );
} 