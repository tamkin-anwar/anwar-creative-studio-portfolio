import { company } from '../../content/company'
import { links } from '../../content/links'

const BASE = import.meta.env.BASE_URL

const columns = [
  {
    title: 'Products',
    items: [
      { label: 'Corres', href: links.corres },
      { label: 'Artha', href: links.artha },
      { label: 'From the workshop', href: `${BASE}#workshop` },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: `${BASE}about/` },
      { label: 'Now', href: `${BASE}now/` },
      { label: 'Colophon', href: `${BASE}colophon/` },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Corres support', href: 'https://corres.app/support/' },
      { label: 'Artha support', href: `mailto:${links.arthaSupport}` },
      { label: 'Contact', href: `${BASE}contact/` },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: `${BASE}privacy/` },
      { label: 'Terms', href: `${BASE}terms/` },
      { label: 'Corres privacy', href: 'https://corres.app/privacy/' },
    ],
  },
]

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto flex max-w-5xl flex-col gap-[var(--space-5)] px-[var(--space-3)] pb-[var(--space-6)] pt-[var(--space-7)]"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="flex flex-col gap-[var(--space-2)]">
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading)', lineHeight: 1.15 }}>
          Looked for it. Didn&rsquo;t love it. Built it.
        </p>
        <a
          href={`mailto:${links.email}`}
          className="font-mono w-fit tracking-[0.06em]"
          style={{ fontSize: 'var(--text-caption)', color: 'var(--accent-warm)' }}
        >
          {links.email}
        </a>
      </div>

      <nav aria-label="Footer" className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-[var(--space-1)]">
            <p className="font-mono" style={{ fontSize: '10.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
              {column.title}
            </p>
            {column.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{ fontSize: '0.875rem', color: 'var(--ink-dim)' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div
        className="font-mono flex flex-wrap items-center justify-between gap-[var(--space-2)] pt-[var(--space-3)]"
        style={{ borderTop: '1px solid var(--line)', fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
      >
        <span>
          &copy; {company.year} {company.legalName} &middot; {company.registered}
        </span>
        <a href={links.github} target="_blank" rel="noreferrer" style={{ color: 'var(--ink-faint)' }}>
          GitHub ↗
        </a>
      </div>
    </footer>
  )
}
