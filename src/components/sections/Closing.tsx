import { links } from '../../content/links'

const BASE = import.meta.env.BASE_URL

// The page ends on a person and on what's free, the way Panic and HEY end
// theirs, with each link at the easiest way in. The gold point is the full
// stop of the studio's own note.
export function Closing() {
  return (
    <section className="close" aria-label="Try Artha and Corres">
      <p>
        Tamkin Anwar designs and builds both apps, and reads every email that comes in. Artha is free on
        the web today, and Corres is free while it&rsquo;s in beta<span className="gp">.</span>
      </p>
      <div className="close-links">
        <a className="tlink" href={links.artha}>Open Artha on the web →</a>
        <a className="tlink" href={links.corresBeta}>Join the Corres beta →</a>
        <a className="tlink" href={`${BASE}contact/`}>Write to Tamkin →</a>
      </div>
    </section>
  )
}
