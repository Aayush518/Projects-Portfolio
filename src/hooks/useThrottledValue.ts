import { useState, useEffect, useRef } from 'react';

export function useThrottledValue<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());
  const valueRef = useRef<T>(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    valueRef.current = value;
    
    const handler = () => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdated.current;
      
      if (timeSinceLastUpdate >= delay) {
        setThrottledValue(valueRef.current);
        lastUpdated.current = now;
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          setThrottledValue(valueRef.current);
          lastUpdated.current = Date.now();
          timeoutRef.current = null;
        }, delay - timeSinceLastUpdate);
      }
    };
    
    handler(); // Initial call to ensure immediate first update
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
}