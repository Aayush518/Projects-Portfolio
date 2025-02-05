import { motion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const buttonVariants = {
    hover: { y: -4, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    initial: { scale: 1, y: 0 }
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-200/50 via-transparent to-dark-200/50" />
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 sm:space-y-10"
          >
            {/* Title and Description */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight sm:leading-tight">
                <span className="bg-gradient-to-r from-[#9b111e] to-[#ff1616] text-transparent bg-clip-text">
                  Full Stack Developer
                </span>
                <br />& Project Lead
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4 sm:px-0">
                Crafting innovative solutions through code, from speech technology to web applications.
              </p>
            </div>

            {/* Buttons - Single Row for Both Mobile and Desktop */}
            <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 px-4 sm:px-0">
              <motion.a
                href="#contact"
                className="btn-primary flex-1 sm:flex-initial inline-flex items-center justify-center
                         py-3 px-6 sm:px-10 text-sm sm:text-base font-medium rounded-lg sm:min-w-[180px]
                         shadow-lg shadow-primary/20"
                variants={buttonVariants}
                initial="initial"
                whileHover={isMobile ? undefined : "hover"}
                whileTap="tap"
              >
                <span className="relative z-10">Get in Touch</span>
              </motion.a>

              <motion.a
                href="#projects"
                className="btn-outline flex-1 sm:flex-initial group inline-flex items-center justify-center
                         py-3 px-6 sm:px-10 text-sm sm:text-base font-medium rounded-lg sm:min-w-[180px]
                         shadow-lg shadow-white/5"
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Only on Desktop */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1.5 h-2.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
} 