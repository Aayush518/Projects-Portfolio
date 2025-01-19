import { motion } from 'framer-motion';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      className="relative group cursor-pointer"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-gray-300">{project.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}