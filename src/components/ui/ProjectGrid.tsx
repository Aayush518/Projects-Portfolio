import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types/project';

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (id: string) => void;
}

export default function ProjectGrid({ projects, onProjectSelect }: ProjectGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectSelect(project.id)}
          index={index}
        />
      ))}
    </motion.div>
  );
}