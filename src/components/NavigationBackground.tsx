import React, { useEffect, useRef } from 'react';

interface NavigationBackgroundProps {
  isScrolled: boolean;
}

export default function NavigationBackground({ isScrolled }: NavigationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldRender = useRef(true);
  
  useEffect(() => {
    // Skip rendering for low-end devices
    shouldRender.current = !(
      document.documentElement.classList.contains('low-end-device') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    );
    
    if (!shouldRender.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Use a fixed size canvas for better performance
    const height = 80;
    canvas.height = height;
    canvas.width = window.innerWidth;
    
    // Very limited particles for better performance
    const particleCount = Math.min(8, Math.floor(window.innerWidth / 300));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.1, // Slower movement
      vy: (Math.random() - 0.5) * 0.1,
      alpha: isScrolled ? 0.2 : 0.1
    }));
    
    let rafId: number | null = null;
    let lastFrame = 0;
    const FPS_LIMIT = 30; // Limit FPS for better performance
    
    const render = (timestamp: number) => {
      // Throttle rendering
      if (timestamp - lastFrame < 1000 / FPS_LIMIT) {
        rafId = requestAnimationFrame(render);
        return;
      }
      
      lastFrame = timestamp;
      ctx.clearRect(0, 0, canvas.width, height);
      
      // Batch style operations outside loops
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        // Target alpha based on scroll state
        p.alpha = isScrolled ? 0.2 : 0.1;
      }
      
      // Draw connections (minimal)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSquared = dx * dx + dy * dy;
          
          // Using distance squared is faster than Math.sqrt
          if (distSquared < 1600) { // 40^2
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      rafId = requestAnimationFrame(render);
    };
    
    // Only add resize listener if absolutely needed
    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    rafId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isScrolled]);
  
  if (!shouldRender.current) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-50"
      style={{ 
        height: '100%', 
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  );
}
