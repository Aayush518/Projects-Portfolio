import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageTransition() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[60] bg-dark"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center h-screen">
            <div className="shimmer-text text-3xl font-bold">Aayush518</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 