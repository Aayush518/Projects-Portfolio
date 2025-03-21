import { motion } from 'framer-motion';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onView: () => void;
  onGitHub: () => void;
  index?: number; // Make index optional to avoid errors
}

export default function ProjectCard({ project, onView, onGitHub, index }: ProjectCardProps) {
  // Prevent event propagation to ensure clicks work properly
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div className="group relative bg-dark-200/50 rounded-xl overflow-hidden border border-white/5 h-full flex flex-col hover-card">
      {/* Thumbnail with explicit z-index */}
      <div 
        className="relative aspect-video overflow-hidden cursor-pointer z-10" 
        onClick={(e) => handleButtonClick(e, onView)}
      >
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-transparent opacity-60" />
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 flex flex-col z-20 relative">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 text-xs rounded-full bg-[#ff1616]/10 text-[#ff1616]/90 border border-[#ff1616]/10">
            {project.category || 'Project'}
          </span>
        </div>
        
        <h3 
          className="text-xl font-display font-bold mb-2 group-hover:text-[#ff1616] transition-colors cursor-pointer"
          onClick={(e) => handleButtonClick(e, onView)}
        >
          {project.title}
        </h3>
        
        <p className="text-sm text-white/60 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Footer with explicit z-index */}
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center relative z-30">
          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs text-white/40">{tech}</span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="text-xs text-white/40">+{project.technologies.length - 3}</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => handleButtonClick(e, onView)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/70 hover:text-[#ff1616] relative z-40"
              aria-label="View project details"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            {project.links?.github && (
              <button 
                onClick={(e) => handleButtonClick(e, onGitHub)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/70 hover:text-[#ff1616] relative z-40"
                aria-label="View GitHub repository"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Create a explicit clickable overlay for the entire card */}
      <div 
        className="absolute inset-0 z-0 cursor-pointer"
        onClick={(e) => handleButtonClick(e, onView)}
        aria-hidden="true"
      />
    </div>
  );
}