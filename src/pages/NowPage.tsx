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
          Our time is split between our two apps, Artha and Corres. Both are in beta on TestFlight, we use
          both every day ourselves, and both go to the App Store next.
        </p>
        <p>
          Artha&rsquo;s app for iPhone, iPad, Mac and Apple Watch shares one account with the website,
          which anyone can use for free today. Getting started now takes about a minute: three questions, or up to three bank
          statements, and you see what&rsquo;s safe to spend, still with no bank login. On iOS 27 it hands you
          a ready-made shortcut that logs every Apple Pay purchase, and the beta can now log purchases from
          your bank&rsquo;s texts too, with bank alert emails next. It works without a connection, speaks 18
          languages and handles about 160 currencies.
        </p>
        <p>
          Corres is on build 62, and the build we plan to send to the App Store as 1.0 is with testers.
          Gmail, Outlook, iCloud Mail and other IMAP accounts share one inbox that opens on what needs you.
          This month Needs You was checked against thousands of real emails and retuned, and it now reads
          mail in all 29 languages Corres speaks, so a signature request or a bill due comes first whatever
          language it&rsquo;s written in. Starting Corres now takes you through your own newest mail instead
          of a tour, and it&rsquo;s made for iPhone Duo, with your mail and the open email either side of the
          fold.
        </p>
        <p>
          After that, it&rsquo;s Jotfield: smoothing the rough edges we find using it every day.
          Doorsong and Tether are live and stable, with fixes as they come up. Ranna, an app for
          keeping a family&rsquo;s handwritten recipes for the next generation, is planned but not
          started yet.
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <a className="hit" href="https://arthaapp.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)' }}>arthaapp.com ↗</a>
          <a className="hit" href="https://corres.app" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-warm)' }}>corres.app ↗</a>
        </p>
      </div>

      <p
        className="font-mono"
        style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
      >
        Last updated November 11, 2026 &middot;{' '}
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
