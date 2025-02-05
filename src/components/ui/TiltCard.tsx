import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareEffect?: boolean;
  tiltAmount?: number;
  perspective?: number;
}

export default function TiltCard({ 
  children, 
  className = '',
  glareEffect = true,
  tiltAmount = 20,
  perspective = 1000
}: TiltCardProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [touchStartY, setTouchStartY] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltAmount}deg`, `-${tiltAmount}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltAmount}deg`, `${tiltAmount}deg`]);
  const scale = useSpring(hovering ? 1.02 : 1, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    
    if (glareEffect) {
      setGlarePosition({ 
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100
      });
    }
  };

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setHovering(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY;
    
    // Simulate tilt based on touch movement
    y.set(deltaY / rect.height);
  };

  const handleTouchEnd = () => {
    setHovering(false);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        scale: hovering ? 0.98 : 1,
        transformStyle: "preserve-3d",
        perspective,
      }}
      className={`relative ${className} touch-none`}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {children}
      </div>

      <AnimatePresence>
        {hovering && glareEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
            style={{ transform: "translateZ(80px)" }}
          >
            <div 
              className="absolute w-[500px] h-[500px] bg-gradient-radial from-white/30 to-transparent rounded-full blur-xl"
              style={{ 
                left: `${glarePosition.x}%`,
                top: `${glarePosition.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/20 to-transparent 
                     pointer-events-none"
            style={{ transform: "translateZ(50px)" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 