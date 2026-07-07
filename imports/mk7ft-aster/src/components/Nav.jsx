import { useState, useEffect } from 'react'
import { useTheme } from '../ThemeContext'
import { useWindowSize } from '../hooks/useWindowSize'
import Logo from './Logo'

export default function Nav() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'background 0.4s ease, border-color 0.4s ease',
      background: scrolled ? 'rgba(13,8,12,0.90)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: isMobile ? '0 20px' : '0 32px',
        height: isMobile ? 56 : 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo size={26} white wordmarkColor={t.negativeText} />
        </a>

        <a href="#waitlist" style={{
          background: scrolled ? t.accent : 'rgba(255,255,255,0.08)',
          color: '#fff',
          border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.18)',
          fontSize: 13, fontWeight: 600,
          padding: isMobile ? '8px 16px' : '10px 22px',
          borderRadius: 100, textDecoration: 'none', letterSpacing: '0.01em',
          transition: 'background 0.4s ease, border-color 0.4s ease, opacity 0.2s, transform 0.15s',
          minHeight: 40, display: 'flex', alignItems: 'center',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity='0.78'; e.currentTarget.style.transform='scale(1.03)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='scale(1)'    }}
        >Get early access</a>
      </div>
    </header>
  )
}
