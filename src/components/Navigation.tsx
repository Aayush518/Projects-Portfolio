import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { FiMenu, FiX } from 'react-icons/fi'; // Import Icons
import { useThrottledValue } from '../hooks/useThrottledValue';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottledValue(scrollY, 100);

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'writings', label: 'Writings' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 50);
      
      // Update active section with Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, { threshold: 0.1 });

      menuItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 60; // Adjusted offset for the slightly taller nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const logoVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const menuItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -2, transition: { duration: 0.2 } }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-dark-200/80 backdrop-blur-md shadow-lg' : 'bg-transparent' // Added shadow on scroll
    }`}>
      {/* Portfolio Under Construction Banner Integrated */}
      {/* Reduced vertical padding py-1 */}
      <div className="py-1 bg-gradient-to-r from-[#9b111e]/20 via-[#ff1616]/20 to-[#9b111e]/20 border-b border-[#ff1616]/10">
        <div className="container mx-auto px-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></div>
            <span className="text-[#FBBF24]">Portfolio Under Construction</span>
          </div>
          <span className="hidden sm:inline text-white/50">•</span>
          <span className="hidden sm:inline text-white/70">Updates coming soon!</span>
        </div>
      </div>

      <motion.nav
        className={`transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3' // Increased padding when not scrolled (py-3), keep py-2 for scrolled
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              className="relative group"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              onClick={() => scrollToSection('home')} // Ensure smooth scroll for logo click
            >
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
                Aayush
                <span className="text-primary">518</span>
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-light group-hover:w-full"
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative group text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                  variants={menuItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary ${
                      activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="btn-primary px-6 py-2 rounded-lg text-sm font-medium"
                variants={menuItemVariants}
                initial="initial"
                animate="animate"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: menuItems.length * 0.1 }}
              >
                Get in Touch
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 hover:bg-white/5 rounded-lg text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-dark-200/95 backdrop-blur-lg border-t border-white/10 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smoother spring animation
            >
              <div className="container px-6 py-4 flex flex-col gap-4">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`py-2 text-lg ${ // Larger text for mobile
                      activeSection === item.id ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                    }`}
                    whileHover={{ x: 5 }} // Subtle hover effect
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  className="btn-primary text-center py-3 rounded-lg mt-4 text-lg" // Larger text and margin
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}