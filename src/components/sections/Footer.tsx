import { links } from '../../content/links'
import { useReveal } from '../../hooks/useReveal'

const footerLinks = [
  { label: 'Doorsong', href: links.doorsong },
  { label: 'Artha', href: links.artha },
  { label: 'GitHub', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
].filter((link) => link.href)

export function Footer() {
  const ref = useReveal<HTMLElement>()

  return (
    <footer
      id="contact"
      ref={ref}
      className="flex flex-col items-center gap-[var(--space-6)] px-[var(--space-3)] pb-[var(--space-6)] pt-[var(--space-8)] text-center"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <h2
        data-reveal
        data-reveal-mask
        className="max-w-xl leading-[1.1]"
        style={{ fontSize: 'var(--text-heading)' }}
      >
        A design lab for ideas that want to exist.
      </h2>

      <div data-reveal className="flex flex-col items-center gap-[var(--space-3)]">
        <p
          className="font-mono"
          style={{ fontSize: 'var(--text-caption)', color: 'var(--ink-faint)' }}
        >
          Anwar Creative Studio
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-[var(--space-3)]">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="font-mono tracking-[0.06em]"
              style={{ fontSize: 'var(--text-label)', color: 'var(--ink-dim)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
