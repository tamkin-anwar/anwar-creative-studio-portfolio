import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { PageShell } from '../components/PageShell'

function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)' }} {...props} />
}

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
    detail: (
      <>
        <Link href="https://undercase.xyz/fonts/fraunces">Fraunces</Link>, by Phaedra Charles and
        Flavia Zimbardi at Undercase Type, for headings. <Link href="https://rsms.me/inter/">Inter</Link>,
        by Rasmus Andersson, for body text. <Link href="https://www.jetbrains.com/lp/mono/">
          JetBrains Mono
        </Link>{' '}
        for labels and code. All three are self-hosted as WOFF2, weight 400 only, the only weight used
        anywhere on the site.
      </>
    ),
  },
  {
    term: 'Privacy',
    detail: 'No analytics, no trackers, nothing watching what you do on this page.',
  },
  {
    term: 'Motion',
    detail:
      "Every project card's animation is hand-built in CSS around that product's own idea. The one exception is Jotfield, which uses a 22KB self-hosted video loop. Everything respects prefers-reduced-motion.",
  },
  {
    term: 'A bug worth mentioning',
    detail:
      "This site's own base styles once silently broke every Tailwind margin utility on the page. They sat outside Tailwind's CSS cascade layer, and unlayered CSS always wins regardless of specificity. Moving them into @layer base fixed it.",
  },
  {
    term: 'Source',
    detail: (
      <Link href="https://github.com/tamkin-anwar/anwar-creative-studio-portfolio">
        github.com/tamkin-anwar/anwar-creative-studio-portfolio
      </Link>
    ),
  },
]

export function ColophonPage() {
  return (
    <PageShell eyebrow="Colophon">
      <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
        How this is built.
      </h1>

      <p style={{ color: 'var(--ink-faint)', fontSize: 'var(--text-caption)' }}>
        A colophon used to be a note at the back of a book, naming the type it was set in and how it
        was printed. This is that, for a website.
      </p>

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
