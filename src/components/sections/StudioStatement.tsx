import { useReveal } from '../../hooks/useReveal'

export function StudioStatement() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-2xl px-[var(--space-3)] py-[var(--space-7)] text-center"
    >
      <div
        aria-hidden
        className="ambient-glow"
        style={{
          top: '50%',
          left: '50%',
          width: '40vw',
          height: '40vw',
          maxWidth: 480,
          maxHeight: 480,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(124,111,168,0.14), transparent 70%)',
        }}
      />

      <p
        data-reveal
        className="relative z-10 leading-snug"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-heading)',
          color: 'var(--ink-dim)',
        }}
      >
        Anwar Creative Studio is the software arm of Anwar Ventures, alongside
        Anwar Capital, Anwar Autowerks, and Anwar Logistics, building interactive
        experiences, financial software, and browser extensions, then keeping
        them running.
      </p>
    </section>
  )
}
