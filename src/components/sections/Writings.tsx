import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { writings } from '../../data/writings';
import PDFViewer from '../ui/PDFViewer';

// Categories for writings
const categories = [
  'All',
  'Technical',
  'Research',
  'Stories',
  'Thoughts'
] as const;

const WritingCard = ({ writing }: { writing: Writing }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-dark-200/50 rounded-xl overflow-hidden backdrop-blur-sm border border-accent/10 hover:border-accent/20 transition-colors">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-300 to-dark-200 p-6 flex flex-col justify-center items-center">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl transform group-hover:translate-x-2 transition-transform duration-700" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl transform group-hover:-translate-x-2 transition-transform duration-700" />
          <div className="mb-6">
            <span className="px-3 py-1 rounded-full text-xs bg-white/5 backdrop-blur-sm border border-white/10">
              {writing.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-center mb-4 px-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b111e] via-[#ff1616] to-[#ff1616]">
              {writing.title}
            </span>
          </h3>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{writing.readingTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{writing.date}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">{writing.title}</h3>
        <p className="text-white/70">{writing.description}</p>
        
        {writing.audioUrl && (
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 
                       rounded-lg transition-all duration-300 group"
            >
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                {isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </span>
              <span className="text-white font-medium">
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
              </span>
            </button>
            <audio 
              ref={audioRef}
              src={writing.audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {writing.tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-dark-300/50 text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Writings() {
  const [selectedWriting, setSelectedWriting] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');

  const filteredWritings = activeCategory === 'All' 
    ? writings
    : writings.filter(w => w.category === activeCategory);

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-dark-100 to-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="heading-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b111e] to-[#ff1616]">
              Writings
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-white/60 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Exploring ideas through words - from technical insights to personal reflections.
          </motion.p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#9b111e] to-[#ff1616] text-white shadow-lg shadow-[#ff1616]/20'
                    : 'bg-dark-200/50 text-white/60 hover:bg-dark-200 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Writings Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredWritings.map((writing, index) => (
            <motion.div
              key={writing.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="card group cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedWriting(writing.id)}
              >
                <WritingCard writing={writing} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Writing Modal */}
      <AnimatePresence>
        {selectedWriting && (
          <PDFViewer
            writing={writings.find(w => w.id === selectedWriting)!}
            onClose={() => setSelectedWriting(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}