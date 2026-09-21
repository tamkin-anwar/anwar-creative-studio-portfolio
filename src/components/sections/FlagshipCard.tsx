import type { ReactNode } from 'react'
import { useCardTilt } from '../../hooks/useCardTilt'

export function FlagshipCard({
  id,
  titleId,
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

  return (
    <article
      id={id}
      ref={ref}
      data-reveal
      aria-labelledby={titleId}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
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
      <img className="flagship-art" src={imgSrc} alt="" width={imgWidth} height={imgHeight} loading="lazy" />
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
