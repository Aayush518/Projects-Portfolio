import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { Project } from '../../types/project';
import { FiLoader } from 'react-icons/fi';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isGitHub?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  isOpen: boolean;
}

export default function ProjectModal({ project, onClose, isGitHub, onPrevious, onNext, isOpen }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Add ref for scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Reset state when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setImageLoading(true);
    }
  }, [project]);
  
  // Only extract images if project exists
  const images = project?.images || (project?.thumbnail ? [project.thumbnail] : []);
  
  // If project is null or modal is not open, don't render anything
  if (!isOpen) return null;
  
  // Debug logging
  console.log("Modal rendering with:", { isOpen, project: project?.title, images: images.length });
  
  // Handle navigation functions
  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    
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
    if (images.length <= 1) return;
    
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    scrollContainerRef.current?.querySelector(`[data-index="${nextIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  // Handle touch events for image swipe
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return; // Ignore multi-touch
    const touchStartX = e.touches[0].clientX;
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const difference = touchStartX - touchEndX;
      
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          handleNextImage();
        } else {
          handlePrevImage();
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  // Set up an effect for autoplay
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || !isOpen) return;
    
    const interval = setInterval(() => {
      handleNextImage();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentImageIndex, isAutoPlaying, isOpen, images.length]);

  // Handle link clicks
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-hidden transition-all duration-300"
      onClick={onClose}
      onTouchStart={onTouchStart}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[#0A0B1E]/95" />
      <div className="absolute inset-0 bg-gradient-radial from-[#4F46E5]/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />

      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 md:inset-10 lg:inset-20 m-auto bg-dark-200/90 rounded-xl 
                   overflow-hidden border border-[#ff1616]/10 shadow-xl shadow-black/20 z-[101]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-dark-300/50 
                     hover:bg-[#ff1616]/20 transition-colors group z-20"
        >
          <svg className="w-5 h-5 text-white/70 group-hover:text-[#ff1616]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {project && (
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left Column - Images Gallery */}
            <div className="lg:w-3/5 h-full flex flex-col">
              {/* Image Gallery with Vertical Center */}
              <div 
                ref={scrollContainerRef}
                className="relative flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin 
                          scrollbar-thumb-[#ff1616]/20 scrollbar-track-dark-300/20"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="flex snap-x snap-mandatory h-full">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      data-index={index}
                      className="flex-none w-full h-full snap-center"
                    >
                      <div className="relative h-full flex items-center justify-center">
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-dark-300/50">
                            <FiLoader className="w-8 h-8 text-primary animate-spin" />
                          </div>
                        )}
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="max-h-full max-w-full object-contain transition-opacity duration-300"
                          style={{ opacity: imageLoading ? 0 : 1 }}
                          onLoad={() => setImageLoading(false)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent opacity-60" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                               bg-dark-300/50 hover:bg-[#ff1616]/20 transition-colors group z-10"
                    >
                      <svg className="w-6 h-6 text-white/70 group-hover:text-[#ff1616]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                               bg-dark-300/50 hover:bg-[#ff1616]/20 transition-colors group z-10"
                    >
                      <svg className="w-6 h-6 text-white/70 group-hover:text-[#ff1616]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Add play/pause button */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoPlaying(!isAutoPlaying);
                    }}
                    className="absolute bottom-4 left-4 p-2 rounded-full bg-dark-300/50 
                              hover:bg-[#ff1616]/20 transition-colors z-10"
                  >
                    {isAutoPlaying ? (
                      <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-dark-300/50 
                              text-white/70 text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex-none h-20 overflow-x-auto flex gap-2 p-4 bg-dark-300/50 
                              scrollbar-thin scrollbar-thumb-[#ff1616]/20 scrollbar-track-dark-300/20">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        scrollContainerRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'start'
                        });
                      }}
                      className={`flex-none h-full aspect-video rounded-md overflow-hidden 
                                border-2 transition-colors ${
                                  index === currentImageIndex 
                                    ? 'border-[#ff1616]' 
                                    : 'border-transparent hover:border-[#ff1616]/50'
                                }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Content */}
            <div className="lg:w-2/5 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#ff1616]/20 
                           scrollbar-track-dark-300/20 hover:scrollbar-thumb-[#ff1616]/40">
              <div className="p-8 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 text-sm rounded-full bg-[#ff1616]/20 text-[#ff1616] 
                                   border border-[#ff1616]/20 backdrop-blur-sm">
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

                {/* About Section */}
                <div className="space-y-6">
                  <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">About</h3>
                  
                  {/* Overview */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-white/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-[#ff1616]/40 uppercase">Project Type</h4>
                      <p className="text-white/90">{project.category}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-[#ff1616]/40 uppercase">Timeline</h4>
                      <p className="text-white/90">{project.details?.timeline || 'Ongoing'}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-[#ff1616]/40 uppercase">Role</h4>
                      <p className="text-white/90">{project.details?.role || 'Lead Developer'}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="pt-4">
                    <h4 className="text-xs font-mono text-white/40 uppercase mb-3">Tech Stack</h4>
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
                </div>

                {/* Challenge & Solution Section */}
                {project.details?.showDetails && project.details?.challenge && project.details?.solution && (
                  <div className="space-y-6 pt-4">
                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Development Journey</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-full bg-[#ff1616]/20">
                            <svg className="w-4 h-4 text-[#ff1616]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </span>
                          <h4 className="text-white font-medium">The Challenge</h4>
                        </div>
                        <p className="text-white/70 leading-relaxed">{project.details.challenge}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-full bg-accent/20">
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
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-full bg-green-500/20">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </span>
                      <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Impact & Results</h3>
                    </div>
                    <p className="text-white/70 leading-relaxed">{project.details.impact}</p>
                  </div>
                )}

                {/* Enhanced Links Section with improved click handling */}
                <div className="flex flex-wrap gap-4 pt-6">
                  {project.demo && (
                    <a
                      href={project.demo}
                      onClick={(e) => handleLinkClick(e, project.demo)}
                      className="group relative inline-flex items-center gap-2 px-6 py-3 
                                bg-gradient-to-r from-[#9b111e] to-[#ff1616] text-white rounded-lg 
                                overflow-hidden shadow-xl shadow-[#9b111e]/20 hover:shadow-[#ff1616]/20
                                transition-all duration-300 hover:-translate-y-1 active:translate-y-0
                                z-[102]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Live Demo
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#ff1616] to-[#9b111e] opacity-0 
                                       group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      onClick={(e) => handleLinkClick(e, project.links.github)}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ff1616] 
                               text-[#ff1616] hover:text-white rounded-lg transition-all duration-100 
                               relative overflow-hidden group z-[102]"
                    >
                      <span className="relative z-10">View Code</span>
                      <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#9b111e] to-[#ff1616] translate-y-[200%] group-hover:translate-y-0 
                                    transition-transform duration-500" />
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      onClick={(e) => handleLinkClick(e, project.links.live)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9b111e] to-[#ff1616] 
                               text-white rounded-lg transition-all duration-300 hover:-translate-y-1 
                               hover:shadow-lg hover:shadow-[#ff1616]/20 group z-[102]"
                    >
                      <span>View Live Demo</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                           fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}