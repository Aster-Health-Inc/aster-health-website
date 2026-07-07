import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const startVal = 0

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(startVal + (target - startVal) * eased)
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, start])

  return value
}
