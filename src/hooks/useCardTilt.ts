import { useRef, type MouseEvent } from 'react'

const TILT_MAX_DEG = 7

/** Cursor-tracking 3D tilt and a glow that follows the pointer. Shared by
 * project cards and flagship cards so both feel like the same craft, not
 * just similar layouts at different sizes. */
export function useCardTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = (e: MouseEvent<T>) => {
    const card = ref.current
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * TILT_MAX_DEG
    const ry = (px - 0.5) * TILT_MAX_DEG

    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
    card.style.setProperty('--glow-x', `${px * 100}%`)
    card.style.setProperty('--glow-y', `${py * 100}%`)
    card.style.setProperty('--glow-opacity', '1')
  }

  const onMouseLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    card.style.setProperty('--glow-opacity', '0')
  }

  return { ref, onMouseMove, onMouseLeave }
}
