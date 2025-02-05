import { useEffect, useState } from 'react';
import { useThrottledValue } from './useThrottledValue';

export function useParallax(sensitivity: number = 0.1) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const throttledPosition = useThrottledValue(position, 50);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * sensitivity;
      const y = (e.clientY / window.innerHeight - 0.5) * sensitivity;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);

  return throttledPosition;
} 