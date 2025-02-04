import { Project } from '../../types/project';

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="relative">
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={project.image || project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-dark-200/50 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary border border-primary/20">
                {project.category || 'Project'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
              {project.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
} 