import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { writings } from '../../data/writings';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import PDFViewer from '../ui/PDFViewer';
import { fetchGitHubProjects } from '../../utils/github';
import PDFThumbnail from '../ui/PDFThumbnail';
import TiltCard from '../ui/TiltCard';
import LoadingSpinner from '../ui/LoadingSpinner';

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Reduce background effects on mobile */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] sm:opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent 
                      hidden sm:block" /> {/* Hide radial gradient on mobile */}

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16 px-4">
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
        </div>

        {/* Category Filter - Make it horizontally scrollable on mobile */}
        <div className="overflow-x-auto scrollbar-none -mx-6 px-6 mb-8">
          <div className="flex flex-nowrap gap-2 min-w-min">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors
                           ${activeCategory === category 
                             ? 'bg-primary text-white' 
                             : 'bg-dark-200/50 text-white/60'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {getFilteredProjects().map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project.id)}
              index={index}
            />
          ))}
        </div>
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