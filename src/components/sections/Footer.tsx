import { company } from '../../content/company'
import { links } from '../../content/links'
import { Lockup } from '../identity/Lockup'

const BASE = import.meta.env.BASE_URL

const columns = [
  {
    title: 'Apps',
    items: [
      { label: 'Corres', href: links.corres },
      { label: 'Artha', href: links.artha },
      { label: 'Workshop', href: `${BASE}#workshop` },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: `${BASE}about/` },
      { label: 'Journal', href: `${BASE}journal/` },
      { label: 'Press kit', href: `${BASE}press/` },
      { label: 'Now', href: `${BASE}now/` },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Corres', href: 'https://corres.app/support/' },
      { label: 'Artha', href: `mailto:${links.arthaSupport}` },
      { label: 'Contact', href: `${BASE}contact/` },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: `${BASE}privacy/` },
      { label: 'Terms', href: `${BASE}terms/` },
      { label: 'Colophon', href: `${BASE}colophon/` },
    ],
  },
]

export function Footer() {
  return (
    <footer className="wrap site-footer">
      <div className="foot">
        <div>
          <a href={BASE} className="site-home" aria-label="Anwar Creative Studio, home">
            <Lockup big />
          </a>
          <span className="foot-line">{company.descriptor}</span>
          <a className="foot-mail" href={`mailto:${links.email}`}>{links.email}</a>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <b>{column.title}</b>
            {column.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="legal">
        <span>
          &copy; {company.year} {company.name} &middot; {company.registered}
        </span>
        <span>Looked for it. Didn&rsquo;t love it. Built it.</span>
      </div>
    </footer>
  )
}
