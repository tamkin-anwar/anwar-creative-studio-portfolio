import { useEffect, useRef } from 'react'

const STAGGER_MS = 70

/** Attach to a section root. Fades in that root (if tagged data-reveal)
 * plus any descendant [data-reveal] elements, staggered, once the
 * section first enters the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.hasAttribute('data-reveal')
      ? [root, ...root.querySelectorAll<HTMLElement>('[data-reveal]')]
      : Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (targets.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.setAttribute('data-revealed', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          targets.forEach((el, i) => {
            el.style.transitionDelay = `${i * STAGGER_MS}ms`
            el.setAttribute('data-revealed', 'true')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(root)

    return () => observer.disconnect()
  }, [])

  return ref
}
