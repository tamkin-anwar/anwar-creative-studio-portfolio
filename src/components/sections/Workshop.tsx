import { links } from '../../content/links'
import { projects } from '../../content/projects'

// Smaller things the studio made along the way: one line each, linking out.
const workshop = [
  { name: 'Tether', href: links.tether, kind: 'Chrome extension' },
  { name: 'Jotfield', href: links.jotfield, kind: 'Web app' },
  { name: 'Doorsong', href: links.doorsong, kind: 'Web' },
]

export function Workshop() {
  return (
    <section className="sec" id="workshop" aria-labelledby="workshop-title">
      <p className="kicker" id="workshop-title">From the workshop</p>
      <div className="work">
        {workshop.map((item) => (
          <a key={item.name} href={item.href} target="_blank" rel="noreferrer">
            <span>
              <b>{item.name}</b>
              <span>{projects.find((p) => p.name === item.name)?.tagline}</span>
            </span>
            <small>{item.kind} ↗</small>
          </a>
        ))}
      </div>
    </section>
  )
}
