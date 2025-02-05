import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';

export function useOptimizedAnimation(value: number, threshold: number = 0.01) {
  const motionValue = useMotionValue(value);
  const rafRef = useRef<number>();
  const previousValue = useRef(value);

  useEffect(() => {
    const animate = () => {
      const diff = Math.abs(value - previousValue.current);
      
      if (diff > threshold) {
        motionValue.set(value);
        previousValue.current = value;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, threshold, motionValue]);

  return motionValue;
} 