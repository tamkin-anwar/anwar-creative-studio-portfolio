import { useEffect, useState, type ReactNode } from 'react'
import { useScrollActive } from '../../hooks/useScrollActive'
import { useCardTilt } from '../../hooks/useCardTilt'

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

  const [inView] = useScrollActive(ref)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden)
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return (
    <article
      id={id}
      ref={ref}
      data-flagship-motion={motion}
      data-art-active={inView && pageVisible ? 'true' : 'false'}
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
      <div className="flagship-artwork" aria-hidden="true">
        <div className="flagship-art-scene">
        <img className="flagship-art" src={imgSrc} alt="" width={imgWidth} height={imgHeight} loading="lazy" decoding="async" />
        <span className="flagship-light" />
        <span className="flagship-sheen" />
        {motion === 'artha' && <span className="artha-orb-rim"><span /></span>}
        </div>
      </div>
      <div className="flagship-copy">
        <span className="flagship-status">{status}</span>
        <h3 id={titleId}>{title}</h3>
        <p className="flagship-tagline">{tagline}</p>
        <p>{description}</p>
        <details>
          <summary className="cursor-pointer select-none">{disclosureLabel}</summary>
          <p>{disclosureDetail}</p>
        </details>
        {link}
      </div>
    </article>
  )
}
