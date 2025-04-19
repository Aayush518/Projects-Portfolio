import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { debounce, throttle } from '../../utils/debounce';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentProject, setCurrentProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGitHub, setIsGitHub] = useState(false);
  
  // Extract unique categories from projects
  const categories = ['All', ...new Set(projects.flatMap(project => {
    const categories = project.category?.split(',').map(c => c.trim()) || [];
    return categories;
  }))].filter(Boolean);

  // Improved filtering logic
  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'All') return project.featured;
    
    const projectCategories = project.category?.split(',').map(c => c.trim()) || [];
    return projectCategories.includes(selectedCategory);
  });

  const projectsContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll-based animations with debouncing
  const handleScroll = useCallback(
    debounce(() => {
      if (!projectsContainerRef.current) return;
      
      const cards = projectsContainerRef.current.querySelectorAll('.project-card');
      
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 100;
        
        if (isVisible) {
          card.classList.add('project-card-enter-active');
        }
      });
    }, 50),
    []
  );
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check to reveal visible projects
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Modal opening function with improved logging and explicit onClick handling
  const openProjectModal = (project, isGitHub = false) => {
    console.log("Opening modal for project:", project.title);
    // Ensure body has overflow hidden to prevent background scrolling
    document.body.style.overflow = 'hidden';
    setCurrentProject(project);
    setIsGitHub(isGitHub);
    setIsModalOpen(true);
  };
  
  // Close modal with improved cleanup
  const closeProjectModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    document.body.style.overflow = '';
    // Don't reset currentProject immediately to allow animations to complete
    setTimeout(() => {
      if (!isModalOpen) {
        setCurrentProject(null);
      }
    }, 300);
  };
  
  // Navigate between projects with throttling to prevent rapid clicks
  const handlePrevious = throttle(() => {
    if (!currentProject) return;
    
    const currentIndex = filteredProjects.findIndex(p => p.id === currentProject.id);
    const previousIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setCurrentProject(filteredProjects[previousIndex]);
  }, 300);
  
  const handleNext = throttle(() => {
    if (!currentProject) return;
    
    const currentIndex = filteredProjects.findIndex(p => p.id === currentProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setCurrentProject(filteredProjects[nextIndex]);
  }, 300);
  
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dark-100"></div>
      <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#9b111e] to-[#ff1616]"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto"
            >
              A showcase of my technical skills and creative projects
            </motion.p>
          </div>
          
          {/* Updated Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4 mb-12 px-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 font-medium'
                    : 'bg-dark-200/50 text-white/70 hover:bg-dark-200/80 hover:text-white/90'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          {/* Projects Grid with Empty State */}
          <div 
            ref={projectsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="project-card project-card-enter"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onView={() => {
                      console.log("Project card clicked:", project.title);
                      openProjectModal(project);
                    }}
                    onGitHub={(e) => {
                      if (project.links?.github) {
                        console.log("GitHub button clicked for:", project.title);
                        // Prevent default and stop propagation
                        e?.preventDefault();
                        e?.stopPropagation();
                        // Open in new tab directly for GitHub
                        window.open(project.links.github, '_blank', 'noopener,noreferrer');
                        // Or use the modal if you prefer
                        // openProjectModal(project, true);
                      }
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white/70">No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      {isModalOpen && (
        <ProjectModal 
          project={currentProject}
          isGitHub={isGitHub}
          onClose={closeProjectModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isOpen={isModalOpen}
        />
      )}
    </section>
  );
}