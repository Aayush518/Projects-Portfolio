import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-dark-200/50 border-t border-white/5">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">Portfolio</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Building innovative solutions through code, from speech technology to web applications.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {['About', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">Connect</h3>
            <div className="flex gap-4">
              {/* Add your social media links here */}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 