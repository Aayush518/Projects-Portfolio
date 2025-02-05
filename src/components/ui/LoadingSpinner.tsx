import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="relative w-12 h-12 sm:w-16 sm:h-16"
      variants={containerVariants}
      animate="animate"
    >
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 sm:w-3 sm:h-3"
          style={{
            left: "50%",
            top: "50%",
            transform: `rotate(${i * 60}deg) translate(0, -150%)`,
            transformOrigin: "50% 50%"
          }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-light"
            variants={dotVariants}
            animate="animate"
            style={{
              animationDelay: `${i * 0.2}s`
            }}
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
} 