import { motion } from 'framer-motion';
import type { Project } from '../../types/project';
import { useRef, useState } from 'react';

interface FeaturedProjectProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function FeaturedProject({ project, onClick, index }: FeaturedProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl bg-dark-300/30 backdrop-blur-sm 
                 border border-white/5 shadow-lg hover:shadow-xl hover:border-primary/10 
                 transition-all duration-300 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Left: Image */}
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#ff1616]/20 text-[#ff1616] 
                           backdrop-blur-sm border border-[#ff1616]/20">
              Featured
            </span>
          </div>
        </div>
        
        {/* Right: Content */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 backdrop-blur-sm">
                {project.category.split(',')[0]}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-white/70 line-clamp-3">
              {project.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies?.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-[#ff1616]/10 text-[#ff1616]/90"
                >
                  {tech}
                </span>
              ))}
              {project.technologies && project.technologies.length > 4 && (
                <span className="text-xs px-3 py-1 rounded-full bg-dark-200/50 text-white/60">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4">
              <button 
                onClick={onClick} 
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#9b111e] to-[#ff1616] text-white 
                         flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 
                         transition-all text-sm font-medium"
              >
                View Details
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {project.links.live && (
                <a 
                  href={project.links.live}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 
                           hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
