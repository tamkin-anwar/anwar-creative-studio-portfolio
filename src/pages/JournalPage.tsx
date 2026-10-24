import { PageShell } from '../components/PageShell'
import { journal } from '../content/journal'

const format = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export function JournalPage() {
  return (
    <PageShell eyebrow="Journal" backHref={import.meta.env.BASE_URL}>
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          What&rsquo;s new at the studio.
        </h1>
        <p>Releases and milestones from Anwar Creative Studio, newest first.</p>
        <ol className="journal-list">
          {journal.map((entry) => (
            <li key={`${entry.date}-${entry.title}`} className="journal-entry">
              <p className="font-mono journal-meta">
                <time dateTime={entry.date}>{format(entry.date)}</time>
                {entry.product ? <span> &middot; {entry.product}</span> : null}
              </p>
              <h2 className="journal-title">{entry.title}</h2>
              <p>{entry.body}</p>
              {entry.link ? (
                <p>
                  <a href={entry.link.href} target="_blank" rel="noreferrer">
                    {entry.link.label} ↗
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ol>
        <p>
          For a running note on what&rsquo;s in progress, see <a href={`${import.meta.env.BASE_URL}now/`}>Now</a>.
        </p>
      </div>
    </PageShell>
  )
}
