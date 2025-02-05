import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'red', primary: '#9b111e', accent: '#ff1616' },
  { id: 'purple', primary: '#7928CA', accent: '#FF0080' },
  { id: 'blue', primary: '#0070F3', accent: '#00DFD8' },
  { id: 'green', primary: '#16A34A', accent: '#4ADE80' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  
  const changeTheme = (primary: string, accent: string) => {
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--primary-light', accent);
  };

  return (
    <motion.div className="fixed bottom-8 right-8 z-50">
      <motion.button
        className="w-12 h-12 rounded-full bg-dark-200/80 backdrop-blur-lg border border-white/10
                   flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 bg-dark-200/80 backdrop-blur-lg rounded-lg p-3
                     border border-white/10 flex flex-col gap-2"
          >
            {themes.map(theme => (
              <button
                key={theme.id}
                className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
                onClick={() => changeTheme(theme.primary, theme.accent)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 