import { PageShell } from '../components/PageShell'
import { links } from '../content/links'

const routes = [
  {
    title: 'Corres',
    lines: [
      { label: 'Help with the app or the beta', email: links.corresSupport },
      { label: 'Privacy and your data', email: links.corresPrivacy },
    ],
    more: { label: 'Corres support and FAQ', href: 'https://corres.app/support/' },
  },
  {
    title: 'Artha',
    lines: [
      { label: 'Help with Artha on the web or iPhone', email: links.arthaSupport },
      { label: 'Privacy and your data', email: links.arthaPrivacy },
    ],
  },
  {
    title: 'Everything else',
    lines: [{ label: 'Press, partnerships and general questions', email: links.email }],
  },
]

export function ContactPage() {
  return (
    <PageShell eyebrow="Contact and support" backHref={import.meta.env.BASE_URL}>
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          Get in touch.
        </h1>
        <p>
          A person reads every message, usually within a day. Writing to the right address below gets
          you an answer fastest.
        </p>

        {routes.map((route) => (
          <section key={route.title} className="flex flex-col gap-[var(--space-1)]">
            <h2>{route.title}</h2>
            <dl className="detail-list">
              {route.lines.map((line) => (
                <div key={line.email} className="contents">
                  <dt>{line.label}</dt>
                  <dd>
                    <a href={`mailto:${line.email}`}>{line.email}</a>
                  </dd>
                </div>
              ))}
            </dl>
            {route.more ? (
              <p>
                <a href={route.more.href} target="_blank" rel="noreferrer">
                  {route.more.label} ↗
                </a>
              </p>
            ) : null}
          </section>
        ))}

        <h2>Try Corres early</h2>
        <p>
          Corres is in beta on TestFlight. Ask for an invitation at{' '}
          <a href={`mailto:${links.corresSupport}?subject=Corres%20early%20access`}>{links.corresSupport}</a>.
        </p>
        <p>We don&rsquo;t take on client or agency work.</p>
      </div>
    </PageShell>
  )
}
