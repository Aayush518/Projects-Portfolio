import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-200/50 border-t border-white/5">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
              Aayush Adhikari
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Frontend Developer specializing in creating beautiful user interfaces and managing projects efficiently.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {['About', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/70 hover:text-primary transition-colors flex items-center gap-2"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com/aayush518" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-300/50 hover:bg-dark-300 transition-colors"
              >
                <FiGithub className="w-5 h-5 text-white/70 hover:text-primary" />
              </a>
              <a 
                href="https://linkedin.com/in/aayush518" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-300/50 hover:bg-dark-300 transition-colors"
              >
                <FiLinkedin className="w-5 h-5 text-white/70 hover:text-primary" />
              </a>
              <a 
                href="mailto:aayushadhikari518@gmail.com"
                className="p-2 rounded-lg bg-dark-300/50 hover:bg-dark-300 transition-colors"
              >
                <FiMail className="w-5 h-5 text-white/70 hover:text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-white/50">
          <p>© {currentYear} Aayush Adhikari. All rights reserved.</p>
          <p className="mt-2">Built with Astro, React, and Tailwind CSS</p>
          <p className="mt-1 text-[#FBBF24]">🚧 This portfolio is currently under development 🚧</p>
        </div>
      </div>
    </footer>
  );
}