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
          It&rsquo;s a real daily driver now: Gmail sync, sending, Archive/Trash, attachments, labels,
          search, and push notifications all work end to end, and it now supports multiple Gmail
          accounts connected at once, with a switcher between one merged inbox and any single account.
          Apple Intelligence, running entirely on-device, now surfaces what needs you, one-tap unsubscribe clears the rest,
          and every row has a fully custom, tunable swipe with independent short and long gestures.
          I&rsquo;m running it daily on my own iPhone. Next up: AI-drafted replies, with a clear,
          disclosed processing choice before anything sends.
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
        Last updated September 24, 2026 &middot;{' '}
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
