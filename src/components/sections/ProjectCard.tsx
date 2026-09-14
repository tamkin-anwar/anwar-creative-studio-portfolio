import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import type { Project } from '../../content/projects'

const TILT_MAX_DEG = 7

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '-8% 0px -8% 0px' },
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (active && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.load()
      void video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [active])

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const card = cardRef.current
    if (!card || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * TILT_MAX_DEG
    const ry = (px - 0.5) * TILT_MAX_DEG

    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
    card.style.setProperty('--glow-x', `${px * 100}%`)
    card.style.setProperty('--glow-y', `${py * 100}%`)
    card.style.setProperty('--glow-opacity', '1')
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    card.style.setProperty('--glow-opacity', '0')
  }

  return (
    <article
      ref={cardRef}
      data-project-card
      data-motion={project.motion}
      data-motion-active={active ? 'true' : 'false'}
      data-reveal
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocusCapture={() => setActive(true)}
      className="project-card relative flex flex-col gap-[var(--space-2)] overflow-hidden rounded-2xl border p-[var(--space-4)]"
      style={{
        borderColor: 'var(--line)',
        transition: 'transform 0.4s var(--ease-out-expo), border-color 0.4s var(--ease-out-expo)',
        willChange: 'transform',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity"
        style={{
          background:
            'radial-gradient(360px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(217,161,92,0.16), transparent 70%)',
          opacity: 'var(--glow-opacity, 0)',
          transitionDuration: '0.3s',
        }}
      />

      <div className="project-preview relative flex aspect-video items-center justify-center overflow-hidden rounded-xl">
        {project.previewImage ? (
          <>
            <picture>
              <source
                media="(prefers-reduced-motion: reduce)"
                srcSet={project.reducedMotionImage ?? project.previewImage}
              />
              <img
                src={project.previewImage}
                alt=""
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="project-preview-image absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            {project.previewVideoWebm ? (
              <video
                ref={videoRef}
                className="project-preview-video absolute inset-0 h-full w-full object-cover"
                autoPlay={active}
                muted
                loop
                playsInline
                preload="none"
                poster={project.reducedMotionImage ?? project.previewImage}
                aria-hidden="true"
                onCanPlay={() => {
                  if (active && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    void videoRef.current?.play().catch(() => undefined)
                  }
                }}
              >
                <source src={project.previewVideoWebm} type="video/webm" />
                {project.previewVideoMp4 ? <source src={project.previewVideoMp4} type="video/mp4" /> : null}
              </video>
            ) : null}
            {!project.previewVideoWebm ? (
              <>
                <div aria-hidden className="project-motion-layer" />
                <div aria-hidden className="project-motion-glint" />
                {project.motion === 'doorsong' ? (
                  <div aria-hidden className="doorsong-character-strings">
                    {[
                      '心念春铃影心静雾远梦光', '雾影途归春雾远水静山路',
                      '光心途静铃念遥竹客月水影', '竹客月水影梦路影归笛远心',
                      '路影归笛远心琴声月风念客', '琴声月风念客梦路静梦灯远',
                      '梦路静梦灯远客梦云水竹远', '远客梦云水竹远山影遥铃声',
                      '竹远山影遥铃声影归声月风', '铃声影归声月风途客春静雨',
                      '月风途客春静雨路梦远笛心', '静雨路梦远笛心雾影山光',
                      '笛心雾影山光心念远水声', '山光心念远水声春梦竹门',
                      '水声春梦竹门静铃声归途', '竹门静铃声春路远梦',
                    ].map((letters, index) => (
                      <span
                        key={`${letters}-${index}`}
                        style={{
                          left: `${24 + index * 3.55}%`,
                          top: `${52 + (index % 4) * 1.15}%`,
                          animationDelay: `${index * 55}ms`,
                          animationDuration: `${5.4 + (index % 3) * 0.45}s`,
                        } as CSSProperties}
                      >
                        {letters}
                      </span>
                    ))}
                  </div>
                ) : null}
                {project.motion === 'tether' ? (
                  <div aria-hidden className="tether-sync-demo">
                    <i className="tether-sync-ring" />
                    <span className="tether-partner tether-partner-left" />
                    <span className="tether-partner tether-partner-right" />
                  </div>
                ) : null}
              </>
            ) : null}
          </>
        ) : (
          <span
            className="font-mono tracking-[0.1em]"
            style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
          >
            PREVIEW
          </span>
        )}
      </div>

      <h3 className="relative" style={{ fontSize: 'var(--text-heading)' }}>
        {project.name}
      </h3>
      <p className="relative" style={{ color: 'var(--accent-warm)', fontSize: 'var(--text-caption)' }}>
        {project.tagline}
      </p>
      <p className="relative" style={{ color: 'var(--ink-dim)' }}>
        {project.description}
      </p>

      <p
        className="relative mt-auto flex items-center gap-2 pt-[var(--space-2)] font-mono tracking-[0.06em]"
        style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
      >
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full"
          style={{ background: 'var(--accent-warm)', boxShadow: '0 0 10px rgba(217,161,92,0.5)' }}
        />
        {project.evidence}
      </p>

      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        data-magnetic
        className="relative mt-[var(--space-1)] inline-flex w-fit items-center gap-[var(--space-1)] font-mono tracking-[0.08em]"
        style={{ fontSize: 'var(--text-label)', color: 'var(--ink)' }}
      >
        Visit site →
      </a>
    </article>
  )
}
