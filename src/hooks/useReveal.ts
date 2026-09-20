import { useEffect, useRef } from 'react'

/** Reveal each item independently, including items taller than the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = [
      ...(root.hasAttribute('data-reveal') ? [root] : []),
      ...root.querySelectorAll<HTMLElement>('[data-reveal]'),
    ]
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reveal = (element: HTMLElement) => {
      element.setAttribute('data-revealed', 'true')
      element.removeAttribute('data-reveal-pending')
    }
    if (motion.matches || !('IntersectionObserver' in window)) {
      targets.forEach(reveal)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target as HTMLElement)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0 })
    targets.forEach((element) => {
      element.setAttribute('data-reveal-pending', 'true')
      observer.observe(element)
    })
    const revealAll = () => {
      if (motion.matches) {
        targets.forEach(reveal)
        observer.disconnect()
      }
    }
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      const target = event.target.closest<HTMLElement>('[data-reveal]')
      if (target && root.contains(target)) reveal(target)
    }
    motion.addEventListener('change', revealAll)
    root.addEventListener('focusin', onFocus)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', revealAll)
      root.removeEventListener('focusin', onFocus)
      targets.forEach(reveal)
    }
  }, [])
  return ref
}
