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
          The first beta is on TestFlight with a few early testers, and it&rsquo;s my own daily
          driver. It sorts what needs you, and Apple Intelligence, running entirely on the iPhone,
          summarizes threads and drafts replies in your voice. Every kind of email reads the way it
          was meant to, from plain text to designed newsletters in a true Dark mode, and the app is
          built to be shaped around you: the tabs, the actions under an email, every swipe, and which
          mailboxes show are yours to arrange. Next: more testers, then the App Store.
        </p>
        <p>
          Artha is already available. I’m polishing it further for everyday use, smoothing out the
          usability and functionality without changing how the decisions and approvals stay in your
          hands.
        </p>
        <p>
          After that, it’s Jotfield: ironing out rough edges from using it daily. Doorsong, Tether,
          and Stub are live and stable, with fixes as they come up. Ranna, keeping my mom’s handwritten
          recipes for the next generation, is planned but not started yet.
        </p>
        <a href={`${import.meta.env.BASE_URL}#corres`} style={{ color: 'var(--accent-warm)' }}>See Corres in the studio →</a>
      </div>

      <p
        className="font-mono"
        style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
      >
        Last updated October 8, 2026 &middot;{' '}
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
