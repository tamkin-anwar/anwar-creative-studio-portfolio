import { useRef, type MouseEvent } from 'react'
import type { Project } from '../../content/projects'

const TILT_MAX_DEG = 7

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null)

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
      data-reveal
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex flex-col gap-[var(--space-2)] overflow-hidden rounded-2xl border p-[var(--space-4)]"
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

      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(217,161,92,0.12), rgba(124,111,168,0.12))',
        }}
      >
        {project.previewImage ? (
          <img
            src={project.previewImage}
            alt=""
            className="h-full w-full object-cover"
            style={{
              // fade the photo's own edge out before it meets the card's
              // border, so the two don't read as a double frame
              maskImage: 'radial-gradient(ellipse at center, black 78%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 78%, transparent 100%)',
            }}
          />
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
