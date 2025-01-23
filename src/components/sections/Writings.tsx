import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { writings } from '../../data/writings';
import PDFViewer from '../ui/PDFViewer';
import { FiClock, FiCalendar, FiFileText, FiBook, FiTag } from 'react-icons/fi';

export default function Writings() {
  const [selectedWriting, setSelectedWriting] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const categories = Array.from(new Set(writings.map(w => w.category)));
  const filteredWritings = selectedCategory
    ? writings.filter(w => w.category === selectedCategory)
    : writings;

  const currentWriting = writings.find(w => w.id === selectedWriting);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, [selectedCategory]);

  const handleWritingClick = (writing: typeof writings[0]) => {
    if (writing.type === 'pdf' && writing.pdfUrl) {
      setSelectedWriting(writing.id);
    } else {
      window.location.href = `/blog/${writing.id}`;
    }
  };

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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredWritings.map((writing) => (
                <motion.article
                  key={writing.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group"
                  onHoverStart={() => setHoveredPost(writing.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                  onClick={() => handleWritingClick(writing)}
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                    <motion.img
                      src={writing.coverImage}
                      alt={writing.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: hoveredPost === writing.id ? 1.1 : 1,
                        filter: hoveredPost === writing.id ? 'brightness(0.7)' : 'brightness(1)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                      animate={{
                        opacity: hoveredPost === writing.id ? 0.8 : 0.6
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2">
                        {writing.type === 'pdf' ? (
                          <>
                            <FiFileText className="w-4 h-4" />
                            PDF
                          </>
                        ) : (
                          <>
                            <FiBook className="w-4 h-4" />
                            Blog
                          </>
                        )}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm">
                        <FiTag className="w-4 h-4" />
                        {writing.category}
                      </span>
                      </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                      {writing.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2">
                      {writing.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        {writing.date}
                      </span>
                      {writing.readingTime && (
                        <span className="flex items-center gap-2">
                          <FiClock className="w-4 h-4" />
                          {writing.readingTime}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedWriting && currentWriting?.type === 'pdf' && currentWriting.pdfUrl && (
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