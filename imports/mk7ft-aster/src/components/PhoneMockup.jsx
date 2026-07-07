import { useState, useEffect } from 'react'

const PHONE_BG     = '#0D0A1E'
const PHONE_BORDER = '#2A2445'
const PHONE_MUTED  = '#6B6490'
const ACCENT       = '#8A5CF6'
const ACCENT_SOFT  = 'rgba(138,92,246,0.18)'

const screens = [
  { id: 'cycle',     label: 'Cycle',     src: '/screen1.png', icon: '◑' },
  { id: 'nutrition', label: 'Nutrition', src: '/screen2.png', icon: '◈' },
  { id: 'coach',     label: 'Coach',     src: '/screen3.png', icon: '✦' },
]

export default function PhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActiveScreen(s => (s + 1) % screens.length)
        setFading(false)
      }, 280)
    }, 3400)
    return () => clearInterval(timer)
  }, [])

  const handleTab = (i) => {
    if (i === activeScreen) return
    setFading(true)
    setTimeout(() => {
      setActiveScreen(i)
      setFading(false)
    }, 200)
  }

  return (
    <div style={{ position: 'relative', width: 248, flexShrink: 0 }}>
      {/* Glow behind phone */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(138,92,246,0.16) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Phone shell */}
      <div style={{
        width: 248, height: 512,
        background: PHONE_BG,
        borderRadius: 44,
        border: `1.5px solid ${PHONE_BORDER}`,
        boxShadow: `
          0 52px 100px rgba(0,0,0,0.40),
          0 0 0 1px rgba(138,92,246,0.10) inset,
          0 1px 0 rgba(255,255,255,0.06) inset
        `,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%',
          transform: 'translateX(-50%)',
          width: 88, height: 24,
          background: '#060410',
          borderRadius: 20, zIndex: 10,
        }} />

        {/* Screenshot — fills the phone, cropped to fit */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 43, overflow: 'hidden',
        }}>
          <img
            src={screens[activeScreen].src}
            alt={screens[activeScreen].label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.28s ease',
            }}
          />
        </div>

        {/* Bottom tab bar overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-around',
          padding: '10px 16px 20px',
          background: 'linear-gradient(to top, rgba(10,7,28,0.92) 0%, rgba(10,7,28,0.7) 60%, transparent 100%)',
          zIndex: 5,
        }}>
          {screens.map((s, i) => (
            <button key={s.id} onClick={() => handleTab(i)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: 0,
            }}>
              <div style={{
                width: 32, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 10,
                background: activeScreen === i ? ACCENT_SOFT : 'transparent',
                transition: 'background 0.2s',
              }}>
                <span style={{
                  fontSize: 13,
                  color: activeScreen === i ? ACCENT : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.2s',
                }}>
                  {s.icon}
                </span>
              </div>
              <span style={{
                fontSize: 7, fontFamily: 'Inter, sans-serif',
                fontWeight: 500, letterSpacing: '0.04em',
                color: activeScreen === i ? ACCENT : 'rgba(255,255,255,0.35)',
                transition: 'color 0.2s',
              }}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Screen indicator dots */}
        <div style={{
          position: 'absolute', top: 46, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: 5, zIndex: 6,
        }}>
          {screens.map((_, i) => (
            <div key={i} style={{
              width: activeScreen === i ? 16 : 5,
              height: 5, borderRadius: 100,
              background: activeScreen === i ? ACCENT : 'rgba(255,255,255,0.25)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
