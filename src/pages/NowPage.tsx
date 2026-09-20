import { PageShell } from '../components/PageShell'

export function NowPage() {
  return (
    <PageShell eyebrow="Now">
      <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
        What I&rsquo;m focused on.
      </h1>

      <div
        className="flex flex-col gap-[var(--space-3)]"
        style={{ color: 'var(--ink-dim)', fontSize: 'var(--text-body)' }}
      >
        <p>
          Corres is the main new build: a native Apple-first email app, and the studio’s next flagship
          alongside Artha. Email, considered.
        </p>
        <p>
          Right now I’m working on the iPhone experience: its materials and type, the design system,
          and how you move between Brief, Needs You, and Waiting. The build uses sample conversations
          while those interactions take shape. Gmail is planned for the first release.
        </p>
        <p>
          Artha is already available. I’m continuing to work on the details around money, bills,
          and planning, while keeping the decisions and approvals in your hands.
        </p>
        <p>
          Ranna is also in progress: keeping my mom’s handwritten recipes for the next generation.
          Doorsong, Jotfield, Tether, and Stub are live, with fixes and improvements continuing alongside
          the new work.
        </p>
        <a href={`${import.meta.env.BASE_URL}#corres`} style={{ color: 'var(--accent-warm)' }}>See Corres in the studio →</a>
      </div>

      <p
        className="font-mono"
        style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
      >
        Last updated September 19, 2026 &middot;{' '}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--accent-warm)' }}
        >
          what&rsquo;s a /now page?
        </a>
      </p>
    </PageShell>
  )
}
