import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types/project';

interface ProjectViewerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectViewer({ project, onClose }: ProjectViewerProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
      >
        <div className="container mx-auto px-4 py-16">
          <button
            onClick={onClose}
            className="fixed top-8 right-8 text-white text-4xl hover:rotate-90 transition-transform cursor-pointer"
          >
            ×
          </button>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold mb-8">{project.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">Overview</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-accent text-white rounded-full hover:bg-accent/80 transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>View Live</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border border-white rounded-full hover:bg-white/10 transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>View Code</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Challenge</h4>
                <p className="text-gray-300">{project.details.challenge}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Solution</h4>
                <p className="text-gray-300">{project.details.solution}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Impact</h4>
                <p className="text-gray-300">{project.details.impact}</p>
              </div>


                  
            </div>

            <div className="grid grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}