import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { Project } from '../../types/project';
import { FiLoader } from 'react-icons/fi';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  isGitHub?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function ProjectModal({ project, onClose, isGitHub, onPrevious, onNext }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageListRef = useRef<HTMLDivElement>(null);
  const images = project.images || [project.thumbnail];
  const [imageLoading, setImageLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Add ref for scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Add touch handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto slideshow
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    
    const interval = setInterval(() => {
      handleNextImage();
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [currentImageIndex, isAutoPlaying]);

  // Optimize touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return; // Ignore multi-touch
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStart - touchEndX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
    setTouchStart(0);
  };

  // Update image navigation functions
  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(nextIndex);
    scrollContainerRef.current?.querySelector(`[data-index="${nextIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    scrollContainerRef.current?.querySelector(`[data-index="${nextIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  // Add touch event handling for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      const difference = touchStartX - touchEndX;
      
      if (Math.abs(difference) > 50) { // Minimum swipe distance
        if (difference > 0) {
          handleNextImage();
        } else {
          handlePrevImage();
        }
      }
    };
    
    const modalElement = document.querySelector('.project-modal');
    if (modalElement) {
      modalElement.addEventListener('touchstart', handleTouchStart);
      modalElement.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        modalElement.removeEventListener('touchstart', handleTouchStart);
        modalElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleNextImage, handlePrevImage]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious && onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext && onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  // Add click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Scroll to selected thumbnail
  useEffect(() => {
    if (imageListRef.current && project.images?.length > 1) {
      const thumbnailWidth = 80; // approximate width of thumbnail + margin
      const scrollPosition = currentImageIndex * thumbnailWidth;
      imageListRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentImageIndex, project.images]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const nextImage = () => {
    if (project.images && currentImageIndex < project.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Format project links for better UX
  const formatUrl = (url: string) => {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl 
                 bg-dark-200/95 border border-primary/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Close button with improved position and accessibility */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-300/80 text-white/60 hover:text-white
                   hover:bg-dark-300 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        <div className="hidden sm:block">
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
                       bg-dark-300/80 text-white/60 hover:text-white hover:bg-dark-300/95
                       transition-colors transform hover:-translate-x-1"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
                       bg-dark-300/80 text-white/60 hover:text-white hover:bg-dark-300/95
                       transition-colors transform hover:translate-x-1"
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Project image showcase with improved navigation */}
        {project.images && project.images.length > 0 && (
          <div className="relative aspect-video bg-dark-300/50">
            <div className="absolute inset-0 flex items-center justify-center bg-dark-300/30">
              <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
            <img
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setShowLightbox(true)}
              style={{ objectFit: 'cover' }}
              onLoad={(e) => {
                // Remove loading indicator when image loads
                const target = e.target as HTMLElement;
                const parent = target.parentElement;
                if (parent) {
                  const loadingIndicator = parent.querySelector('div');
                  if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                  }
                }
              }}
            />
            
            {/* Image navigation overlay */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full 
                           bg-dark-300/70 text-white/80 hover:text-white hover:bg-dark-300/90
                           transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  disabled={currentImageIndex === project.images.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full 
                           bg-dark-300/70 text-white/80 hover:text-white hover:bg-dark-300/90
                           transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-dark-300/70 text-white/80 text-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
            
            {/* Thumbnail navigation for multiple images */}
            {project.images.length > 1 && (
              <div 
                ref={imageListRef}
                className="absolute bottom-4 left-4 right-4 flex space-x-2 px-4 py-2 overflow-x-auto hide-scrollbar"
                style={{ maxWidth: 'calc(100% - 100px)' }}
              >
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-12 w-20 flex-shrink-0 rounded-md overflow-hidden transition-all cursor-pointer
                              ${index === currentImageIndex ? 'border-2 border-primary' : 'border border-white/20 opacity-70'}`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Project content with enhanced styling */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header with metadata */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <div className="flex flex-wrap gap-3 mb-3">
              <span className="px-4 py-1.5 text-sm rounded-full bg-primary/10 text-primary/90 
                             border border-primary/20 backdrop-blur-sm">
                {isGitHub ? 'GitHub Project' : project.category || 'Project'}
              </span>
              {project.details?.timeline && (
                <span className="px-4 py-1.5 text-sm rounded-full bg-dark-300/50 text-white/70 
                               border border-white/10 backdrop-blur-sm">
                  {project.details.timeline}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#9b111e] to-[#ff1616]">
              {project.title}
            </h2>
          </div>

          {/* Main content grid - responsive layout */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left column: Project metadata */}
            <div className="md:col-span-1 space-y-6">
              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-white/40 uppercase">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-[#ff1616]/10 text-[#ff1616]/90 
                               border border-[#ff1616]/20 hover:bg-[#ff1616]/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role if available */}
              {project.details?.role && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-white/40 uppercase">Role</h4>
                  <p className="text-white/90">{project.details.role}</p>
                </div>
              )}
              
              {/* Links with improved appearance */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-white/40 uppercase">Links</h4>
                <div className="flex flex-col gap-3">
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent 
                               text-white rounded-lg transition-all duration-300 hover:-translate-y-1 
                               hover:shadow-lg hover:shadow-primary/20"
                    >
                      <span>View Live</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2 border border-primary 
                               text-primary hover:text-white rounded-lg transition-all duration-300 
                               relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View Code
                      </span>
                      <div className="absolute inset-0 bg-primary translate-y-[200%] group-hover:translate-y-0 
                                    transition-transform duration-500" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right column: Project details */}
            <div className="md:col-span-2 space-y-6">
              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">About</h3>
                <p className="text-white/80 leading-relaxed">{project.description}</p>
              </div>
              
              {/* Challenge & Solution Section with improved UI */}
              {project.details?.showDetails && project.details?.challenge && project.details?.solution && (
                <div className="space-y-6">
                  <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Development Journey</h3>
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {/* Challenge */}
                    <div className="bg-dark-300/30 rounded-lg p-5 border border-white/5 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="p-1.5 rounded-full bg-[#ff1616]/20 flex-shrink-0">
                          <svg className="w-4 h-4 text-[#ff1616]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </span>
                        <h4 className="text-white font-medium">The Challenge</h4>
                      </div>
                      <p className="text-white/70 leading-relaxed">{project.details.challenge}</p>
                    </div>
                    
                    {/* Solution */}
                    <div className="bg-dark-300/30 rounded-lg p-5 border border-white/5 hover:border-accent/20 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="p-1.5 rounded-full bg-accent/20 flex-shrink-0">
                          <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </span>
                        <h4 className="text-white font-medium">The Solution</h4>
                      </div>
                      <p className="text-white/70 leading-relaxed">{project.details.solution}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Impact Section */}
              {project.details?.showDetails && project.details?.impact && (
                <div className="bg-dark-300/30 rounded-lg p-5 border border-white/5 hover:border-green-500/20 transition-colors mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-1.5 rounded-full bg-green-500/20 flex-shrink-0">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </span>
                    <h3 className="text-white font-medium">Impact & Results</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{project.details.impact}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen lightbox for images */}
      {showLightbox && project.images && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button 
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img 
            src={project.images[currentImageIndex]} 
            alt={project.title} 
            className="max-w-full max-h-[85vh] object-contain"
          />
          
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20
                         transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                disabled={currentImageIndex === project.images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20
                         transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}