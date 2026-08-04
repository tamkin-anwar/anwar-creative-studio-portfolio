import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'

const MIN_VISIBLE_MS = 900
// Real three.js loading progress only ever fires if something is actually
// queued in the loading manager. The sitewide sparkle field has no textures
// to fetch, so most of the time nothing loads at all: this simulated ramp is
// what the counter follows in that case. If a future asset (a texture, a
// model) does take a while, real progress below the simulated curve takes
// over instead, so the preloader still waits for it.
const SIM_DURATION_MS = 1200

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const { progress, active } = useProgress()
  const [display, setDisplay] = useState(0)
  const [exiting, setExiting] = useState(false)
  const startRef = useRef(performance.now())
  const progressRef = useRef(0)
  const hasRealLoad = useRef(false)

  useEffect(() => {
    progressRef.current = progress
    if (active) hasRealLoad.current = true
  }, [progress, active])

  useEffect(() => {
    let raf: number
    const tick = () => {
      const elapsed = performance.now() - startRef.current
      const simulated = easeOutExpo(Math.min(1, elapsed / SIM_DURATION_MS)) * 100
      const target = hasRealLoad.current ? Math.min(simulated, progressRef.current) : simulated

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
