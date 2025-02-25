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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const seekTime = (direction: 'forward' | 'backward') => {
    if (audioRef.current) {
      const newTime = currentTime + (direction === 'forward' ? 10 : -10);
      audioRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const audioElement = (
    <audio 
      ref={audioRef}
      src={writing.audioUrl}
      onEnded={() => setIsPlaying(false)}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      className="hidden"
    />
  );

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
        <div className="flex-1 overflow-hidden bg-dark-100/50 relative">
          {audioElement}
          <div className="h-full w-full flex">
            {/* PDF Viewer Container */}
            <div className={`${
              isFullScreen ? 'w-full px-4 md:px-16 lg:px-32' : 'flex-1'
            } h-full relative`}>
              <div className="h-full overflow-y-auto overflow-x-hidden 
                            scrollbar-thin scrollbar-thumb-[#ff1616]/20 
                            scrollbar-track-dark-300/20 hover:scrollbar-thumb-[#ff1616]/40">
                <iframe
                  src={`${writing.pdfUrl}#zoom=FitW`}
                  title={writing.title}
                  className="w-full h-full bg-transparent"
                  style={{
                    minHeight: '100vh',
                    height: isFullScreen ? '100vh' : '85vh'
                  }}
                />
              </div>
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

                  {/* Audio Player Button */}
                  {writing.audioUrl && (
                    <div className="mt-4 space-y-4 p-4 bg-dark-300/50 rounded-lg border border-[#ff1616]/20">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => seekTime('backward')}
                          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <svg className="w-6 h-6 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                          </svg>
                        </button>
                        
                        <button
                          onClick={toggleAudio}
                          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#9b111e] to-[#ff1616] 
                                   flex items-center justify-center transform hover:scale-105 
                                   transition-all duration-300 shadow-lg shadow-[#ff1616]/20"
                        >
                          {isPlaying ? (
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-white translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>

                        <button
                          onClick={() => seekTime('forward')}
                          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <svg className="w-6 h-6 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.5 8c2.65 0 5.05.99 6.9 2.6L22 7v9h-9l3.62-3.62C15.23 11.22 13.46 10.5 11.5 10.5c-3.54 0-6.55 2.31-7.6 5.5L1.53 15.22C2.92 11.03 6.85 8 11.5 8z"/>
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="text-center text-white/60 text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={duration}
                          value={currentTime}
                          onChange={(e) => {
                            const time = parseFloat(e.target.value);
                            if (audioRef.current) {
                              audioRef.current.currentTime = time;
                            }
                          }}
                          className="w-full accent-[#ff1616]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Compact Audio Player - Visible in full screen */}
            {writing.audioUrl && isFullScreen && (
              <div className="fixed bottom-8 right-8 z-50 bg-dark-200/95 rounded-xl border border-[#ff1616]/20 
                            shadow-2xl backdrop-blur-sm w-72 overflow-hidden hover:bg-dark-200">
                <div className="p-3">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
                    <div className="flex-1">
                      <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={(e) => {
                          const time = parseFloat(e.target.value);
                          if (audioRef.current) {
                            audioRef.current.currentTime = time;
                          }
                        }}
                        className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5
                                [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-[#ff1616]
                                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                    </div>
                    <span className="text-xs text-white/60">{formatTime(duration)}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => seekTime('backward')}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
                      </svg>
                    </button>

                    <button
                      onClick={toggleAudio}
                      className="w-10 h-10 rounded-full bg-[#ff1616] flex items-center justify-center
                               hover:bg-[#9b111e] transition-colors"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    <button
                      onClick={() => seekTime('forward')}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.5 8c2.65 0 5.05.99 6.9 2.6L22 7v9h-9l3.62-3.62C15.23 11.22 13.46 10.5 11.5 10.5c-3.54 0-6.55 2.31-7.6 5.5L1.53 15.22C2.92 11.03 6.85 8 11.5 8z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}