import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'Studio' },
  { id: 'work', label: 'Work' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'contact', label: 'Contact' },
]

export function ScrollProgressRail() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    )
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = els.indexOf(entry.target as HTMLElement)
          if (idx !== -1) setActive(idx)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed right-[var(--space-4)] top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto relative flex flex-col items-center gap-[var(--space-3)]">
        <div
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
          style={{ background: 'var(--line)' }}
        />
        {SECTIONS.map((s, i) => (
          <li key={s.id} className="relative z-10">
            <a
              href={`#${s.id}`}
              data-magnetic
              aria-label={s.label}
              className="block rounded-full transition-all"
              style={{
                width: i === active ? 9 : 6,
                height: i === active ? 9 : 6,
                background: i === active ? 'var(--accent-warm)' : 'var(--bg)',
                border: `1px solid ${i === active ? 'var(--accent-warm)' : 'var(--line-strong)'}`,
                transitionDuration: '300ms',
                transitionTimingFunction: 'var(--ease-out-expo)',
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
