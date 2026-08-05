import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 110
const LINK_DISTANCE = 130
const MOUSE_RADIUS = 150
const COLORS = ['#d9a15c', '#7c6fa8']
const HIGHLIGHT = '#f6f1e7'
// keeps every particle's position (and its widest possible bloom halo, well
// under this) inside a safe interior box, so no glow ever reaches the
// canvas's own raster edge in the first place: a CSS mask can only fade
// pixels that were drawn, it can't recover a bloom that got clipped because
// the particle itself was too close to the boundary
const EDGE_MARGIN = 32

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
    const mouse = { x: -9999, y: -9999, active: false, opacity: 0 }

    let hasSized = false

    // clamp the margin so it never eats more than a third of a very small
    // canvas, while still keeping particles well clear of the edge normally
    const marginX = () => Math.min(EDGE_MARGIN, width / 3)
    const marginY = () => Math.min(EDGE_MARGIN, height / 3)

    const makeParticles = () => {
      const mx = marginX()
      const my = marginY()
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: mx + Math.random() * Math.max(0, width - mx * 2),
        y: my + Math.random() * Math.max(0, height - my * 2),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        ix: 0,
        iy: 0,
        r: 1 + Math.random() * 1.6,
        color: COLORS[Math.random() < 0.65 ? 0 : 1],
        pulseSeed: Math.random() * Math.PI * 2,
      }))
    }

    // resize whenever the canvas's own box size changes, not just on window
    // resize: on first mount the flex layout (and webfont-driven reflow) can
    // settle after this effect runs, so a window-resize-only listener would
    // miss it and leave particles seeded into a stale, near-zero-size rect
    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!hasSized) {
        makeParticles()
        hasSized = true
      }
    })
    resizeObserver.observe(canvas)

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onPointerLeave = () => {
      mouse.active = false
    }

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    let raf: number
    let frame = 0

    const tick = () => {
      frame++
      ctx.clearRect(0, 0, width, height)

      // smoothly fade the near-cursor highlight in and out, rather than
      // snapping the instant the pointer enters or leaves
      mouse.opacity += ((mouse.active ? 1 : 0) - mouse.opacity) * 0.08

      if (!reduceMotion) {
        const mx = marginX()
        const my = marginY()
        for (const p of particles) {
          p.x += p.vx + p.ix
          p.y += p.vy + p.iy

          // only the constant ambient drift reflects off the edges, the
          // mouse impulse is left alone and just decays wherever it is;
          // bounce at the inset margin, not the raw canvas bounds, so
          // particles (and their bloom) never reach the true edge
          if (p.x < mx || p.x > width - mx) p.vx *= -1
          if (p.y < my || p.y > height - my) p.vy *= -1

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

          // hard-clamp position too: the mouse-driven swirl/push above isn't
          // covered by the wall-bounce check, so without this a particle
          // pushed by the cursor near the edge could still cross the margin
          p.x = Math.min(Math.max(p.x, mx), width - mx)
          p.y = Math.min(Math.max(p.y, my), height - my)
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

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" />
}
