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
          It&rsquo;s a real daily driver, and it has just been fully redesigned: a quiet Obsidian and
          Ivory look with New York serif type, a new titanium-and-sapphire mark, and Liquid Glass
          controls, all drawn as vector so it stays razor-sharp. Apple Intelligence, running entirely
          on-device, sorts what needs you, summarizes long threads, suggests replies and drafts them in
          your voice, and rewrites what you write shorter, warmer, or more formal. Snooze understands
          plain language, trackers are blocked on every open, and every Gmail account lives in one
          inbox that stays in sync with your other devices. The first beta is now on TestFlight with a
          few early testers. It&rsquo;s also built to be shaped around you: the tabs, the actions under an
          email, every swipe, and which mailboxes show are all yours to arrange.
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
