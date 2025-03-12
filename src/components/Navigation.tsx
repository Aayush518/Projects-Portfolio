import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { FiMenu, FiX } from 'react-icons/fi'; 
import { useThrottledValue } from '../hooks/useThrottledValue';
import NavigationBackground from './NavigationBackground';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottledValue(scrollY, 100);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const menuItems = [
    { id: 'home', label: 'Home' },
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
      }, { threshold: 0.1, rootMargin: "-80px 0px -80px 0px" });

      menuItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    };

    // Move indicator to active link
    if (isDesktop && indicatorRef.current) {
      const activeIndex = menuItems.findIndex(item => item.id === activeSection);
      const activeNavItem = navItemsRef.current[activeIndex];
      
      if (activeNavItem) {
        const left = activeNavItem.offsetLeft;
        const width = activeNavItem.offsetWidth;
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.left = `${left}px`;
        indicatorRef.current.style.opacity = '1';
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isDesktop]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 backdrop-blur-lg bg-dark-200/85 shadow-lg shadow-black/20 border-b border-white/5' : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavigationBackground isScrolled={isScrolled} />
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="relative group"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text group-hover:bg-gradient-to-l transition-all duration-500">
              Aayush
              <span className="text-primary">518</span>
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-light group-hover:w-full"
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <div className="hidden md:block">
            <div className="flex items-center gap-8 relative">
              {/* Active indicator line */}
              <motion.div
                ref={indicatorRef}
                className="absolute -bottom-1.5 h-0.5 bg-gradient-to-r from-primary to-primary-light rounded-full opacity-0 transition-all duration-300"
              />
              
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  ref={(el) => navItemsRef.current[index] = el}
                  className={`relative group text-sm font-medium py-1.5 px-1 transition-colors ${
                    activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white/90'
                  }`}
                  variants={menuItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${
                    activeSection === item.id ? 'bg-transparent' : 'bg-white/30'
                  }`} />
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className="relative group overflow-hidden px-6 py-2 rounded-lg text-white font-medium text-sm shadow-lg"
                variants={menuItemVariants}
                initial="initial"
                animate="animate"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                <span className="relative z-10">Get in Touch</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light"
                  initial={{}}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)"
                  }}
                />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 hover:bg-white/5 rounded-lg"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-end gap-1.5">
              <motion.span 
                className={`block h-0.5 bg-white/90 transition-all duration-300 ${isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} 
              />
              <motion.span 
                className={`block h-0.5 bg-white/90 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 w-6' : 'w-4'}`} 
              />
              <motion.span 
                className={`block h-0.5 bg-white/90 transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} 
              />
            </div>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-lg border-t border-white/5 shadow-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="container px-6 py-6 flex flex-col gap-4">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`text-lg font-medium py-2 px-4 rounded-lg transition-all duration-200 ${
                        activeSection === item.id 
                          ? 'bg-primary/10 text-white pl-6' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.span 
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full"
                          layoutId="mobileActiveIndicator"
                        />
                      )}
                    </motion.a>
                  ))}
                  <motion.a
                    href="#contact"
                    className="mt-2 btn-primary text-center py-3 rounded-lg flex items-center justify-center gap-2 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: menuItems.length * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                  >
                    Get in Touch
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}