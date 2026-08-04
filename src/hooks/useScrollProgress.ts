import { useEffect, useState, type RefObject } from 'react'

/** 0 at the top of the viewport, 1 once `ref`'s own height has scrolled past. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const measure = () => {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        setProgress(Math.min(1, Math.max(0, -rect.top / rect.height)))
      }
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])

  return progress
}
