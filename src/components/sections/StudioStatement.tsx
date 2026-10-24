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
        Two apps lead the studio. Corres opens on the emails that ask something of you. Artha opens on
        what you can safely spend today. We&rsquo;re self-funded, so the only people we answer to are the
        ones who use what we make.
      </p>
      <a
        data-reveal
        href={`${import.meta.env.BASE_URL}about/`}
        className="font-mono relative z-10 mt-[var(--space-4)] inline-block tracking-[0.06em]"
        style={{ fontSize: 'var(--text-label)', color: 'var(--accent-warm)' }}
      >
        About the studio →
      </a>
    </section>
  )
}
