import { motion } from 'framer-motion';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group bg-dark-300/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer 
                 border border-[#ff1616]/10 hover:border-[#ff1616]/20 transition-all duration-300
                 touch-pan-y"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-60" />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-[#ff1616] transition-colors">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-[#ff1616]/10 text-[#ff1616]/90"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}