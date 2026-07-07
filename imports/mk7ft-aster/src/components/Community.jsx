import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const reviews = [
  {
    quote: `"I used Flo for four years. Aster taught me more in one month."`,
    name: 'Maya L.',
    from: 'Switched from Flo',
  },
  {
    quote: `"Cal AI told me my macros. Aster told me why I needed them. Game changer."`,
    name: 'Priya K.',
    from: 'Former Cal AI user',
  },
  {
    quote: `"I didn't think a health app could actually feel like it gets me. Aster does."`,
    name: 'Zara M.',
    from: 'Beta tester',
  },
]

const freeValue = [
  { icon: '◑', label: 'Cycle tracking', detail: 'Predict your period, ovulation and phases' },
  { icon: '◈', label: 'Nutrition log',  detail: 'Log meals and see how food affects your cycle' },
  { icon: '↗', label: 'Movement sync',  detail: 'Connect your workouts and track readiness' },
  { icon: '✦', label: 'AI coach',       detail: 'Ask anything, get answers that know your body' },
]

const proValue = [
  'AI food scanning: point and log in seconds',
  'Phase-aware training and recovery plans',
  'Deep sleep and HRV analysis',
  'Unlimited history and pattern insights',
  'Apple Health, Garmin, WHOOP and more',
  'Priority support',
]

function AppStoreBadge({ t }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: 14, padding: '12px 20px',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
    onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
    >
      <svg width="20" height="24" viewBox="0 0 18 22" fill="none">
        <path d="M15.18 11.7c-.02-2.52 2.06-3.74 2.15-3.8-1.17-1.71-2.99-1.94-3.64-1.97-1.55-.16-3.03.92-3.82.92-.79 0-2.01-.9-3.3-.87-1.69.02-3.26.99-4.13 2.51C.55 11.37 1.83 16.2 3.7 18.84c.93 1.34 2.03 2.84 3.47 2.78 1.4-.06 1.92-.89 3.61-.89 1.69 0 2.17.89 3.63.86 1.5-.02 2.45-1.35 3.36-2.7 1.07-1.54 1.5-3.05 1.52-3.13-.03-.01-2.91-1.11-2.93-4.06z" fill="white"/>
        <path d="M12.69 3.83C13.44 2.92 13.94 1.65 13.79.36c-1.12.05-2.49.75-3.29 1.68-.72.82-1.35 2.13-1.18 3.38 1.25.1 2.51-.63 3.37-1.59z" fill="white"/>
      </svg>
      <div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', lineHeight: 1, marginBottom: 2 }}>Download on the</div>
        <div style={{ fontSize: 14, color: '#fff', fontWeight: 700, lineHeight: 1 }}>App Store</div>
      </div>
    </div>
  )
}

