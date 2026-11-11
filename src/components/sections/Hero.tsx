import { links } from '../../content/links'

const BASE = import.meta.env.BASE_URL

// The two flagships, side by side and on equal terms: the same card, the
// same parts in the same order. The sections below show each one working.
const flagships = [
  {
    id: 'corres',
    name: 'Corres',
    tagline: 'Email, considered.',
    icon: `${BASE}press/corres-icon.webp`,
    line: 'Email that opens on what needs you.',
    detail: 'Gmail, Outlook, iCloud and other accounts in one inbox, with the emails that ask something of you first and the reason each one is there.',
    status: 'In beta on TestFlight, free during the beta',
    beta: links.corresBeta,
    site: { label: 'corres.app', href: links.corres },
  },
  {
    id: 'artha',
    name: 'Artha',
    tagline: 'Know what’s safe to spend.',
    icon: `${BASE}press/artha-icon.webp`,
    line: 'Budgeting that opens on what’s safe to spend.',
    detail: 'What’s left for the month once the bills still to come are counted, and what that comes to each day, with no bank login.',
    status: 'Free on the web, with the apps in beta on TestFlight',
    beta: links.arthaBeta,
    site: { label: 'arthaapp.com', href: links.artha },
  },
]

export function Hero() {
  return (
    <section className="hero">
      <h1><span className="sr-only">Anwar Creative Studio. Looked for it. Didn&rsquo;t love it. Built it.</span><span className="ln" aria-hidden="true"><span>Looked for it.</span></span><span className="ln" aria-hidden="true"><span>Didn&rsquo;t love it.</span></span><span className="ln" aria-hidden="true"><span>Built it<span className="gp">.</span></span></span></h1>
      <p className="lede">Anwar Creative Studio is an independent software company. We make two apps for iPhone, iPad, Mac and Apple Watch: Corres for your email, and Artha for your money.</p>
      <div className="flagships">
        {flagships.map((app) => (
          <article key={app.id} className="flag" aria-labelledby={`flag-${app.id}`}>
            <div className="appname">
              <img src={app.icon} alt="" width={56} height={56} decoding="async" />
              <span><b id={`flag-${app.id}`}>{app.name}</b><small>{app.tagline}</small></span>
            </div>
            <p className="flag-q">{app.line}</p>
            <p className="flag-a">{app.detail}</p>
            <div className="flag-links">
              <a className="btn" href={app.beta}>Join the {app.name} beta</a>
              <a className="tlink" href={`#${app.id}`}>See it work &darr;</a>
            </div>
            <p className="flag-meta">{app.status} &middot; <a href={app.site.href}>{app.site.label}</a></p>
          </article>
        ))}
      </div>
    </section>
  )
}
