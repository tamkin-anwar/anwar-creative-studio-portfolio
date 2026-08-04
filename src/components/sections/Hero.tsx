import { CanvasRoot } from '../scene/CanvasRoot'
import { useReveal } from '../../hooks/useReveal'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export function Hero() {
  const ref = useReveal<HTMLElement>()
  const progress = useScrollProgress(ref)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-[var(--space-2)] overflow-hidden px-[var(--space-3)] text-center"
    >
      <div
        aria-hidden
        className="ambient-glow"
        style={{
          top: '50%',
          left: '50%',
          width: '45vw',
          height: '65vh',
          maxWidth: 480,
          maxHeight: 720,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse, rgba(217,161,92,0.16), rgba(124,111,168,0.08) 55%, transparent 75%)',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-[var(--space-2)]"
        style={{
          transform: `translateY(${progress * 40}px)`,
          opacity: 1 - progress * 1.3,
        }}
      >
        <p data-reveal className="eyebrow">
          Anwar Creative Studio
        </p>

        <div
          className="relative h-[46vh] w-full max-w-[280px] cursor-grab active:cursor-grabbing sm:h-[54vh]"
          style={{
            transform: `translateY(${progress * -50}px) scale(${1 - progress * 0.18})`,
            // The canvas's own edge can read as a faint rectangle against the page (the
            // WebGL scene's clear color never quite tone-maps to the exact same pixel as
            // the CSS background). Masking the box's own edges to transparent dissolves
            // that boundary regardless, rather than chasing a pixel-perfect color match.
            maskImage: 'radial-gradient(ellipse at center, black 55%, transparent 82%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, transparent 82%)',
          }}
        >
          <CanvasRoot />
        </div>

        <h1
          data-reveal
          data-reveal-mask
          className="max-w-3xl leading-[1.05]"
          style={{ fontSize: 'var(--text-display)' }}
        >
          A design lab for ideas that want to exist.
        </h1>
      </div>
    </section>
  )
}
