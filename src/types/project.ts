export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
  details: {
    challenge: string;
    solution: string;
    impact: string;
  };
  images?: string[];
  featured: boolean;
}