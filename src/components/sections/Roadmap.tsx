import { roadmap } from '../../content/roadmap'
import { useReveal } from '../../hooks/useReveal'

export function Roadmap() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="roadmap" ref={ref} className="mx-auto max-w-3xl px-[var(--space-3)] py-[var(--space-7)]">
      <p data-reveal className="eyebrow mb-[var(--space-4)]">
        What&rsquo;s next
      </p>

      <ul className="flex flex-col" style={{ borderTop: '1px solid var(--line)' }}>
        {roadmap.map((entry) => (
          <li
            key={entry.name}
            data-reveal
            className="flex items-center justify-between gap-[var(--space-3)] py-[var(--space-3)]"
            style={{ borderBottom: '1px solid var(--line)' }}
          >
            <div className="flex flex-col gap-1">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading)' }}>
                {entry.name}
              </span>
              <span style={{ color: 'var(--ink-faint)', fontSize: 'var(--text-caption)' }}>
                {entry.blurb}
              </span>
            </div>
            <span
              className="font-mono uppercase tracking-[0.08em]"
              style={{ fontSize: 'var(--text-label)', color: 'var(--accent-cool)' }}
            >
              {entry.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
