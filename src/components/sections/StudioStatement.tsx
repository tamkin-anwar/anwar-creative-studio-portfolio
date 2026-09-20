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
        Anwar Creative Studio is where Tamkin Anwar designs and builds independent software. It is
        part of Anwar Ventures, alongside Anwar Autowerks, Anwar Logistics, and Anwar Property Group.
      </p>
      <p data-reveal className="relative z-10 mt-[var(--space-3)]" style={{ color: 'var(--ink-dim)' }}>
        Artha and the upcoming Corres are the studio’s flagships: a place to understand your money,
        and a place to give your correspondence the attention it deserves. Alongside them are
        smaller projects for writing, watching together, and making something just for the pleasure of it.
      </p>
    </section>
  )
}
