import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { writings } from '../../data/writings';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import PDFViewer from '../ui/PDFViewer';
import { fetchGitHubProjects } from '../../utils/github';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedWriting, setSelectedWriting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'featured' | 'github' | 'writings'>('featured');
  const [githubProjects, setGithubProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'github') {
      setIsLoading(true);
      fetchGitHubProjects('Aayush518')
        .then(projects => {
          setGithubProjects(projects);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching GitHub projects:', error);
          setIsLoading(false);
        });
    }
  }, [activeTab]);

  const currentProject = activeTab === 'github' 
    ? githubProjects.find(p => p.id === selectedProject)
    : projects.find(p => p.id === selectedProject);
  const currentWriting = writings.find(w => w.id === selectedWriting);

  const displayedProjects = activeTab === 'github' ? githubProjects : projects;

  return (
    <section id="projects" className="min-h-screen py-32 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 gradient-text">
            My Work
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my projects, open-source contributions, and technical writings.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            {['featured', 'github', 'writings'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as typeof activeTab);
                  setSelectedProject(null);
                }}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === tab
                    ? 'bg-accent text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : activeTab === 'writings' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {writings.map((writing) => (
                <motion.div
                  key={writing.id}
                  layoutId={`writing-${writing.id}`}
                  onClick={() => setSelectedWriting(writing.id)}
                  className="bg-white/5 rounded-lg p-6 cursor-pointer hover:bg-white/10 transition-all hover:-translate-y-2"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{writing.title}</h3>
                  <p className="text-gray-400 mb-4">{writing.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-accent">{writing.category}</span>
                    <span className="text-sm text-gray-500">{writing.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project.id)}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProject && currentProject && (
            <ProjectModal
              project={currentProject}
              onClose={() => setSelectedProject(null)}
              isGitHub={activeTab === 'github'}
            />
          )}
          {selectedWriting && currentWriting && (
            <PDFViewer
              writing={currentWriting}
              onClose={() => setSelectedWriting(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}