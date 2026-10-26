import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { PageShell } from '../components/PageShell'

function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)' }} {...props} />
}

const entries: { term: string; detail: ReactNode }[] = [
  {
    term: 'Built with',
    detail:
      'Vite, React 19, TypeScript, and Tailwind CSS v4. Every page is rendered to HTML at build time, so it reads fine before any JavaScript runs, then React takes over in the browser.',
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
        for labels and code. All three are self-hosted as WOFF2.
      </>
    ),
  },
  {
    term: 'Privacy',
    detail: (
      <>
        No cookies and no trackers. Visits are counted with Cloudflare Web Analytics, which records totals, not people. The full policy is
        on the <a href={`${import.meta.env.BASE_URL}privacy/`} style={{ color: 'var(--accent-warm)' }}>privacy page</a>.
      </>
    ),
  },
  {
    term: 'The demos',
    detail:
      'Corres and Artha on the homepage are not videos or screenshots. Each screen is live HTML, drawn at the size the real app is laid out at and scaled to fit, and a short script plays it one chapter at a time once it scrolls into view. It plays once and stops, pauses when you scroll away, and with Reduce Motion each chapter simply shows how it ends. The people in the mail are made up.',
  },
  {
    term: 'Devices',
    detail: (
      <>
        The iPhone and MacBook Pro frames are Apple&rsquo;s own{' '}
        <Link href="https://developer.apple.com/design/resources/">Product Bezels</Link>, used as Apple
        provides them: never redrawn, tilted or animated.
      </>
    ),
  },
  {
    term: 'Light and dark',
    detail:
      'The site follows your device. Every color is a token with a light and a dark value, and the iPhone switches from silver to black with it.',
  },
  {
    term: 'The mark',
    detail: (
      <>
        A lowercase a hanging from a headline, sized to the capital height of Fraunces so it sits on the
        same line as &ldquo;Anwar.&rdquo; The gold point is the full stop. It appears once in a view, where a
        sentence ends, and never as decoration. Files and rules are in the{' '}
        <a href={`${import.meta.env.BASE_URL}press/`} style={{ color: 'var(--accent-warm)' }}>press kit</a>.
      </>
    ),
  },
  {
    term: 'A bug worth mentioning',
    detail:
      "This site’s own base styles once silently broke every Tailwind margin utility on the page. They sat outside Tailwind’s CSS cascade layer, and unlayered CSS always wins regardless of specificity. Moving them into @layer base fixed it.",
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
