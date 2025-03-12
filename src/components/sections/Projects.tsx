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
import FeaturedProject from '../ui/FeaturedProject';

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
  'Featured'          // Featured projects
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
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    // Reset to page 1 when category changes
    setCurrentPage(1);
    
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Simplified filtering logic for projects only
  const getFilteredProjects = () => {
    if (activeCategory === 'Featured') {
      return projects.filter(project => project.featured);
    }
    
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
  
  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  // Get featured projects (top 2)
  const featuredProjects = projects
    .filter(project => project.featured)
    .slice(0, 2);

  // Modify the paginate function to ensure proper scrolling
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    setCurrentPage(pageNumber);
    
    // Use setTimeout to ensure the state has updated before scrolling
    setTimeout(() => {
      // Scroll to the top of the projects section instead of just the grid
      const projectsSection = document.querySelector('.projects-section-container');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Get next and previous projects for modal navigation
  const getAdjacentProjects = (currentId: string) => {
    const currentIndex = filteredProjects.findIndex(p => p.id === currentId);
    const prevProject = currentIndex > 0 ? filteredProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < filteredProjects.length - 1 ? filteredProjects[currentIndex + 1] : null;
    
    return { prevProject, nextProject };
  };

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-dark to-dark-100 py-32">
      {/* Reduce background effects on mobile */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] sm:opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent 
                      hidden sm:block" /> {/* Hide radial gradient on mobile */}

      <div className="container-custom relative projects-section-container">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16 px-4">
          <motion.h2 
            className="heading-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b111e] to-[#ff1616]">
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

        {/* Featured Projects Section - Only on first page and when not filtered */}
        {activeCategory === 'All' && currentPage === 1 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-gradient-to-r from-[#9b111e] to-[#ff1616] rounded-full"></span>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <FeaturedProject 
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project.id)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Filter - Make it horizontally scrollable on mobile */}
        <div className="overflow-x-auto scrollbar-none -mx-6 px-6 mb-12">
          <div className="flex flex-nowrap justify-center gap-4 min-w-min">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all
                           ${activeCategory === category 
                             ? 'bg-gradient-to-r from-[#9b111e] to-[#ff1616] text-white shadow-lg shadow-primary/20' 
                             : 'bg-dark-200/50 text-white/60 hover:bg-dark-200 hover:text-white/80'}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 projects-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              key={`projects-grid-${activeCategory}-${currentPage}`} // Add key to force re-render on page change
            >
              {currentProjects.length > 0 ? (
                currentProjects.map((project, index) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project.id)}
                      index={index}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-white/60 text-lg">No projects found in this category.</p>
                  <button 
                    className="mt-4 px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                    onClick={() => setActiveCategory('All')}
                  >
                    View all projects
                  </button>
                </div>
              )}
            </motion.div>

            {/* Pagination - Improved styling and accessibility */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="p-2 rounded-lg bg-dark-200/50 text-white/60 hover:bg-dark-200 hover:text-white/80 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    aria-label={`Page ${index + 1}`}
                    aria-current={currentPage === index + 1 ? "page" : undefined}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all
                               ${currentPage === index + 1
                                 ? 'bg-gradient-to-r from-[#9b111e] to-[#ff1616] text-white shadow-lg shadow-primary/20' 
                                 : 'bg-dark-200/50 text-white/60 hover:bg-dark-200 hover:text-white/80'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="p-2 rounded-lg bg-dark-200/50 text-white/60 hover:bg-dark-200 hover:text-white/80 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={projects.find(p => p.id === selectedProject)!}
            onClose={() => setSelectedProject(null)}
            isGitHub={false}
            onPrevious={() => {
              const { prevProject } = getAdjacentProjects(selectedProject);
              if (prevProject) setSelectedProject(prevProject.id);
            }}
            onNext={() => {
              const { nextProject } = getAdjacentProjects(selectedProject);
              if (nextProject) setSelectedProject(nextProject.id);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}