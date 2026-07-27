import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    ...size,
    isMobile: size.w < 768,
    isTablet: size.w >= 768 && size.w < 1024,
    isDesktop: size.w >= 1024,
  }
}
