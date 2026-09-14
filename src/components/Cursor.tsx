import { useEffect, useRef, useState } from 'react'

const MAGNETIC_RADIUS = 90
const MAGNETIC_STRENGTH = 0.35
const CURSOR_LERP = 0.4

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const activeLabel = useRef<string | null>(null)

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      // '' means "hovering a magnetic target with no cursor label" (e.g. the
      // section-nav dots): show the plain scaled-up dot. A real string shows
      // the labeled pill instead. null means not hovering anything.
      let nextLabel: string | null = null
      for (const el of document.querySelectorAll<HTMLElement>('[data-magnetic]')) {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)
        if (dist < MAGNETIC_RADIUS) {
          const pull = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH
          el.style.transform = `translate(${-dx * pull}px, ${-dy * pull}px)`
          nextLabel = el.dataset.cursor ?? ''
        } else {
          el.style.transform = ''
        }
      }
      if (nextLabel !== activeLabel.current) {
        activeLabel.current = nextLabel
        setLabel(nextLabel)
      }
    }

    window.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * CURSOR_LERP
      pos.current.y += (target.current.y - pos.current.y) * CURSOR_LERP
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document
        .querySelectorAll<HTMLElement>('[data-magnetic]')
        .forEach((el) => (el.style.transform = ''))
    }
  }, [enabled])

  if (!enabled) return null

  const hasPill = !!label
  const plainHover = label === ''

  return (
    <div ref={wrapRef} className="pointer-events-none fixed left-0 top-0 z-[60]">
      <div
        aria-hidden
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: 12,
          height: 12,
          transform: `translate(-50%, -50%) scale(${plainHover ? 1.8 : 1})`,
          background: 'var(--accent-warm)',
          boxShadow: '0 0 0 1px rgba(10,10,13,0.4), 0 0 12px rgba(217,161,92,0.7)',
          opacity: hasPill ? 0 : 1,
          transition: 'transform 0.25s var(--ease-out-expo), opacity 0.2s ease',
        }}
      />
      <div
        aria-hidden
        className="font-mono absolute left-0 top-0 whitespace-nowrap rounded-full uppercase"
        style={{
          transform: `translate(-50%, -50%) scale(${hasPill ? 1 : 0.5})`,
          opacity: hasPill ? 1 : 0,
          padding: '6px 14px',
          fontSize: 'var(--text-label)',
          letterSpacing: '0.08em',
          background: 'var(--accent-warm)',
          color: 'var(--bg)',
          transition: 'transform 0.25s var(--ease-out-expo), opacity 0.2s ease',
        }}
      >
        {label}
      </div>
    </div>
  )
}
