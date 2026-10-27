import { links } from '../../content/links'

// Smaller things the studio made along the way: one line each, linking out.
const workshop = [
  { name: 'Tether', tagline: 'Watch Netflix or YouTube together, in sync, from anywhere.', href: links.tether, kind: 'Chrome extension' },
  { name: 'Jotfield', tagline: 'A place for every thought.', href: links.jotfield, kind: 'Web app' },
  { name: 'Doorsong', tagline: 'Six doorways, each tuned to a different place.', href: links.doorsong, kind: 'Website' },
]

export function Workshop() {
  return (
    <section className="sec" id="workshop" aria-labelledby="workshop-title">
      <h2 className="kicker" id="workshop-title">From the workshop</h2>
      <div className="work">
        {workshop.map((item) => (
          <a key={item.name} href={item.href} target="_blank" rel="noreferrer">
            <span>
              <b>{item.name}</b>
              <span>{item.tagline}</span>
            </span>
            <small>{item.kind} ↗</small>
          </a>
        ))}
      </div>
    </section>
  )
}
