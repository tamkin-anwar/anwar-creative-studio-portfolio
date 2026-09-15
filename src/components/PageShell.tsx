import type { ReactNode } from 'react'
import { AmbientField } from './scene/AmbientField'

export function PageShell({
  eyebrow,
  backHref = '../',
  children,
}: {
  eyebrow: string
  backHref?: string
  children: ReactNode
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AmbientField />
      <main
        id="main-content"
        className="relative mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center gap-[var(--space-4)] px-[var(--space-3)] py-[var(--space-7)]"
      >
        <a
          href={backHref}
          className="font-mono inline-flex w-fit items-center gap-[var(--space-1)] tracking-[0.06em]"
          style={{ fontSize: 'var(--text-label)', color: 'var(--ink-faint)' }}
        >
          ← Anwar Creative Studio
        </a>
        <p className="eyebrow">{eyebrow}</p>
        {children}
      </main>
    </>
  )
}
