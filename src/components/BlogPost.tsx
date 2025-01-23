import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { writings } from '../data/writings';
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';

interface BlogPostProps {
  id: string;
}

export default function BlogPost({ id }: BlogPostProps) {
  const [post, setPost] = useState<typeof writings[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the blog post from writings data
    const foundPost = writings.find(w => w.id === id && w.type === 'blog');
    setPost(foundPost || null);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <a 
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </a>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-400">The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32">
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
            src={post.coverImage}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />

          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
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
              <span className="flex items-center gap-2 text-accent">
                <FiTag className="w-4 h-4" />
                {post.category}
              </span>
            </div>

            <div className="text-gray-300 leading-relaxed">
              {post.blogContent}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  );
}