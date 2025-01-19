export interface Writing {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  date: string;
  category: string;
  tags: string[];
  author?: string;
  readingTime?: string;
  coverImage?: string;
}

export const writings: Writing[] = [
  {
    id: 'The Labrynth of dreams',
    title: 'The Labrynth of dreams',
    description: 'This story is a psychological drama with elements of magical realism, exploring themes of reality, dreams, trauma, and identity.',
    pdfUrl: '/images/pdfs/The_Labrynth_of_dreams.pdf', // Replace with actual PDF URL
    date: '2024-01-15',
    category: 'Story',
    tags: ['psychology', 'dreams', 'fiction'],
    author: 'Aayush518',
    readingTime: '15 min',
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c'
  }
];