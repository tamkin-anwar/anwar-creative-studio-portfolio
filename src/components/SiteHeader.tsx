import { Lockup } from './identity/Lockup'
import { openCommandPalette } from '../lib/commandPalette'

const BASE = import.meta.env.BASE_URL

const nav = [
  { label: 'Corres', href: `${BASE}#corres` },
  { label: 'Artha', href: `${BASE}#artha` },
  { label: 'About', href: `${BASE}about/` },
  { label: 'Journal', href: `${BASE}journal/` },
  { label: 'Contact', href: `${BASE}contact/` },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <a href={BASE} className="site-home" aria-label="Anwar Creative Studio, home">
          <Lockup />
        </a>
        <nav aria-label="Main" className="site-nav">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="site-nav-link">
              {item.label}
            </a>
          ))}
          <button type="button" onClick={openCommandPalette} className="site-menu" aria-label="Open the menu" aria-haspopup="dialog">
            Menu
          </button>
        </nav>
      </div>
    </header>
  )
}
