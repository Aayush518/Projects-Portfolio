import { motion } from 'framer-motion';

const technologies = [
  'React', 'TypeScript', 'Node.js', 'Python', 'TensorFlow',
  'NLP', 'Speech Recognition', 'AWS', 'Docker', 'GraphQL'
];

export default function TechStackBadges() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="absolute inset-x-0 bottom-32 sm:bottom-40 overflow-hidden pointer-events-none"
    >
      <div className="flex justify-center flex-wrap gap-3 max-w-4xl mx-auto px-4">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="px-4 py-2 rounded-full bg-dark-200/50 backdrop-blur-sm border border-white/5
                     shadow-lg shadow-black/5"
          >
            <span className="text-white/70 text-sm whitespace-nowrap">{tech}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 