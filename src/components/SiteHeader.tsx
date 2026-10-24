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
      <a href={BASE} className="site-wordmark">
        Anwar Creative Studio
      </a>
      <nav aria-label="Main" className="site-nav">
        {nav.map((item) => (
          <a key={item.label} href={item.href} className="site-nav-link">
            {item.label}
          </a>
        ))}
        <button type="button" onClick={openCommandPalette} className="site-search" aria-label="Search the site">
          <span className="site-search-label-wide">Search</span>
          <span className="site-search-label-narrow">Menu</span>
          <kbd className="site-search-kbd">&#8984;K</kbd>
        </button>
      </nav>
    </header>
  )
}
