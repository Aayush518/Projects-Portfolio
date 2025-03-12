import { motion } from 'framer-motion';
import type { Project } from '../../types/project';
import { useRef, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create a subtle mouse movement effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties}
      className="card group cursor-pointer h-full flex flex-col bg-dark-300/30 backdrop-blur-sm 
                 border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                 hover:border-primary/10 transition-all duration-300"
      onClick={onClick}
      whileHover={{ 
        y: -8, 
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 20 
        } 
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out
                     group-hover:scale-110 group-hover:saturate-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-60" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs rounded-full bg-[#ff1616]/10 text-[#ff1616]/90 backdrop-blur-sm border border-[#ff1616]/20">
            {project.category.split(',')[0]}
          </span>
        </div>
        
        {/* Show 'New' badge if the project is new (add logic based on your needs) */}
        {index < 3 && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 backdrop-blur-sm 
                          border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              New
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white group-hover:text-[#ff1616] transition-colors">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-[#ff1616]/10 text-[#ff1616]/90"
            >
              {tech}
            </span>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <span className="text-xs px-3 py-1 rounded-full bg-dark-200/50 text-white/60">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        
        {/* View Project Button */}
        <button className="mt-2 w-full py-2 rounded-lg border border-white/10 bg-white/5 text-white/70 
                         text-sm flex items-center justify-center gap-2 group-hover:bg-[#ff1616]/10 
                         group-hover:border-[#ff1616]/20 group-hover:text-[#ff1616] transition-all">
          View Project
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}