import { links } from '../../content/links'

const BASE = import.meta.env.BASE_URL

// Every product the company has shipped is listed, the way Panic and Rogue
// Amoeba list theirs, grouped by kind rather than ranked by size. Projects
// that aren't ready to stand beside Artha and Corres stay off until they are.
const more = [
  {
    name: 'Tether',
    kind: 'Chrome extension',
    icon: `${BASE}press/tether-icon.png`,
    line: 'Watch shows and movies in sync with someone far away, on Netflix, Prime Video, YouTube and more, and chat right on the video.',
    href: links.tether,
  },
]

export function MoreProducts() {
  return (
    <section className="sec" id="more" aria-labelledby="more-title">
      <p className="kicker" id="more-title">Also from Anwar Creative Studio</p>
      <div className="more">
        {more.map((item) => (
          <a key={item.name} href={item.href} target="_blank" rel="noreferrer">
            <img src={item.icon} alt="" width={40} height={40} loading="lazy" decoding="async" />
            <span>
              <b>{item.name}</b>
              <span>{item.line}</span>
            </span>
            <small>{item.kind} ↗</small>
          </a>
        ))}
      </div>
    </section>
  )
}
