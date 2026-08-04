import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 70
const LINK_DISTANCE = 110
const MOUSE_RADIUS = 90
const COLORS = ['#d9a15c', '#7c6fa8']

type Particle = {
  x: number
  y: number
  // constant ambient drift — never damped, only reflects off the edges, so
  // the field keeps moving forever rather than gradually settling to a stop
  vx: number
  vy: number
  // temporary velocity added by the mouse — this is what decays
  ix: number
  iy: number
  r: number
  color: string
}

/**
 * A network of drifting, softly-linked particles — vanilla Canvas 2D with
 * simple physics, the same proven approach as Doorsong's strands. No WebGL,
 * no material pipeline, nothing that renders differently depending on
 * viewing angle or tone mapping. Every "bug" on the previous crystal and
 * lava lamp hero traced back to physically-based glass materials; this
 * sidesteps that whole category.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const makeParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        ix: 0,
        iy: 0,
        r: 1 + Math.random() * 1.6,
        color: COLORS[Math.random() < 0.65 ? 0 : 1],
      }))
    }

    resize()
    makeParticles()

    const onResize = () => {
      resize()
    }
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onPointerLeave = () => {
      mouse.active = false
    }

    window.addEventListener('resize', onResize)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    let raf: number

    const tick = () => {
      ctx.clearRect(0, 0, width, height)

      if (!reduceMotion) {
        for (const p of particles) {
          p.x += p.vx + p.ix
          p.y += p.vy + p.iy

          // only the constant ambient drift reflects off the edges — the
          // mouse impulse is left alone and just decays wherever it is
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1

          if (mouse.active) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const dist = Math.hypot(dx, dy)
            if (dist < MOUSE_RADIUS && dist > 0.01) {
              const force = (1 - dist / MOUSE_RADIUS) * 0.05
              p.ix += (dx / dist) * force
              p.iy += (dy / dist) * force
            }
          }

          // decay only the mouse-driven impulse — vx/vy (the ambient drift)
          // is never damped, so the field keeps drifting indefinitely
          p.ix *= 0.94
          p.iy *= 0.94
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(242, 237, 226, ${(1 - dist / LINK_DISTANCE) * 0.35})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" />
}
