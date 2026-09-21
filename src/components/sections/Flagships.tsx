import { useReveal } from '../../hooks/useReveal'
import { links } from '../../content/links'
import { corres } from '../../content/corres'
import { FlagshipCard } from './FlagshipCard'

export function Flagships() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="flagships" ref={ref} className="flagships" aria-labelledby="flagships-title">
      <h2 id="flagships-title" data-reveal className="eyebrow mb-[var(--space-4)]">The flagships</h2>
      <div className="flagship-grid">
        <FlagshipCard
          titleId="artha-title"
          motion="artha"
          imgSrc={`${import.meta.env.BASE_URL}artha-mark-wide.webp`}
          imgWidth={1200}
          imgHeight={750}
          status="Artha · Available now"
          title="Artha"
          tagline="See where it went. Know where it's going."
          description="Bring in a bank statement and watch the month sort itself into categories, bills, and a plan for what's next. Budgets, notes, and your calendar stay in the same place the money does."
          disclosureLabel="How it was built"
          disclosureDetail="Built with Flask and SQLAlchemy. Statement imports have a review step before saving. The assistant proposes changes as approval cards, then uses the same validated routes as manual entries. Tests cover authentication and money-handling paths."
          link={<a className="flagship-link" href={links.artha} target="_blank" rel="noreferrer">Open Artha ↗</a>}
        />
        <FlagshipCard
          id="corres"
          titleId="corres-title"
          motion="corres"
          imgSrc={`${import.meta.env.BASE_URL}corres-sculpture.jpg`}
          imgWidth={1200}
          imgHeight={1200}
          status={`Corres · ${corres.status}`}
          title="Corres"
          tagline={corres.tagline}
          description={corres.description}
          disclosureLabel="What is taking shape"
          disclosureDetail={corres.progress}
          link={<a className="flagship-link" href={`${import.meta.env.BASE_URL}now/`}>Follow the build →</a>}
        />
      </div>
    </section>
  )
}
