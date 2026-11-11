import { links } from '../../content/links'

const BASE = import.meta.env.BASE_URL

// The page ends on what's free and an open door, in the company's voice.
// The gold point is the full stop of the company's own note.
export function Closing() {
  return (
    <section className="close" aria-label="Try Artha and Corres">
      <p>
        Artha is free on the web today, and Corres is free while it&rsquo;s in beta. We read every
        message, so tell us what you find<span className="gp">.</span>
      </p>
      <div className="close-links">
        <a className="tlink" href={links.artha}>Open Artha on the web →</a>
        <a className="tlink" href={links.corresBeta}>Join the Corres beta →</a>
        <a className="tlink" href={`${BASE}contact/`}>Contact us →</a>
      </div>
    </section>
  )
}
