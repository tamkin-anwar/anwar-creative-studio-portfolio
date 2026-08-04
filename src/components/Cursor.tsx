import { useEffect, useRef, useState } from 'react'

const MAGNETIC_RADIUS = 90
const MAGNETIC_STRENGTH = 0.35
const CURSOR_LERP = 0.18

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      let isHovering = false
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
          isHovering = true
        } else {
          el.style.transform = ''
        }
      }
      hovering.current = isHovering
    }

    window.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * CURSOR_LERP
      pos.current.y += (target.current.y - pos.current.y) * CURSOR_LERP
      if (dotRef.current) {
        const scale = hovering.current ? 1.8 : 1
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${scale})`
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

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] h-3 w-3 rounded-full bg-[var(--accent-warm)] mix-blend-difference"
      style={{ transition: 'transform 0.15s var(--ease-out-expo)' }}
    />
  )
}
