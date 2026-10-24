import { links } from '../../content/links'
import { projects } from '../../content/projects'
import { useReveal } from '../../hooks/useReveal'

// Smaller things the studio made along the way: one line each, linking out.
const workshop = [
  { name: 'Tether', href: links.tether, kind: 'Chrome extension' },
  { name: 'Jotfield', href: links.jotfield, kind: 'Web app' },
  { name: 'Doorsong', href: links.doorsong, kind: 'Web' },
]

export function Workshop() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="workshop"
      ref={ref}
      aria-labelledby="workshop-title"
      className="relative mx-auto max-w-3xl px-[var(--space-3)] py-[var(--space-7)]"
    >
      <h2 id="workshop-title" data-reveal className="eyebrow mb-[var(--space-2)]">
        From the workshop
      </h2>
      <p data-reveal className="mb-[var(--space-4)]" style={{ color: 'var(--ink-dim)', fontSize: 'var(--text-body)' }}>
        Smaller things we made along the way. Some are tools we use every day, some are experiments.
      </p>
      <ul className="flex flex-col" style={{ borderTop: '1px solid var(--line)' }}>
        {workshop.map((item) => {
          const project = projects.find((p) => p.name === item.name)
          return (
            <li key={item.name} data-reveal style={{ borderBottom: '1px solid var(--line)' }}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="workshop-row flex flex-wrap items-baseline justify-between gap-x-[var(--space-3)] gap-y-1 py-[var(--space-3)]"
              >
                <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-[var(--space-2)]">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--ink)' }}>
                    {item.name}
                  </span>
                  <span style={{ color: 'var(--ink-dim)' }}>{project?.tagline}</span>
                </span>
                <span className="font-mono" style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}>
                  {item.kind} ↗
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
