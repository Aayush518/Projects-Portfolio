import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { FiMenu, FiX, FiHome, FiBook, FiMail, FiGrid } from 'react-icons/fi';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const menuItems = [
    { id: 'home', label: 'Home', path: '/', icon: FiHome },
    { id: 'projects', label: 'Projects', path: '/#projects', icon: FiGrid },
    { id: 'blog', label: 'Blog', path: '/blog', icon: FiBook },
    { id: 'contact', label: 'Contact', path: '/#contact', icon: FiMail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = menuItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (item: typeof menuItems[0]) => {
    setIsMobileMenuOpen(false);
    
    if (item.path.startsWith('/#')) {
      const element = document.getElementById(item.id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      window.location.href = item.path;
    }
    setActiveSection(item.id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl shadow-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <motion.a
              href="/"
              className="text-2xl font-bold relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-accent via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Aayush518
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-purple-500 to-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    className={`relative px-4 py-2 rounded-lg group flex items-center gap-2 ${
                      activeSection === item.id 
                        ? 'text-white bg-accent/20' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                        activeSection === item.id ? 'opacity-20' : ''
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiX className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiMenu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden pt-20 bg-black/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigation(item)}
                      className={`p-4 rounded-lg text-left flex items-center gap-3 ${
                        activeSection === item.id
                          ? 'bg-accent text-white'
                          : 'hover:bg-white/10'
                      }`}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}