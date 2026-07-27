import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'
import { useWindowSize } from '../hooks/useWindowSize'
import { useScrollParallax } from '../hooks/useScrollParallax'

function useStaggerMount(count, delayBase = 80) {
  const [visible, setVisible] = useState([])
  useEffect(() => {
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => setVisible(v => [...v, i]), 140 + i * delayBase)
    )
    return () => timers.forEach(clearTimeout)
  }, [])
  return (i) => visible.includes(i)
}

function AppStoreBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 12, padding: '10px 16px',
      cursor: 'pointer',
    }}>
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <path d="M15.18 11.7c-.02-2.52 2.06-3.74 2.15-3.8-1.17-1.71-2.99-1.94-3.64-1.97-1.55-.16-3.03.92-3.82.92-.79 0-2.01-.9-3.3-.87-1.69.02-3.26.99-4.13 2.51C.55 11.37 1.83 16.2 3.7 18.84c.93 1.34 2.03 2.84 3.47 2.78 1.4-.06 1.92-.89 3.61-.89 1.69 0 2.17.89 3.63.86 1.5-.02 2.45-1.35 3.36-2.7 1.07-1.54 1.5-3.05 1.52-3.13-.03-.01-2.91-1.11-2.93-4.06z" fill="white"/>
        <path d="M12.69 3.83C13.44 2.92 13.94 1.65 13.79.36c-1.12.05-2.49.75-3.29 1.68-.72.82-1.35 2.13-1.18 3.38 1.25.1 2.51-.63 3.37-1.59z" fill="white"/>
      </svg>
      <div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', lineHeight: 1, marginBottom: 2 }}>Download on the</div>
        <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1 }}>App Store</div>
      </div>
    </div>
  )
}

