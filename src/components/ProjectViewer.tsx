import { motion } from 'framer-motion';
import type { Project } from '../types/project';
import ProjectHeader from './project/ProjectHeader';
import ProjectContent from './project/ProjectContent';
import CloseButton from './ui/CloseButton';

interface ProjectViewerProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectViewer({ project, onClose }: ProjectViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0A0B1E]/95" />
      <div className="absolute inset-0 bg-gradient-radial from-[#4F46E5]/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl 
                   bg-dark-200/90 border border-primary/10 shadow-xl"
      >
        <CloseButton onClose={onClose} />
        <ProjectHeader project={project} />
        <ProjectContent project={project} />
      </motion.div>
    </motion.div>
  );
}