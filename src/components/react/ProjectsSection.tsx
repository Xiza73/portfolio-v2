import { AnimatedSection } from '@/components/react/AnimatedSection';
import { getProjects } from '@/data/projects';
import { useTranslation } from '@/hooks/useTranslation';
import { type Project } from '@/types/project';

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block border-2 border-primary bg-bg-subtle px-2 py-1 pixel-text text-[8px] text-primary sm:px-3 sm:text-[10px] md:text-xs">
      {label}
    </span>
  );
}

function ProjectCard({ project, demoLabel = 'DEMO' }: { project: Project; demoLabel?: string }) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden border-4 border-primary bg-bg-surface p-4 transition-colors hover:border-accent sm:p-5 md:p-6 pixel-corner group">
      <h3 className="pixel-text mb-2 text-xs text-primary transition-colors group-hover:text-accent wrap-break-word sm:mb-3 sm:text-sm md:text-base">
        {project.title}
      </h3>

      <p className="pixel-text mb-3 text-[9px] leading-relaxed text-text wrap-break-word sm:mb-4 sm:text-[10px] md:text-xs">
        {project.description}
      </p>

      <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 sm:gap-4">
        {project.github.map((repo) => (
          <a
            key={repo.url}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 pixel-text text-[9px] text-primary transition-colors hover:text-accent sm:gap-2 sm:text-[10px] md:text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
            </svg>
            {repo.label}
          </a>
        ))}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 pixel-text text-[9px] text-primary transition-colors hover:text-accent sm:gap-2 sm:text-[10px] md:text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {demoLabel}
          </a>
        )}
      </div>
    </article>
  );
}

function SectionHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <div className="mb-3 inline-block bg-primary px-3 py-1.5 pixel-corner sm:mb-4 sm:px-4 sm:py-2">
        <span className="pixel-text text-[10px] text-text-dark sm:text-xs md:text-sm">{tag}</span>
      </div>
      <h2 className="pixel-text text-sm text-primary sm:text-xl md:text-2xl lg:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function ProjectsSection() {
  const { t, lang } = useTranslation();
  const projects = getProjects(lang);

  return (
    <section id="projects" className="py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <SectionHeading tag={t.projects.tag} title={t.projects.title} />
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.1} className="h-full min-w-0">
              <ProjectCard project={project} demoLabel={t.projects.demo} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ProjectsSection };
