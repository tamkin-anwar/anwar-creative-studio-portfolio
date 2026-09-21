import { useEffect, useState, type RefObject } from 'react'

/** Whether an element is meaningfully in view, for scroll-triggered ambient
 * motion. Separate from the fade-in reveal: this is the "is this card alive
 * right now" flag each product's own animation reads. */
export function useScrollActive<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '-8% 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return [active, setActive] as const
}