export default function Community() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [headRef, headInView] = useInView()
  const [freeRef, freeInView] = useInView()
  const [proRef, proInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  return (
    <>
      {/* Testimonials + Pricing combined section */}
      <section id="community" style={{
        background: t.bg,
        borderTop: `1px solid ${t.border}`,
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>

          {/* Reviews strip */}
          <div ref={headRef} style={{
            padding: isMobile ? '88px 24px 0' : '112px 32px 0',
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <p style={{ fontSize: 11, color: t.accent, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 24, opacity: 0.65 }}>REAL PEOPLE</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? 20 : 24,
            }}>
              {reviews.map((r, i) => (
                <div key={i} style={{
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: 20,
                  padding: isMobile ? '24px 20px' : '28px 24px',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} width="12" height="12" viewBox="0 0 12 12" fill={t.accent}>
                        <path d="M6 0.5l1.545 3.13 3.455.502-2.5 2.437.59 3.44L6 8.295l-3.09 1.714.59-3.44L1 4.132l3.455-.502L6 0.5z"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{
                    fontFamily: t.headingFont,
                    fontSize: isMobile ? 15 : 16,
                    color: t.ink, fontStyle: 'italic', fontWeight: 400,
                    lineHeight: 1.5, marginBottom: 18, flex: 1,
                  }}>{r.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      background: t.accentLight, border: `1px solid ${t.accentBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: t.accent, fontWeight: 700,
                    }}>{r.name[0]}</div>
                    <div>
                      <span style={{ fontSize: 12, color: t.ink, fontWeight: 600 }}>{r.name}</span>
                      <span style={{ fontSize: 11, color: t.inkMuted, marginLeft: 6, fontWeight: 300 }}>{r.from}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing header */}
          <div style={{
            padding: isMobile ? '60px 24px 0' : '80px 32px 0',
          }}>
            <p style={{ fontSize: 11, color: t.accent, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 16, opacity: 0.65 }}>GET STARTED</p>
            <h2 style={{
              fontFamily: t.headingFont,
              fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : `clamp(28px, 3.5vw, 44px)`,
              fontWeight: 400, color: t.ink,
              lineHeight: 1.08, letterSpacing: '-0.025em',
              maxWidth: 400,
            }}>
              Try every feature.<br />
              <em style={{ color: t.accent }}>Free, no strings attached.</em>
            </h2>
          </div>

          {/* Pricing cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 16,
            padding: isMobile ? '32px 24px 80px' : '40px 32px 96px',
          }}>
            {/* Free */}
            <div ref={freeRef} className="lift-card" style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 24,
              padding: isMobile ? '32px 24px' : '40px 36px',
              boxShadow: '0 2px 20px rgba(212,122,142,0.08)',
              opacity: freeInView ? 1 : 0,
              transform: freeInView ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
            }}>
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, color: t.inkMuted, letterSpacing: '0.09em', fontWeight: 600, marginBottom: 6 }}>FREE FOREVER</p>
                <p style={{ fontSize: 15, color: t.ink, fontWeight: 500 }}>Everything essential, completely free.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {freeValue.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: '16px 0',
                    borderBottom: i < freeValue.length - 1 ? `1px solid ${t.border}` : 'none',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: t.accentLight,
                      border: `1px solid ${t.accentBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, flexShrink: 0, color: t.accent,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, color: t.ink, fontWeight: 600, marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: t.inkMuted, fontWeight: 300, lineHeight: 1.5 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" style={{
                display: 'block', textAlign: 'center', marginTop: 28,
                border: `1.5px solid ${t.border}`,
                borderRadius: 100, padding: '14px 0',
                fontSize: 13, fontWeight: 600, color: t.ink,
                textDecoration: 'none', transition: 'border-color 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=t.accent; e.currentTarget.style.transform='scale(1.01)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform='scale(1)' }}
              >Download free →</a>
            </div>

            {/* Pro */}
            <div ref={proRef} className="lift-card" style={{
              background: t.negative,
              borderRadius: 24,
              padding: isMobile ? '32px 24px' : '40px 36px',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 4px 32px rgba(212,122,142,0.22)',
              opacity: proInView ? 1 : 0,
              transform: proInView ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
            }}>
              <div style={{
                position: 'absolute', top: -80, right: -80,
                width: 280, height: 280, borderRadius: '50%',
                background: `radial-gradient(ellipse, rgba(212,122,142,0.18) 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}/>
              <div style={{
                position: 'absolute', top: -1, right: 28,
                background: t.accent, color: '#fff',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                padding: '5px 14px', borderRadius: '0 0 12px 12px',
              }}>MOST POPULAR</div>

              <div style={{ marginBottom: 28, position: 'relative' }}>
                <p style={{ fontSize: 11, color: t.accent, letterSpacing: '0.09em', fontWeight: 700, marginBottom: 6, opacity: 0.75 }}>ASTER PRO</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 400, lineHeight: 1.5, maxWidth: 300 }}>
                  The full picture. Every connection. Cancel anytime.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 36, position: 'relative' }}>
                {proValue.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="8" cy="8" r="7" fill="rgba(212,122,142,0.18)"/>
                      <path d="M5 8.5l2 2 4-4" stroke="#D47A8E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 300, lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative' }}>
                <a href="#" style={{
                  display: 'block', textAlign: 'center',
                  background: t.accent, borderRadius: 100,
                  padding: '14px 0', fontSize: 13, fontWeight: 600,
                  color: '#fff', textDecoration: 'none',
                  transition: 'opacity 0.2s, transform 0.15s',
                  marginBottom: 12,
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; e.currentTarget.style.transform='scale(1.01)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='scale(1)' }}
                >Try Pro free for 7 days</a>
                <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                  Then $9.99/mo · Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section ref={ctaRef} style={{
        background: t.negative,
        padding: isMobile ? '88px 24px' : '112px 32px',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(212,122,142,0.14) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320, height: 320, borderRadius: '50%',
          border: '1px solid rgba(212,122,142,0.10)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 520, height: 520, borderRadius: '50%',
          border: '1px solid rgba(212,122,142,0.06)',
          pointerEvents: 'none',
        }}/>

        <div style={{
          position: 'relative', maxWidth: 640, margin: '0 auto',
          opacity: ctaInView ? 1 : 0,
          transform: ctaInView ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(212,122,142,0.12)',
            border: '1px solid rgba(212,122,142,0.22)',
            borderRadius: 100, padding: '6px 16px',
            marginBottom: 32,
          }}>
            <span style={{ fontSize: 16 }}>✦</span>
            <span style={{ fontSize: 12, color: t.accent, fontWeight: 600, letterSpacing: '0.08em' }}>FREE TO DOWNLOAD</span>
          </div>

          <h2 style={{
            fontFamily: t.headingFont,
            fontSize: isMobile ? `clamp(36px, 10vw, 56px)` : `clamp(44px, 6vw, 72px)`,
            color: '#fff', fontWeight: 400,
            lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: 22,
          }}>
            Your body has been<br />
            trying to tell you something.<br />
            <em style={{ color: t.accent }}>It's time to listen.</em>
          </h2>

          <p style={{
            fontSize: isMobile ? 15 : 17,
            color: 'rgba(255,255,255,0.42)',
            fontWeight: 300, lineHeight: 1.7,
            maxWidth: 480, margin: '0 auto 40px',
          }}>
            Open Aster. Finally understand yourself.
          </p>

          <div style={{ marginBottom: 20 }}>
            <AppStoreBadge t={t} />
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            Free forever plan · No credit card required
          </p>
        </div>
      </section>
    </>
  )
}