import { PageShell } from '../components/PageShell'

const BASE = import.meta.env.BASE_URL

// The one playful use of "a.": the motto, for a page that isn't there.
export function NotFoundPage() {
  return (
    <PageShell eyebrow="Page not found">
      <div className="notfound">
        <span className="endmark big" aria-hidden="true">
          a<i className="pt" />
        </span>
        <h1 className="leading-[1.05]" style={{ fontSize: 'var(--text-display)' }}>
          Looked for it. Didn&rsquo;t find it.
        </h1>
        <p style={{ color: 'var(--ink-dim)', fontSize: 'var(--text-body)' }}>
          This page may have moved, or the link may be mistyped.
        </p>
        <p className="close-links">
          <a className="tlink" href={BASE}>Go home →</a>
          <a className="tlink" href={`${BASE}journal/`}>See what&rsquo;s new →</a>
        </p>
      </div>
    </PageShell>
  )
}
