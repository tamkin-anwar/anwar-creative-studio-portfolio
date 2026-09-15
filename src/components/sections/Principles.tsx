import { useReveal } from '../../hooks/useReveal'

const principles = [
  {
    statement: 'If it doesn’t land, it gets cut.',
    support: 'A hero animation and a rounded popup corner were both reverted the moment they made things worse.',
  },
  {
    statement: 'The corners nobody checks get checked anyway.',
    support:
      'A silent CSS cascade bug, fonts pulled from a third-party CDN, a 404 link that would’ve resolved wrong: fixed before anyone asked.',
  },
  {
    statement: 'Numbers, not adjectives.',
    support: '353 automated tests. Six instruments synthesized live. Every claim here is something you can check.',
  },
]

export function Principles() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="principles"
      ref={ref}
      className="relative mx-auto max-w-3xl px-[var(--space-3)] py-[var(--space-7)]"
    >
      <div
        aria-hidden
        className="ambient-glow"
        style={{
          top: '30%',
          right: '-10%',
          width: '26vw',
          height: '26vw',
          maxWidth: 360,
          maxHeight: 360,
          background: 'radial-gradient(circle, rgba(217,161,92,0.12), transparent 70%)',
        }}
      />

      <h2 data-reveal className="eyebrow relative z-10 mb-[var(--space-4)]">
        Principles
      </h2>

      <ul className="relative z-10 flex flex-col" style={{ borderTop: '1px solid var(--line)' }}>
        {principles.map((p) => (
          <li
            key={p.statement}
            data-reveal
            className="flex flex-col gap-1 py-[var(--space-3)]"
            style={{ borderBottom: '1px solid var(--line)' }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading)' }}>
              {p.statement}
            </span>
            <span style={{ color: 'var(--ink-faint)', fontSize: 'var(--text-caption)' }}>
              {p.support}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
