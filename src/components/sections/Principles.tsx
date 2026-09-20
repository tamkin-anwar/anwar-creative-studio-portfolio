import { useReveal } from '../../hooks/useReveal'

const principles = [
  {
    statement: 'Know what happens next.',
    support: 'Review a statement before it enters Artha. Approve an assistant’s changes before they run. The important steps should be yours to take.',
  },
  {
    statement: 'Your private things stay yours.',
    support: 'Jotfield opens without an account and keeps notes on your device. If you choose cloud sync, notes are encrypted before they leave it.',
  },
  {
    statement: 'Make the everyday parts worth returning to.',
    support: 'Finding a note, checking a bill, choosing a film together. Those small moments are the reason these products exist, and where most of the care goes.',
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
