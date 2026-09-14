import type { ReactNode } from 'react'
import { PageShell } from '../components/PageShell'

const entries: { term: string; detail: ReactNode }[] = [
  {
    term: 'Built with',
    detail: 'Vite, React 19, TypeScript, and Tailwind CSS v4.',
  },
  {
    term: 'Hosted on',
    detail: 'GitHub Pages, deployed by GitHub Actions on every push to main.',
  },
  {
    term: 'Type',
    detail:
      "Fraunces, Inter, and JetBrains Mono, self-hosted as WOFF2. Weight 400 only, since that's the only weight used anywhere on the site.",
  },
  {
    term: 'Motion',
    detail:
      "Every project card's animation is hand-built in CSS around that product's own idea, not a screen recording, except Jotfield, which uses a 22KB self-hosted video loop. Everything respects prefers-reduced-motion.",
  },
  {
    term: 'A bug worth mentioning',
    detail:
      "This site's own base styles once silently broke every Tailwind margin utility on the page, because they sat outside Tailwind's CSS cascade layer, and unlayered CSS always wins regardless of specificity. Moving them into @layer base fixed it.",
  },
  {
    term: 'Source',
    detail: (
      <a
        href="https://github.com/tamkin-anwar/anwar-creative-studio-portfolio"
        target="_blank"
        rel="noreferrer"
        style={{ color: 'var(--accent-warm)' }}
      >
        github.com/tamkin-anwar/anwar-creative-studio-portfolio
      </a>
    ),
  },
]

export function ColophonPage() {
  return (
    <PageShell eyebrow="Colophon">
      <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
        How this is built.
      </h1>

      <dl className="flex flex-col" style={{ borderTop: '1px solid var(--line)' }}>
        {entries.map((entry) => (
          <div
            key={entry.term}
            className="flex flex-col gap-1 py-[var(--space-3)] sm:flex-row sm:gap-[var(--space-4)]"
            style={{ borderBottom: '1px solid var(--line)' }}
          >
            <dt
              className="font-mono shrink-0 uppercase tracking-[0.08em] sm:w-40"
              style={{ fontSize: 'var(--text-label)', color: 'var(--accent-cool)' }}
            >
              {entry.term}
            </dt>
            <dd style={{ color: 'var(--ink-dim)' }}>{entry.detail}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  )
}
