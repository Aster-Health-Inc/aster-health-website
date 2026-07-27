import { useEffect, useRef, useState } from 'react'
import { ThemeProvider, useTheme } from './ThemeContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Cycle from './components/Logos'
import Works from './components/Works'
import Community from './components/Community'
import Footer from './components/Footer'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const { theme: t } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress" style={{
      width: `${progress * 100}%`,
      background: `linear-gradient(to right, ${t.accent}, #EDA5B3)`,
      transition: 'width 0.05s linear',
    }} />
  )
}

function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return
      glowRef.current.style.left = `${e.clientX}px`
      glowRef.current.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div ref={glowRef} className="cursor-glow" />
}

function AppInner() {
  const { theme: t } = useTheme()
  return (
    <div style={{ minHeight: '100vh', background: t.bg, position: 'relative' }}>
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Cycle />
        <Works />
        <Community />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}