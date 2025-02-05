import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Writing } from '../../types/writing';

interface PDFViewerProps {
  writing: Writing;
  onClose: () => void;
}

export default function PDFViewer({ writing, onClose }: PDFViewerProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width < 768 ? width / 1024 : 1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0A0B1E]/95" />
      <div className="absolute inset-0 bg-gradient-radial from-[#ff1616]/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-dark-200/90 rounded-xl overflow-hidden border border-[#ff1616]/10 flex flex-col transition-all duration-300 ${
          isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl h-[95vh] m-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#ff1616]/10 
                      bg-dark-300/50 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm rounded-full bg-[#ff1616]/10 text-[#ff1616]/90 
                             border border-[#ff1616]/20">
                {writing.category}
              </span>
              <span className="text-white/50 text-sm">{writing.date}</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#9b111e] to-[#ff1616]">
              {writing.title}
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Full Screen Toggle */}
            <button
              onClick={toggleFullScreen}
              className="p-2 rounded-full bg-dark-300/50 hover:bg-[#ff1616]/20 
                       transition-colors group"
            >
              {isFullScreen ? (
                <svg className="w-5 h-5 text-white/70 group-hover:text-[#ff1616]" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 9h6m-6 0v6m0-6L3 3m6 6l6 6m0-12h6m-6 0v6m0-6l6-6M3 21l6-6" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white/70 group-hover:text-[#ff1616]" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#ff1616]/10 hover:bg-[#ff1616]/20 
                       transition-colors z-10"
            >
              <svg className="w-6 h-6 text-[#ff1616]" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-hidden bg-dark-100/50">
          <div className="h-full w-full flex">
            {/* PDF Viewer */}
            <div className={`${isFullScreen ? 'w-full' : 'flex-1'} h-full overflow-y-auto 
                          scrollbar-thin scrollbar-thumb-[#ff1616]/20 
                          scrollbar-track-dark-300/20 hover:scrollbar-thumb-[#ff1616]/40`}>
              <iframe
                src={`${writing.pdfUrl}#view=FitH&toolbar=1&navpanes=1`}
                title={writing.title}
                className="w-full h-full"
                style={{ background: 'transparent' }}
              />
            </div>

            {/* Right Sidebar - Hidden in Full Screen */}
            {!isFullScreen && (
              <div className="w-80 flex-shrink-0 border-l border-[#ff1616]/10 bg-dark-200/50 
                            overflow-y-auto scrollbar-thin scrollbar-thumb-[#ff1616]/20 
                            scrollbar-track-dark-300/20 hover:scrollbar-thumb-[#ff1616]/40">
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">About</h3>
                    <p className="text-white/70 leading-relaxed">{writing.description}</p>
                  </div>

                  {/* Tags/Keywords */}
                  {writing.tags && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {writing.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-full bg-[#ff1616]/10 text-[#ff1616]/90 
                                     border border-[#ff1616]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download Button */}
                  <a
                    href={writing.pdfUrl}
                    download
                    className="group relative inline-flex items-center gap-2 px-6 py-3 w-full justify-center
                             bg-gradient-to-r from-[#9b111e] to-[#ff1616] text-white rounded-lg 
                             overflow-hidden transition-all duration-300 hover:-translate-y-1 
                             hover:shadow-lg hover:shadow-[#ff1616]/20"
                  >
                    <span className="relative z-10">Download PDF</span>
                    <svg 
                      className="w-4 h-4 group-hover:translate-y-0.5 transition-transform relative z-10"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff1616] to-[#9b111e] opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}