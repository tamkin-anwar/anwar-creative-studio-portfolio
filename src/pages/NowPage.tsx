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
          Most of our time goes to Corres, the email app for iPhone, iPad, Mac and Apple Watch.
        </p>
        <p>
          The beta is on TestFlight with early testers, fifty-six builds in, and we use it every
          day ourselves. Gmail, Outlook, iCloud Mail and other IMAP accounts share one inbox that opens on what needs you,
          with a Primary inbox that learns from every correction and Promotions, Social and Updates
          kept apart. Writing covers everything from Send Later and Undo Send to follow-up reminders, and
          search reaches the whole mailbox. Nothing you do is lost: mail written offline is sent once
          you&rsquo;re back, and your choices follow you between devices.
        </p>
        <p>
          Corres now reads deadlines, receipts,
          deliveries and questions in all twenty-nine languages it speaks, Arabic and Hebrew right to left, and follows your region&rsquo;s weekend. You can clean up a sender&rsquo;s whole mailbox with an undo, sign mail with your logo, and choose which folders notify you.
          Emails open with every picture their sender put in, and an optional Daily Brief reads a month of
          mail for today&rsquo;s plans, bills, deliveries and the replies you owe, on the Home Screen and Apple Watch too. Its main screens were checked with
          Apple&rsquo;s own accessibility audit. It&rsquo;s made for iPhone Duo too, with your mail and the open email either side of the fold, and the build we plan to send to the App Store as 1.0 is with testers now.
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
        Last updated November 9, 2026 &middot;{' '}
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
