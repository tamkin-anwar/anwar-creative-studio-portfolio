import { PageShell } from '../components/PageShell'

export function NotFoundPage() {
  return (
    <PageShell eyebrow="404" backHref="https://tamkin-anwar.github.io/anwar-creative-studio-portfolio/">
      <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
        This page doesn&rsquo;t exist.
      </h1>

      <p style={{ color: 'var(--ink-dim)', fontSize: 'var(--text-body)' }}>
        Might&rsquo;ve been moved, or never existed. Here&rsquo;s the way back.
      </p>
    </PageShell>
  )
}
