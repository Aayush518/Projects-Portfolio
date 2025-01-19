import { motion } from 'framer-motion';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={item}
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
      
      <div className="relative">
        {/* Image container with aspect ratio */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
              {project.category}
            </span>
          </div>

          <p className="text-gray-300 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 text-sm rounded-full border border-white/10 group-hover:border-accent/50 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-white/5 text-sm rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* View Details Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-accent rounded-full text-white font-semibold flex items-center gap-2"
            >
              <span>View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}