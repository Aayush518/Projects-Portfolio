export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category?: string;
  technologies?: string[];
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  details?: {
    challenge?: string;
    solution?: string;
    impact?: string;
    timeline?: string;
    role?: string;
    showDetails?: boolean;
  };
  images?: string[];
  featured?: boolean;
  demo?: string; // For backward compatibility
  githubUrl?: string; // For backward compatibility
  liveUrl?: string; // For backward compatibility
  image?: string; // For backward compatibility
}