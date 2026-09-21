import type { ReactNode } from 'react'
import { useCardTilt } from '../../hooks/useCardTilt'
import { useScrollActive } from '../../hooks/useScrollActive'

export function FlagshipCard({
  id,
  titleId,
  motion,
  imgSrc,
  imgWidth,
  imgHeight,
  status,
  title,
  tagline,
  description,
  disclosureLabel,
  disclosureDetail,
  link,
}: {
  id?: string
  titleId: string
  motion: 'artha' | 'corres'
  imgSrc: string
  imgWidth: number
  imgHeight: number
  status: string
  title: string
  tagline: string
  description: string
  disclosureLabel: string
  disclosureDetail: string
  link: ReactNode
}) {
  const { ref, onMouseMove, onMouseLeave } = useCardTilt<HTMLElement>()
  const [active, setActive] = useScrollActive(ref)

  return (
    <article
      id={id}
      ref={ref}
      data-motion={motion}
      data-motion-active={active ? 'true' : 'false'}
      data-reveal
      aria-labelledby={titleId}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onFocusCapture={() => setActive(true)}
      className="flagship relative"
      style={{ transition: 'transform 0.4s var(--ease-out-expo), border-color 0.4s var(--ease-out-expo)', willChange: 'transform' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity"
        style={{
          background:
            'radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(217,161,92,0.16), transparent 70%)',
          opacity: 'var(--glow-opacity, 0)',
          transitionDuration: '0.3s',
        }}
      />
      <div className="flagship-art-frame relative overflow-hidden">
        <img className="flagship-art" src={imgSrc} alt="" width={imgWidth} height={imgHeight} loading="lazy" />
        <div aria-hidden className="flagship-motion-layer" />
        <div aria-hidden className="flagship-motion-glint" />
      </div>
      <div className="flagship-copy">
        <span className="flagship-status">{status}</span>
        <h3 id={titleId}>{title}</h3>
        <p className="flagship-tagline">{tagline}</p>
        <p>{description}</p>
        <details>
          <summary>{disclosureLabel}</summary>
          <p>{disclosureDetail}</p>
        </details>
        {link}
      </div>
    </article>
  )
}
