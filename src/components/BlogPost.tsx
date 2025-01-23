import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BlogPostProps {
  id: string;
}

export default function BlogPost({ id }: BlogPostProps) {
  // In a real app, fetch the blog post data based on the ID
  const post = {
    title: 'Getting Started with Web Development',
    date: 'March 15, 2024',
    category: 'Development',
    content: 'This is the full blog post content...',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <a 
          href="/blog"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </a>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />

          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-400 mb-8">
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="text-accent">{post.category}</span>
            </div>

            <div className="text-gray-300 leading-relaxed">
              {post.content}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}