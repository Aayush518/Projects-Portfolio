import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectViewer from './ProjectViewer';
import { projects } from '../data/projects';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    // Import GSAP dynamically to avoid SSR issues
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Stagger project cards animation
      const cards = document.querySelectorAll('.project-card');
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none reverse'
        }
      });

      // Parallax effect on project images
      cards.forEach((card) => {
        const image = card.querySelector('img');
        if (image) {
          gsap.to(image, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      });
    };

    initGSAP();
  }, []);

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <section className="py-32 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project} 
              onClick={() => setSelectedProject(project.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {currentProject && (
          <ProjectViewer 
            project={currentProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}