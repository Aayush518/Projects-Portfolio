import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import DynamicBackground from '../DynamicBackground';
import TechStackBadges from '../TechStackBadges';
import { useParallax } from '../../hooks/useParallax';

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { x, y } = useParallax(0.1);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const buttonVariants = {
    hover: { y: -4, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    initial: { scale: 1, y: 0 }
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-center">
      {/* Enhanced Background Elements */}
      <DynamicBackground />
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ 
          x: isMobile ? 0 : x, 
          y: isMobile ? 0 : y,
          scale 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-200/50 via-dark-200/30 to-dark-200/50" />
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </motion.div>

      <motion.div 
        style={{ opacity }} 
        className="relative z-10"
        layoutId="hero-content"
        layout
      >
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 sm:space-y-10"
            >
              {/* Status Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-200/50 backdrop-blur-sm border border-white/5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400/90 text-sm">Available for Projects</span>
              </motion.div>

              {/* Title and Description */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text block"
                  >
                    Frontend Developer
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/90"
                  >
                    & Project Manager
                  </motion.span>
                </h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
                >
                  Passionate about creating beautiful, responsive user interfaces and leading 
                  project teams to successfully deliver high-quality products. 
                  Combining technical expertise with project management skills to drive results.
                </motion.p>
              </div>

              {/* Enhanced Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-row justify-center items-center gap-4 sm:gap-6 px-4 sm:px-0"
              >
                <motion.a
                  href="#contact"
                  className="btn-primary flex-1 sm:flex-initial inline-flex items-center justify-center
                           py-3.5 px-6 sm:px-10 text-sm sm:text-base font-medium rounded-lg sm:min-w-[180px]
                           shadow-lg shadow-primary/20 backdrop-blur-sm"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={isMobile ? undefined : "hover"}
                  whileTap="tap"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Get in Touch
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  </span>
                </motion.a>

                <motion.a
                  href="#projects"
                  className="btn-outline flex-1 sm:flex-initial group inline-flex items-center justify-center
                           py-3.5 px-6 sm:px-10 text-sm sm:text-base font-medium rounded-lg sm:min-w-[180px]
                           shadow-lg shadow-white/5 backdrop-blur-sm"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={isMobile ? undefined : "hover"}
                  whileTap="tap"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    View Work
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Tech Stack Badges */}
          <TechStackBadges />
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{ opacity }}
        >
          <span className="text-white/50 text-sm font-mono">Scroll to Explore</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1.5 h-2.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      )}

      {/* Add mobile-specific animations */}
      {isMobile && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t 
                     from-dark-200 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
      )}
    </section>
  );
}