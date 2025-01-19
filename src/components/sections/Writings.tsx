import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { writings } from '../../data/writings';
import PDFViewer from '../ui/PDFViewer';

export default function Writings() {
  const [selectedWriting, setSelectedWriting] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(writings.map(w => w.category)));
  const filteredWritings = selectedCategory
    ? writings.filter(w => w.category === selectedCategory)
    : writings;

  const currentWriting = writings.find(w => w.id === selectedWriting);

  return (
    <section id="writings" className="py-32 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 gradient-text">
            Technical Writings
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my thoughts, research, and insights on technology and development.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-colors ${
              !selectedCategory ? 'bg-accent text-white' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            All
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category ? 'bg-accent text-white' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWritings.map((writing) => (
              <motion.div
                key={writing.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedWriting(writing.id)}
              >
                <div className="relative aspect-video">
                  <img
                    src={writing.coverImage}
                    alt={writing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                      {writing.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {writing.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {writing.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{writing.date}</span>
                    <span>{writing.readingTime} read</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedWriting && currentWriting && (
            <PDFViewer
              writing={currentWriting}
              onClose={() => setSelectedWriting(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}