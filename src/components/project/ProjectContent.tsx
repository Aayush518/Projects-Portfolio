import { Project } from '../../types/project';

interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="p-8 space-y-8 bg-dark-200/80 backdrop-blur-sm">
      {/* Technologies */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary/90 border border-primary/20
                         hover:bg-primary/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">About</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-white/70 leading-relaxed">{project.description}</p>
        </div>
      </div>

      {/* Features Section */}
      {project.features && (
        <div className="space-y-4">
          <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Key Features</h3>
          <ul className="grid gap-4">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-4 group">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-primary 
                                transition-colors flex-shrink-0" />
                <span className="text-white/70 group-hover:text-white/90 transition-colors">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider">Links</h3>
        <div className="flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent 
                       text-white rounded-lg transition-all duration-300 hover:-translate-y-1 
                       hover:shadow-lg hover:shadow-primary/20"
            >
              <span>View Live</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary 
                       text-primary hover:text-white rounded-lg transition-all duration-300 
                       relative overflow-hidden group"
            >
              <span className="relative z-10">View Code</span>
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <div className="absolute inset-0 bg-primary translate-y-[200%] group-hover:translate-y-0 
                            transition-transform duration-500" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 