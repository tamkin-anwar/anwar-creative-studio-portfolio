import { PageShell } from '../components/PageShell'
import { links } from '../content/links'

const routes = [
  {
    title: 'Artha',
    lines: [
      { label: 'Help with Artha on the web or in the apps', email: links.arthaSupport },
      { label: 'Privacy and your data', email: links.arthaPrivacy },
    ],
    more: { label: 'Artha support and FAQ', href: 'https://arthaapp.com/support' },
  },
  {
    title: 'Corres',
    lines: [
      { label: 'Help with the app or the beta', email: links.corresSupport },
      { label: 'Privacy and your data', email: links.corresPrivacy },
    ],
    more: { label: 'Corres support and FAQ', href: 'https://corres.app/support/' },
  },
  {
    title: 'Everything else',
    lines: [{ label: 'Press, partnerships and general questions', email: links.email }],
  },
]

export function ContactPage() {
  return (
    <PageShell eyebrow="Contact and support">
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          Contact us.
        </h1>
        <p>
          We read every message and reply by email. Writing to the right address below gets you the
          fastest answer.
        </p>

        {routes.map((route) => (
          <section key={route.title} className="flex flex-col gap-[var(--space-1)]">
            <h2>{route.title}</h2>
            <dl className="detail-list">
              {route.lines.map((line) => (
                <div key={line.email} className="contents">
                  <dt>{line.label}</dt>
                  <dd>
                    <a className="hit" href={`mailto:${line.email}`}>{line.email}</a>
                  </dd>
                </div>
              ))}
            </dl>
            {route.more ? (
              <p>
                <a className="hit" href={route.more.href} target="_blank" rel="noreferrer">
                  {route.more.label} ↗
                </a>
              </p>
            ) : null}
          </section>
        ))}

        <h2>Try the betas</h2>
        <p>
          Artha and Corres are both in beta on TestFlight, and anyone can join:{' '}
          <a href={links.arthaBeta} target="_blank" rel="noreferrer">the Artha beta</a> and{' '}
          <a href={links.corresBeta} target="_blank" rel="noreferrer">the Corres beta</a>. Artha is also free
          on the web at <a href={links.artha} target="_blank" rel="noreferrer">arthaapp.com</a>.
        </p>
        <p>We don&rsquo;t take on client or agency work.</p>
      </div>
    </PageShell>
  )
}
