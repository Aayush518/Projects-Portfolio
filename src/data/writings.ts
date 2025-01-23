export interface Writing {
  id: string;
  title: string;
  description: string;
  pdfUrl?: string;
  blogContent?: string;
  date: string;
  category: string;
  tags: string[];
  author?: string;
  readingTime?: string;
  coverImage?: string;
  type: 'pdf' | 'blog';
}

export const writings: Writing[] = [
  {
    id: 'the-labyrinth-of-dreams',
    title: 'The Labyrinth of Dreams',
    description: 'This story is a psychological drama with elements of magical realism, exploring themes of reality, dreams, trauma, and identity.',
    pdfUrl: '/images/pdfs/The_Labyrinth_of_dreams.pdf',
    date: '2024-01-15',
    category: 'Story',
    tags: ['psychology', 'dreams', 'fiction'],
    author: 'Aayush518',
    readingTime: '15 min',
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    type: 'pdf'
  },
  {
    id: 'web-development-basics',
    title: 'Getting Started with Web Development',
    description: 'A comprehensive guide to beginning your journey in web development.',
    blogContent: 'Full blog content here...',
    date: '2024-01-20',
    category: 'Development',
    tags: ['web development', 'programming', 'beginners'],
    author: 'Aayush518',
    readingTime: '10 min',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    type: 'blog'
  }
];