function StaticPhone({ visible }) {
  return (
    <div style={{
      position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
    }}>
      {/* Glow behind */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 380, height: 540, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(212,122,142,0.28) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Phone frame */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: 270, height: 560,
        borderRadius: 48,
        border: '1.5px solid rgba(255,255,255,0.10)',
        boxShadow: `
          0 48px 100px rgba(0,0,0,0.55),
          0 0 0 1px rgba(212,122,142,0.12) inset,
          0 1px 0 rgba(255,255,255,0.08) inset
        `,
        overflow: 'hidden',
        background: '#0a0618',
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%',
          transform: 'translateX(-50%)',
          width: 80, height: 22,
          background: '#000',
          borderRadius: 20, zIndex: 10,
        }} />

        {/* Placeholder — replace with real screenshot */}
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(160deg, #1A1118 0%, #120A10 60%, #1A1118 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(212,122,142,0.18)',
            border: '1px solid rgba(212,122,142,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="/logo-white.png" alt="aster" width={22} height={22} style={{ opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { theme: t } = useTheme()
  const { isMobile, isTablet, isDesktop } = useWindowSize()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const isVisible = useStaggerMount(6, 95)
  const glowRef = useRef(null)
  const parallaxRef = useScrollParallax(0.12)
  const narrow = isMobile || isTablet

  useEffect(() => {
    if (isMobile) return
    const move = (e) => {
      if (!glowRef.current) return
      const x = (e.clientX / window.innerWidth  - 0.5) * 28
      const y = (e.clientY / window.innerHeight - 0.5) * 18
      glowRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [isMobile])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section style={{
      minHeight: '100svh',
      display: 'flex', alignItems: 'center',
      padding: narrow ? '88px 24px 56px' : '80px 32px 56px',
      position: 'relative', overflow: 'hidden',
      background: t.negative,
    }}>
      {/* Ambient glow layers — top one parallax-scrolls slowly */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <div ref={parallaxRef} style={{
          position: 'absolute', top: '-15%', right: narrow ? '-30%' : '0%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(212,122,142,0.22) 0%, transparent 65%)',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-15%',
          width: 460, height: 460, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(212,122,142,0.10) 0%, transparent 65%)',
        }} />
      </div>

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      <div style={{
        maxWidth: 1080, margin: '0 auto', width: '100%', position: 'relative',
        display: 'grid',
        gridTemplateColumns: narrow ? '1fr' : '1fr 1fr',
        gap: narrow ? 48 : 64,
        alignItems: 'center',
      }}>
        {/* Left — copy */}
        <div>
          {/* Stars */}
          <div style={{
            opacity: isVisible(0) ? 1 : 0,
            transform: isVisible(0) ? 'none' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: 26, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1l1.55 3.14L12 4.63l-2.5 2.44.59 3.43L7 8.77l-3.09 1.73L4.5 7.07 2 4.63l3.45-.49L7 1z" fill="#F5C842"/>
                </svg>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
              4.9 · 12,000+ on waitlist
            </span>
          </div>

          {/* Headline */}
          <div style={{
            opacity: isVisible(1) ? 1 : 0,
            transform: isVisible(1) ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <h1 style={{
              fontFamily: t.headingFont,
              fontSize: narrow ? 'clamp(38px, 10vw, 60px)' : 'clamp(44px, 5.2vw, 66px)',
              fontWeight: 400, color: '#FFFFFF',
              lineHeight: 1.03, letterSpacing: '-0.03em',
              marginBottom: 20,
            }}>
              Health, fitness,<br />
              nutrition,<br />
              <em style={{ color: t.accent }}>one body.</em>
            </h1>
          </div>

          {/* Sub */}
          <div style={{
            opacity: isVisible(2) ? 1 : 0,
            transform: isVisible(2) ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <p style={{
              fontSize: narrow ? 16 : 17,
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 300, lineHeight: 1.75,
              marginBottom: 28, maxWidth: 420,
            }}>
              Your hormones don't live in one app. Neither should your health.
            </p>
          </div>

          {/* CTA */}
          <div id="waitlist" style={{
            opacity: isVisible(3) ? 1 : 0,
            transform: isVisible(3) ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            marginBottom: 20,
          }}>
            {submitted ? (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                background: 'rgba(212,122,142,0.14)',
                border: '1px solid rgba(212,122,142,0.28)',
                borderRadius: 14, padding: '16px 24px',
              }}>
                <span style={{ fontSize: 18, color: t.accent }}>✓</span>
                <div>
                  <p style={{ fontSize: 14, color: '#fff', fontWeight: 600, margin: 0 }}>You're in.</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '3px 0 0' }}>We'll ping you when Aster launches.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                display: 'flex', gap: 8,
                flexDirection: narrow ? 'column' : 'row',
                maxWidth: 420,
              }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.10)',
                    borderRadius: 100,
                    padding: '15px 22px', fontSize: 14, color: '#fff',
                    outline: 'none',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'border-color 0.2s',
                    width: narrow ? '100%' : 'auto',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(212,122,142,0.55)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}
                />
                <button type="submit" style={{
                  background: t.accent, color: '#fff',
                  border: 'none', borderRadius: 100,
                  padding: '15px 26px', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.01em',
                  transition: 'opacity 0.2s, transform 0.15s',
                  width: narrow ? '100%' : 'auto',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; e.currentTarget.style.transform='scale(1.02)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='scale(1)'    }}
                >Get early access →</button>
              </form>
            )}
          </div>

          {/* App Store + note */}
          <div style={{
            opacity: isVisible(4) ? 1 : 0,
            transform: isVisible(4) ? 'none' : 'translateY(14px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
            marginBottom: 32,
          }}>
            <AppStoreBadge />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Free forever plan · No credit card</span>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: narrow ? 28 : 40,
            paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)',
            opacity: isVisible(5) ? 1 : 0,
            transform: isVisible(5) ? 'none' : 'translateY(14px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            {[
              { n: '12K+', label: 'on waitlist'   },
              { n: '4.9★', label: 'beta rating'   },
              { n: '10+',  label: 'apps replaced'  },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: t.headingFont,
                  fontSize: narrow ? 22 : 26,
                  color: '#fff', letterSpacing: '-0.02em', lineHeight: 1,
                }}>{s.n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone — single static image, desktop only */}
        {isDesktop && (
          <div className="phone-float" style={{ display: 'flex', justifyContent: 'center' }}>
            <StaticPhone visible={isVisible(5)} />
          </div>
        )}
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: isVisible(5) ? 0.35 : 0,
        transition: 'opacity 1s ease 1.2s',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', fontWeight: 600 }}>SCROLL</span>
        <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${t.accent}, transparent)` }} />
      </div>
    </section>
  )
}
