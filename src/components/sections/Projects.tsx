import { projects } from '../../content/projects'
import { useReveal } from '../../hooks/useReveal'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="work" ref={ref} className="mx-auto max-w-4xl px-[var(--space-3)] py-[var(--space-7)]">
      <p data-reveal className="eyebrow mb-[var(--space-4)]">
        Shipped
      </p>
      <div className="grid gap-[var(--space-4)] sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
