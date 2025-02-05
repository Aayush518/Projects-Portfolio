import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function NavIndicator() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach(
      section => observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {['home', 'about', 'projects', 'writings', 'contact'].map(section => (
        <a
          key={section}
          href={`#${section}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 relative group
                     ${activeSection === section ? 'bg-primary' : 'bg-white/20'}`}
        >
          <span className="absolute right-full mr-4 py-1 px-2 rounded-md bg-dark-200/80 backdrop-blur-sm
                          text-white/70 text-sm capitalize opacity-0 group-hover:opacity-100 transition-opacity">
            {section}
          </span>
        </a>
      ))}
    </motion.div>
  );
} 