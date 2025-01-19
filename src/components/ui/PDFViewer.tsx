import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Writing } from '../../data/writings';

interface PDFViewerProps {
  writing: Writing;
  onClose: () => void;
}

export default function PDFViewer({ writing, onClose }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width < 768 ? width / 1024 : 1); // 1024 is a standard PDF width
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent h-24 z-10">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{writing.title}</h2>
            <p className="text-gray-400">{writing.category} • {writing.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={writing.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-full pt-24 overflow-auto bg-[#1E1E1E] flex justify-center"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div 
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
          className="w-full max-w-5xl bg-white rounded-lg shadow-2xl my-4 transition-transform duration-200"
        >
          <iframe
            src={`${writing.pdfUrl}#toolbar=0`}
            className="w-full h-[calc(100vh-8rem)]"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Mobile toolbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 flex justify-center gap-4">
        <button
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
          className="p-2 bg-white/10 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={() => setScale(1)}
          className="p-2 bg-white/10 rounded-lg"
        >
          100%
        </button>
        <button
          onClick={() => setScale(prev => Math.min(prev + 0.1, 1.5))}
          className="p-2 bg-white/10 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}