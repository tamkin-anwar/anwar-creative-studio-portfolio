import { useEffect, useRef } from 'react'

const COUNT = 170
const COLORS: { color: string; weight: number; opacity: number; r: [number, number] }[] = [
  { color: '217, 161, 92', weight: 100, opacity: 0.35, r: [0.6, 1.5] },
  { color: '124, 111, 168', weight: 70, opacity: 0.28, r: [0.6, 1.3] },
]

type Sparkle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  opacity: number
  pulseSeed: number
}

/**
 * A sitewide starfield, sat permanently behind every section. This used to
 * be a react-three-fiber Canvas (drei's <Sparkles>), which meant the whole
 * three.js stack shipped just for a static-looking twinkle field, and a
 * WebGL context stayed alive for the entire time the tab was open. On iOS
 * Safari in particular that's real risk: the platform shares GPU/CPU memory,
 * and an idle WebGL context left running can push a tab into a background
 * reload under memory pressure. Vanilla Canvas 2D, the same approach already
 * proven on the hero, does the identical visual job for a fraction of the
 * bundle and none of the persistent GPU context.
 */
export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let sparkles: Sparkle[] = []

    const makeSparkles = () => {
      sparkles = []
      for (const group of COLORS) {
        for (let i = 0; i < (COUNT * group.weight) / 170; i++) {
          sparkles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.03,
            vy: (Math.random() - 0.5) * 0.03,
            r: group.r[0] + Math.random() * (group.r[1] - group.r[0]),
            color: group.color,
            opacity: group.opacity,
            pulseSeed: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeSparkles()
    })
    resizeObserver.observe(document.documentElement)

    let raf = 0
    let frame = 0
    let running = true

    const tick = () => {
      if (!running) return
      frame++
      ctx.clearRect(0, 0, width, height)

      for (const s of sparkles) {
        if (!reduceMotion) {
          s.x += s.vx
          s.y += s.vy
          if (s.x < 0 || s.x > width) s.vx *= -1
          if (s.y < 0 || s.y > height) s.vy *= -1
        }
        const twinkle = reduceMotion ? 1 : Math.sin(frame * 0.01 + s.pulseSeed) * 0.4 + 0.6
        ctx.beginPath()
        ctx.fillStyle = `rgba(${s.color}, ${s.opacity * twinkle})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    // pause entirely while the tab is backgrounded, rather than let a
    // full-page animation keep spending battery a user can't see
    const onVisibility = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(tick)
      else cancelAnimationFrame(raf)
    }
    document.addEventListener('visibilitychange', onVisibility)

    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 h-full w-full"
    />
  )
}
