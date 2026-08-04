import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 110
const LINK_DISTANCE = 130
const MOUSE_RADIUS = 150
const COLORS = ['#d9a15c', '#7c6fa8']
const HIGHLIGHT = '#f6f1e7'
const RETICLE_COLOR = '#d9a15c'

type Particle = {
  x: number
  y: number
  // constant ambient drift: never damped, only reflects off the edges, so
  // the field keeps moving forever rather than gradually settling to a stop
  vx: number
  vy: number
  // temporary velocity added by the mouse, this is what decays
  ix: number
  iy: number
  r: number
  color: string
  pulseSeed: number
}

/**
 * A network of drifting, softly-linked particles: vanilla Canvas 2D with
 * simple physics, the same proven approach as Doorsong's strands. No WebGL,
 * no material pipeline, nothing that renders differently depending on
 * viewing angle or tone mapping. Every "bug" on the previous crystal and
 * lava lamp hero traced back to physically-based glass materials; this
 * sidesteps that whole category.
 *
 * Near the cursor, particles swirl (a tangential force on top of the usual
 * outward push) and nearby links brighten, so the field reads as a HUD
 * reacting to you rather than just scattering away from you.
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
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999, active: false, opacity: 0, angle: 0 }

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
        pulseSeed: Math.random() * Math.PI * 2,
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
    let frame = 0

    const tick = () => {
      frame++
      ctx.clearRect(0, 0, width, height)

      // smoothly fade the HUD reticle and highlight strength in and out,
      // rather than snapping the instant the pointer enters or leaves
      mouse.opacity += ((mouse.active ? 1 : 0) - mouse.opacity) * 0.08
      if (!reduceMotion) mouse.angle += 0.012

      if (!reduceMotion) {
        for (const p of particles) {
          p.x += p.vx + p.ix
          p.y += p.vy + p.iy

          // only the constant ambient drift reflects off the edges, the
          // mouse impulse is left alone and just decays wherever it is
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1

          if (mouse.active) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const dist = Math.hypot(dx, dy)
            if (dist < MOUSE_RADIUS && dist > 0.01) {
              const proximity = 1 - dist / MOUSE_RADIUS
              const nx = dx / dist
              const ny = dy / dist
              // gentle outward push, so particles don't pile up on the cursor
              const push = proximity * 0.035
              p.ix += nx * push
              p.iy += ny * push
              // tangential swirl around the cursor, the arc-reactor feel
              const swirl = proximity * 0.09
              p.ix += -ny * swirl
              p.iy += nx * swirl
            }
          }

          // decay only the mouse-driven impulse; vx/vy (the ambient drift)
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
          if (dist >= LINK_DISTANCE) continue

          const midX = (a.x + b.x) / 2
          const midY = (a.y + b.y) / 2
          const distToMouse = Math.hypot(midX - mouse.x, midY - mouse.y)
          const near = mouse.opacity > 0.01 ? Math.max(0, 1 - distToMouse / MOUSE_RADIUS) * mouse.opacity : 0
          const baseAlpha = (1 - dist / LINK_DISTANCE) * 0.35

          if (near > 0.12) {
            ctx.strokeStyle = `rgba(217, 161, 92, ${Math.min(baseAlpha + near * 0.5, 0.9)})`
            ctx.lineWidth = 0.6 + near * 1.2
          } else {
            ctx.strokeStyle = `rgba(242, 237, 226, ${baseAlpha})`
            ctx.lineWidth = 0.6
          }
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const p of particles) {
        const distToMouse = mouse.opacity > 0.01 ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : Infinity
        const near = distToMouse < MOUSE_RADIUS ? (1 - distToMouse / MOUSE_RADIUS) * mouse.opacity : 0
        const pulse = reduceMotion ? 1 : Math.sin(frame * 0.03 + p.pulseSeed) * 0.15 + 0.85
        const coreR = p.r * (1 + near * 1.8) * pulse

        // soft outer bloom, a cheap stand-in for real glow without WebGL
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.1 + near * 0.18
        ctx.arc(p.x, p.y, coreR * 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        ctx.beginPath()
        ctx.fillStyle = near > 0.45 ? HIGHLIGHT : p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6 + near * 12
        ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      if (mouse.opacity > 0.01) {
        ctx.save()
        ctx.translate(mouse.x, mouse.y)
        ctx.globalAlpha = mouse.opacity * 0.55
        ctx.strokeStyle = RETICLE_COLOR
        ctx.lineWidth = 1

        ctx.rotate(mouse.angle)
        const ringR = 26
        for (let s = 0; s < 4; s++) {
          const start = (s / 4) * Math.PI * 2
          ctx.beginPath()
          ctx.arc(0, 0, ringR, start, start + Math.PI * 2 * 0.18)
          ctx.stroke()
        }

        ctx.rotate(-mouse.angle * 2)
        ctx.beginPath()
        ctx.moveTo(-4, 0)
        ctx.lineTo(4, 0)
        ctx.moveTo(0, -4)
        ctx.lineTo(0, 4)
        ctx.stroke()
        ctx.restore()
      }

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
