import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiTag, FiArrowRight } from 'react-icons/fi';
import { writings } from '../data/writings';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const categories = Array.from(new Set(writings.map(post => post.category)));
  const filteredPosts = selectedCategory
    ? writings.filter(post => post.category === selectedCategory)
    : writings;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent via-purple-500 to-blue-500 text-transparent bg-clip-text">
              Latest Writings
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my thoughts on technology, development, and innovation
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-colors ${
              !selectedCategory 
                ? 'bg-accent text-white' 
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
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
                selectedCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              className="relative group"
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
            >
              <a href={`/blog/${post.id}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-4">
                  <motion.img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredPost === post.id ? 1.1 : 1,
                      filter: hoveredPost === post.id ? 'brightness(0.7)' : 'brightness(1)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60"
                    animate={{
                      opacity: hoveredPost === post.id ? 0.8 : 0.6
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredPost === post.id ? 1 : 0,
                      y: hoveredPost === post.id ? 0 : 20
                    }}
                  >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm">
                      <FiTag className="w-4 h-4" />
                      {post.category}
                    </span>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    {post.readingTime && (
                      <span className="flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        {post.readingTime}
                      </span>
                    )}
                  </div>
                  <motion.div
                    className="flex items-center gap-2 text-accent group-hover:gap-4 transition-all duration-300"
                    animate={{
                      x: hoveredPost === post.id ? 10 : 0
                    }}
                  >
                    Read More
                    <FiArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}