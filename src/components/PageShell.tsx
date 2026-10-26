import type { ReactNode } from 'react'
import { CommandPalette } from './CommandPalette'
import { SiteHeader } from './SiteHeader'
import { Footer } from './sections/Footer'

export function PageShell({
  eyebrow,
  children,
}: {
  eyebrow: string
  children: ReactNode
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <CommandPalette />
      <main
        id="main-content"
        className="page relative mx-auto flex min-h-[70svh] max-w-2xl flex-col gap-[var(--space-4)] px-[var(--space-3)] pb-[var(--space-6)] pt-[var(--space-7)]"
      >
        <p className="eyebrow">{eyebrow}</p>
        {children}
      </main>
      <Footer />
    </>
  )
}
