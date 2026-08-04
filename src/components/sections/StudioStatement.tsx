import { useReveal } from '../../hooks/useReveal'

export function StudioStatement() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="about"
      ref={ref}
      className="mx-auto max-w-2xl px-[var(--space-3)] py-[var(--space-7)] text-center"
    >
      <p
        data-reveal
        className="leading-snug"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-heading)',
          color: 'var(--ink-dim)',
        }}
      >
        Anwar Creative Studio is the digital arm of Anwar Ventures, alongside
        Anwar Capital, Anwar Autowerks, and Anwar Logistics. It designs and
        builds small software products, end to end, then keeps them running.
      </p>
    </section>
  )
}
