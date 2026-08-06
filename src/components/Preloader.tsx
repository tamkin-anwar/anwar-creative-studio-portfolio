import { useEffect, useRef, useState } from 'react'

const MIN_VISIBLE_MS = 900
// There's no real loading-manager progress to follow (no textures, no
// models, nothing queued): the counter is purely this simulated ease, timed
// to feel like it's tracking something rather than just a fixed delay.
const SIM_DURATION_MS = 1200

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [display, setDisplay] = useState(0)
  const [exiting, setExiting] = useState(false)
  const startRef = useRef(performance.now())

  useEffect(() => {
    let raf: number
    const tick = () => {
      const elapsed = performance.now() - startRef.current
      const target = easeOutExpo(Math.min(1, elapsed / SIM_DURATION_MS)) * 100

      setDisplay((d) => {
        const diff = target - d
        return Math.abs(diff) < 0.3 ? target : d + diff * 0.2
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (display < 100) return
    const elapsed = performance.now() - startRef.current
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed)
    const t = setTimeout(() => setExiting(true), wait)
    return () => clearTimeout(t)
  }, [display])

  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(onComplete, 500)
    return () => clearTimeout(t)
  }, [exiting, onComplete])

  const pct = Math.min(100, Math.round(display))

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)] transition-opacity ${
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: '500ms', transitionTimingFunction: 'var(--ease-out-expo)' }}
      aria-hidden={exiting}
    >
      <div className="flex flex-col items-center gap-[var(--space-2)]">
        <span className="font-mono text-[var(--text-label)] tracking-[0.12em] text-[var(--ink)]">
          {pct.toString().padStart(3, '0')}%
        </span>
        <div className="h-px w-40 overflow-hidden bg-[var(--line)]">
          <div
            className="h-full bg-[var(--accent-warm)]"
            style={{ width: `${pct}%`, transition: 'width 0.2s var(--ease-out-expo)' }}
          />
        </div>
      </div>
      <div
        className="mt-[var(--space-5)] font-mono text-[var(--text-caption)] tracking-[0.14em] text-[var(--ink-faint)] transition-opacity"
        style={{ opacity: pct > 60 ? 1 : 0, transitionDuration: '700ms' }}
      >
        ANWAR CREATIVE STUDIO
      </div>
    </div>
  )
}
