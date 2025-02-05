import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { writings } from '../../data/writings';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import PDFViewer from '../ui/PDFViewer';
import { fetchGitHubProjects } from '../../utils/github';
import PDFThumbnail from '../ui/PDFThumbnail';

// Update categories to be more focused on projects only
const categories = [
  'All',
  'Research & AI',    // Speech, NLP, ML projects
  'Development',      // Web & software development
] as const;

// Add a new type for technical content
type TechnicalTip = {
  id: string;
  title: string;
  description: string;
  category: 'Technical Writing';
  tags: string[];
  readingTime: string;
  publishedDate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  pdfUrl?: string;
  link: string;
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');

  // Simplified filtering logic for projects only
  const getFilteredProjects = () => {
    if (activeCategory === 'All') {
      return projects;
    }

    if (activeCategory === 'Research & AI') {
      return projects.filter(project => 
        project.category.toLowerCase().match(/research|ai|ml|speech|nlp/g) ||
        project.technologies?.some(tech => 
          tech.toLowerCase().match(/ai|ml|tensorflow|pytorch|nlp|speech/g)
        )
      );
    }

    return projects.filter(project => 
      activeCategory === 'Development' 
        ? project.category.toLowerCase().includes('development') ||
          project.technologies?.some(tech => 
            tech.toLowerCase().match(/react|node|typescript|javascript|web/g)
          )
        : project.category.includes(activeCategory)
    );
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-dark to-dark-100">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="heading-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b111e] to-[#ff1616]">
              Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-white/60 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A curated collection of projects showcasing expertise in speech technology, 
            web development, and artificial intelligence.
          </motion.p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-dark-200/50 text-white/60 hover:bg-dark-200 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="card group cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedProject(project.id)}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-200/90 to-transparent opacity-60" />
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs rounded-full glass text-primary/90 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex-1 p-6 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.technologies?.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full bg-dark-300/50 text-white/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="p-6 pt-0 flex gap-3">
                  {project.links.live && (
                    <a 
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary-light transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Live →
                    </a>
                  )}
                  {project.links.github && (
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Code →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={projects.find(p => p.id === selectedProject)!}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}