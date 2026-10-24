import { useReveal } from '../../hooks/useReveal'
import { links } from '../../content/links'
import { artha } from '../../content/artha'
import { corres } from '../../content/corres'
import { FlagshipCard } from './FlagshipCard'

export function Flagships() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="flagships" ref={ref} className="flagships" aria-labelledby="flagships-title">
      <h2 id="flagships-title" data-reveal className="eyebrow mb-[var(--space-4)]">The flagships</h2>
      <div className="flagship-grid">
        <FlagshipCard
          id="artha"
          titleId="artha-title"
          motion="artha"
          imgSrc={`${import.meta.env.BASE_URL}artha-mark-wide.webp`}
          imgWidth={1200}
          imgHeight={750}
          status={`Artha · ${artha.status}`}
          title="Artha"
          tagline={artha.tagline}
          description={artha.description}
          disclosureLabel="How it's made"
          disclosureDetail={artha.craft}
          link={
            <div className="flex flex-wrap gap-x-6">
              <a className="flagship-link" href={links.artha} target="_blank" rel="noreferrer">Open Artha ↗</a>
              <a className="flagship-link" href={artha.beta} target="_blank" rel="noreferrer">Join the iPhone beta ↗</a>
            </div>
          }
        />
        <FlagshipCard
          id="corres"
          titleId="corres-title"
          motion="corres"
          imgSrc={`${import.meta.env.BASE_URL}corres-mark.webp`}
          imgWidth={1200}
          imgHeight={1200}
          status={`Corres · ${corres.status}`}
          title="Corres"
          tagline={corres.tagline}
          description={corres.description}
          disclosureLabel="Where the beta stands"
          disclosureDetail={corres.progress}
          link={<a className="flagship-link" href={links.corres} target="_blank" rel="noreferrer">Visit Corres ↗</a>}
        />
      </div>
    </section>
  )
}
