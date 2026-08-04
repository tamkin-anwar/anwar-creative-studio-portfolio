import { projects } from '../../content/projects'
import { useReveal } from '../../hooks/useReveal'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="work"
      ref={ref}
      className="relative mx-auto max-w-4xl px-[var(--space-3)] py-[var(--space-7)]"
    >
      <div
        aria-hidden
        className="ambient-glow"
        style={{
          top: '10%',
          right: '-10%',
          width: '30vw',
          height: '30vw',
          maxWidth: 420,
          maxHeight: 420,
          background: 'radial-gradient(circle, rgba(217,161,92,0.14), transparent 70%)',
        }}
      />

      <p data-reveal className="eyebrow relative z-10 mb-[var(--space-4)]">
        Shipped
      </p>
      <div className="relative z-10 grid gap-[var(--space-4)] sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
