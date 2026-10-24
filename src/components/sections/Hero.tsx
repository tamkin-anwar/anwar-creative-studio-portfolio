import { ParticleField } from '../scene/ParticleField'
import { useReveal } from '../../hooks/useReveal'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export function Hero() {
  const ref = useReveal<HTMLElement>()
  const progress = useScrollProgress(ref)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-[var(--space-2)] overflow-hidden px-[var(--space-3)] pb-[var(--space-6)] pt-[var(--space-7)] text-center"
    >
      <div
        aria-hidden
        className="ambient-glow"
        style={{
          top: '50%',
          left: '50%',
          width: '60vw',
          height: '60vw',
          maxWidth: 700,
          maxHeight: 700,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(217,161,92,0.16), rgba(124,111,168,0.08) 55%, transparent 75%)',
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
          An independent software company
        </p>

        <div
          className="relative h-[30svh] w-full max-w-2xl sm:h-[40svh]"
          style={{
            transform: `translateY(${progress * -50}px) scale(${1 - progress * 0.18})`,
            // fade the canvas out before its own raster edge, so a glowing
            // particle's bloom near the boundary fades away instead of
            // getting hard-clipped by the canvas's own rectangular bounds
            maskImage: 'radial-gradient(ellipse at center, black 68%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 68%, transparent 100%)',
          }}
        >
          <ParticleField />
        </div>

        <h1
          data-reveal
          data-reveal-mask
          className="max-w-3xl leading-[1.05]"
          style={{ fontSize: 'var(--text-display)' }}
        >
          <span className="sr-only">Anwar Creative Studio. </span>
          Looked for it. Didn&rsquo;t love it. Built it.
        </h1>
        <p
          data-reveal
          className="max-w-xl"
          style={{ color: 'var(--ink-dim)', fontSize: 'var(--text-body)' }}
        >
          Anwar Creative Studio makes premium apps for iPhone, iPad and Mac. Corres for your email.
          Artha for your money.
        </p>
        <div data-reveal className="mt-[var(--space-2)] flex flex-wrap justify-center gap-[var(--space-2)]">
          <a href="#corres" className="hero-cta hero-cta-primary">Meet Corres</a>
          <a href="#artha" className="hero-cta">Meet Artha</a>
        </div>
      </div>

    </section>
  )
}
