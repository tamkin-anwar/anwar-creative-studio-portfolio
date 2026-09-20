import { useReveal } from '../../hooks/useReveal'
import { links } from '../../content/links'
import { corres } from '../../content/corres'

export function Flagships() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="flagships" ref={ref} className="flagships" aria-labelledby="flagships-title">
      <h2 id="flagships-title" data-reveal className="eyebrow mb-[var(--space-4)]">The flagships</h2>
      <div className="flagship-grid">
        <article data-reveal className="flagship" aria-labelledby="artha-title">
          <img className="flagship-art" src={`${import.meta.env.BASE_URL}artha-mark-wide.webp`} alt="" width="1200" height="750" loading="lazy" />
          <div className="flagship-copy">
            <span className="flagship-status">Artha · Available now</span>
            <h3 id="artha-title">Artha</h3>
            <p className="flagship-tagline">See where it went. Know where it's going.</p>
            <p>Bring in a bank statement and watch the month sort itself into categories, bills, and a plan for what's next. Budgets, notes, and your calendar stay in the same place the money does.</p>
            <details><summary>How it was built</summary><p>Built with Flask and SQLAlchemy. Statement imports have a review step before saving. The assistant proposes changes as approval cards, then uses the same validated routes as manual entries. Tests cover authentication and money-handling paths.</p></details>
            <a className="flagship-link" href={links.artha} target="_blank" rel="noreferrer">Open Artha ↗</a>
          </div>
        </article>
        <article id="corres" data-reveal className="flagship" aria-labelledby="corres-title">
          <img className="flagship-art" src={`${import.meta.env.BASE_URL}corres-sculpture.jpg`} alt="" width="1200" height="1200" loading="lazy" />
          <div className="flagship-copy">
            <span className="flagship-status">Corres · {corres.status}</span>
            <h3 id="corres-title">Corres</h3>
            <p className="flagship-tagline">{corres.tagline}</p>
            <p>{corres.description}</p>
            <details><summary>What is taking shape</summary><p>{corres.progress}</p></details>
            <a className="flagship-link" href={`${import.meta.env.BASE_URL}now/`}>Follow the build →</a>
          </div>
        </article>
      </div>
    </section>
  )
}
