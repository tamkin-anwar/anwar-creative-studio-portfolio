import type { ReactNode } from 'react'
import { LazyAmbientField } from './LazyAmbientField'
import { CommandPalette } from './CommandPalette'
import { SiteHeader } from './SiteHeader'
import { Footer } from './sections/Footer'

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
      <LazyAmbientField />
      <SiteHeader />
      <CommandPalette />
      <main
        id="main-content"
        className="relative mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center gap-[var(--space-4)] px-[var(--space-3)] pb-[var(--space-7)] pt-[calc(var(--space-7)+48px)]"
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
      <Footer />
    </>
  )
}
