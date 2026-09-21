import { useReveal } from '../../hooks/useReveal'

const principles = [
  {
    statement: 'Trust lives in the code, not the interface.',
    support: 'Artha’s assistant hits the same validated route a manual entry would. Stub’s access control runs entirely on Postgres row-level security, not application code that could be bypassed.',
  },
  {
    statement: 'What the code can’t do matters more than what it promises.',
    support: 'Jotfield encrypts notes with a key that’s never transmitted; the server only ever sees ciphertext. Corres is built to never silently forward a message to an AI service.',
  },
  {
    statement: 'Nothing fails silently, and nothing pretends to succeed.',
    support: 'Anwar Logistics’ contact form fails closed with a clear error if its email credentials are missing, rather than pretending to succeed. Anwar Autowerks’ fallback only appears if the same kind of request actually fails.',
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
