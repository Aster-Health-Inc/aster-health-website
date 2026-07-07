import { useEffect, useRef } from 'react'

/**
 * Lightweight parallax: moves the element at `speed` fraction of scroll position.
 * speed = 0.1 means 10% of scroll offset — very subtle.
 * Returns a ref to attach to the element.
 */
export function useScrollParallax(speed = 0.08) {
  const ref = useRef(null)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (ref.current) {
          const y = window.scrollY * speed
          ref.current.style.transform = `translateY(${y}px)`
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
