export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  thumbnail: string;
  technologies?: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
} 