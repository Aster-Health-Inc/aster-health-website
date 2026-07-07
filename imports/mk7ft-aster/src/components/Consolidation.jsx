import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const integrations = [
  { name: 'Apple Health',  abbr: 'AH', color: '#E8838A' },
  { name: 'Google Fit',    abbr: 'GF', color: '#5B9EE8' },
  { name: 'Strava',        abbr: 'ST', color: '#E8804A' },
  { name: 'Garmin',        abbr: 'GA', color: '#4AC4B8' },
  { name: 'WHOOP',         abbr: 'WH', color: '#8AE89A' },
  { name: 'Fitbit',        abbr: 'FB', color: '#9BB8E8' },
]

function IntegrationHub({ inView, t, isMobile }) {
  const size = isMobile ? 260 : 330
  const cx = size / 2, cy = size / 2
  const r  = isMobile ? 94 : 118

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={cx} cy={cy} r={r}
          fill="none" stroke="rgba(138,92,246,0.10)" strokeWidth="1" strokeDasharray="4 7" />
        {integrations.map((_, i) => {
          const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2
          const x2 = cx + r * Math.cos(angle), y2 = cy + r * Math.sin(angle)
          return (
            <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
              stroke="rgba(138,92,246,0.12)" strokeWidth="1" strokeDasharray="3 6"
              style={{ opacity: inView ? 1 : 0, transition: `opacity 0.5s ease ${0.4 + i * 0.07}s` }}
            />
          )
        })}
      </svg>

      {/* Aster center */}
      <div style={{
        position: 'absolute', left: cx, top: cy,
        transform: 'translate(-50%,-50%)',
        width: 68, height: 68, borderRadius: '50%',
        background: `linear-gradient(135deg, ${t.accent} 0%, #6034C0 100%)`,
        boxShadow: `0 0 28px rgba(138,92,246,0.40), 0 0 56px rgba(138,92,246,0.12)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.6s ease 0.2s', zIndex: 2,
      }}>
        <img src="/logo-white.png" alt="aster" width={26} height={26} style={{ display: 'block' }} />
      </div>

      {/* Integration nodes */}
      {integrations.map((intg, i) => {
        const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2
        const x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle)
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y,
            transform: inView ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(0.5)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: `1.5px solid ${intg.color}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: inView ? 1 : 0,
            transition: `opacity 0.5s ease ${0.5 + i * 0.08}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.5 + i * 0.08}s`,
            zIndex: 1,
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: intg.color, letterSpacing: '0.04em' }}>{intg.abbr}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function Consolidation() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [leftRef,  leftInView]  = useInView()
  const [rightRef, rightInView] = useInView()

  return (
    <section style={{
      background: t.negative,
      padding: isMobile ? '88px 24px' : '112px 32px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -80, left: -80,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(138,92,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1080, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 56 : 96, alignItems: 'center',
      }}>
        {/* Left — hub */}
        <div ref={leftRef} style={{
          opacity: leftInView ? 1 : 0,
          transform: leftInView ? 'none' : 'translateX(-24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <IntegrationHub inView={leftInView} t={t} isMobile={isMobile} />
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            justifyContent: 'center', marginTop: 28, maxWidth: 340,
          }}>
            {integrations.map((intg, i) => (
              <div key={i} style={{
                fontSize: 11, color: 'rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 100, padding: '5px 12px', fontWeight: 500,
                opacity: leftInView ? 1 : 0,
                transition: `opacity 0.4s ease ${0.6 + i * 0.06}s`,
              }}>{intg.name}</div>
            ))}
          </div>
        </div>

        {/* Right — copy */}
        <div ref={rightRef} style={{
          opacity: rightInView ? 1 : 0,
          transform: rightInView ? 'none' : 'translateX(24px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}>
          <p style={{ fontSize: 11, color: t.accent, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 24, opacity: 0.65 }}>
            WORKS WITH WHAT YOU HAVE
          </p>
          <h2 style={{
            fontFamily: t.headingFont,
            fontSize: isMobile ? 'clamp(30px, 8vw, 44px)' : 'clamp(32px, 4vw, 52px)',
            fontWeight: 400, color: '#fff',
            lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 22,
          }}>
            Not a replacement.<br />
            <em style={{ color: t.accent }}>An upgrade.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.42)', fontWeight: 300, lineHeight: 1.8, marginBottom: 36, maxWidth: 400 }}>
            Keep Strava. Keep your WHOOP. Keep everything. Aster pulls it all together and finally makes sense of it.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {[
              { icon: '↔', text: 'Syncs with your existing devices and apps instantly' },
              { icon: '◎', text: 'Connects the dots across health, fitness, and nutrition' },
              { icon: '✦', text: 'Surfaces insights none of your other apps can see' },
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(138,92,246,0.10)',
                  border: '1px solid rgba(138,92,246,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: t.accent,
                }}>{b.icon}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', fontWeight: 300, lineHeight: 1.65, margin: 0 }}>{b.text}</p>
              </div>
            ))}
          </div>

          <a href="#waitlist" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: t.accent, color: '#fff',
            fontSize: 14, fontWeight: 600,
            padding: '14px 28px', borderRadius: 100,
            textDecoration: 'none', letterSpacing: '0.01em',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity='0.82'; e.currentTarget.style.transform='scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity='1';    e.currentTarget.style.transform='scale(1)'    }}
          >
            Start for free
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
