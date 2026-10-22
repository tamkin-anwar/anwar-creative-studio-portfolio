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
          The beta is on TestFlight with early testers, twenty-six builds in, and it&rsquo;s my own daily
          driver, for Gmail, Outlook and iCloud Mail in one inbox, on iPhone, iPad, Mac and now Apple
          Watch. It sorts what needs you and keeps a Primary inbox that learns from every correction,
          with Promotions, Social and Updates kept apart. Writing is complete, from drafts and Send
          Later to follow-up reminders, and search reaches the whole mailbox. Measured on my own
          5,500-conversation mailbox, emails open almost at once. The newest builds learn how you
          write, so suggested replies use your own greeting and sign-off; let Siri write and send an
          email in Corres; put Send Later and today&rsquo;s deliveries on the Lock Screen; and bring
          Corres to the wrist, with replies by voice. Every screen was checked with Apple&rsquo;s own
          accessibility audit, and Corres speaks nine languages. Next come more testers and the App
          Store.
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
        <a href="https://corres.app" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)' }}>Visit Corres ↗</a>
      </div>

      <p
        className="font-mono"
        style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
      >
        Last updated October 22, 2026 &middot;{' '}
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
