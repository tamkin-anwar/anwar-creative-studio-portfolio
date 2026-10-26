import { links } from '../../content/links'

const BASE = import.meta.env.BASE_URL

// The page ends on the gold point: the full stop of the studio's own note.
export function Closing() {
  return (
    <section className="close" aria-label="Try Corres">
      <p>
        We&rsquo;re a small, self-funded studio in California. Corres is in beta now, and you can try it
        today<span className="gp">.</span>
      </p>
      <div className="close-links">
        <a className="tlink" href={links.corresBeta}>Join the Corres beta →</a>
        <a className="tlink" href={`${BASE}contact/`}>Write to us →</a>
      </div>
    </section>
  )
}
