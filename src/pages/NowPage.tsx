import { PageShell } from '../components/PageShell'

export function NowPage() {
  return (
    <PageShell eyebrow="Now">
      <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
        What we&rsquo;re working on.
      </h1>

      <div
        className="flex flex-col gap-[var(--space-3)]"
        style={{ color: 'var(--ink-dim)', fontSize: 'var(--text-body)' }}
      >
        <p>
          Corres is our main build right now: a native email app for iPhone, iPad, Mac and Apple
          Watch, and one of the studio&rsquo;s two flagships, with Artha.
        </p>
        <p>
          The beta is on TestFlight with early testers, thirty-eight builds in, and we use it every
          day ourselves. Gmail, Outlook, iCloud Mail and other IMAP accounts share one inbox that opens on what needs you,
          with a Primary inbox that learns from every correction and Promotions, Social and Updates
          kept apart. Writing covers everything from Send Later and Undo Send to follow-up reminders, and
          search reaches the whole mailbox. Nothing you do is lost: mail written offline is sent once
          you&rsquo;re back, and your choices follow you between devices.
        </p>
        <p>
          The latest builds work the same wherever you are. Corres reads deadlines, receipts,
          deliveries and questions in all nine languages it speaks, follows your region&rsquo;s weekend,
          and offers an optional Brief of what&rsquo;s due today. Its main screens were checked with
          Apple&rsquo;s own accessibility audit. Next come more testers, then the App Store.
        </p>
        <p>
          Artha is going through its biggest change since it began. It was rebuilt around
          one number, what&rsquo;s safe to spend, and a native app for iPhone, iPad, Mac and Apple Watch is in
          beta on TestFlight, sharing one design language with the website. It works with any of about 160
          currencies, grows with your text size, and lets VoiceOver play its charts as sound. Next
          comes the App Store.
        </p>
        <p>
          After that, it&rsquo;s Jotfield: smoothing the rough edges we find using it every day.
          Doorsong and Tether are live and stable, with fixes as they come up. Ranna, an app for
          keeping a family&rsquo;s handwritten recipes for the next generation, is planned but not
          started yet.
        </p>
        <a className="hit" href="https://corres.app" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)' }}>Visit Corres ↗</a>
      </div>

      <p
        className="font-mono"
        style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
      >
        Last updated October 25, 2026 &middot;{' '}
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
