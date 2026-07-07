import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const rhythms = [
  {
    pace: 'Every 24 hours',
    label: 'DAILY SHIFTS',
    desc: 'Mood, energy, and cravings shift by the hour. Aster keeps up.',
  },
  {
    pace: 'Every 7 days',
    label: 'WEEKLY PHASES',
    desc: 'Your hormonal profile changes every week. Aster adapts with you.',
  },
  {
    pace: 'Every 28 days',
    label: 'MONTHLY CYCLE',
    desc: 'Four phases, four different bodies. Aster knows which one you are today.',
  },
]

export default function Cycle() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [headRef, headInView] = useInView()
  const [cardsRef, cardsInView] = useInView()

  return (
    <section style={{
      background: t.negative,
      padding: isMobile ? '88px 24px 96px' : '112px 32px 120px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,122,142,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', textAlign: 'center' }}>

        {/* Eyebrow */}
        <p style={{
          fontSize: 11, color: '#D47A8E', letterSpacing: '0.12em', fontWeight: 700,
          marginBottom: 28,
          opacity: headInView ? 0.65 : 0,
          transition: 'opacity 0.6s ease',
        }}>THE DIFFERENCE</p>

        {/* Headline */}
        <div ref={headRef}>
          <h2 style={{
            fontFamily: t.headingFont,
            fontSize: isMobile ? 'clamp(34px, 9vw, 50px)' : `clamp(40px, 5.5vw, 66px)`,
            color: '#fff', fontWeight: 400, lineHeight: 1.07, letterSpacing: '-0.03em',
            marginBottom: 22,
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}>
            A man's body stays<br />
            the same all year.<br />
            <em style={{ color: '#D47A8E' }}>Yours changes every few days.</em>
          </h2>

          <p style={{
            fontSize: isMobile ? 16 : 18,
            color: 'rgba(255,255,255,0.40)',
            fontWeight: 300, lineHeight: 1.75,
            maxWidth: 520, margin: '0 auto 60px',
            opacity: headInView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.2s',
          }}>
            Most health apps were built for a body that stays stable. Yours changes by the hour. Clue knows your symptoms. Flo knows your dates. Neither connects your cycle to how you actually feel.
          </p>
        </div>

        {/* Three time-scale cards */}
        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 12 : 20,
          marginBottom: 64,
        }}>
          {rhythms.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(212,122,142,0.18)',
                borderRadius: 20,
                padding: isMobile ? '28px 24px' : '40px 32px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center',
                opacity: cardsInView ? 1 : 0,
                transform: cardsInView ? 'none' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
              }}
            >
              <span style={{
                display: 'inline-block',
                fontSize: 10, color: '#D47A8E', letterSpacing: '0.12em', fontWeight: 700,
                background: 'rgba(212,122,142,0.12)',
                borderRadius: 100, padding: '4px 12px', marginBottom: 20,
              }}>{item.label}</span>
              <h3 style={{
                fontFamily: t.headingFont,
                fontSize: 20, color: 'rgba(255,255,255,0.88)',
                fontWeight: 400, lineHeight: 1.2, marginBottom: 12,
              }}>{item.pace}</h3>
              <p style={{
                fontSize: 13, color: 'rgba(255,255,255,0.45)',
                fontWeight: 300, lineHeight: 1.7, margin: 0,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Pivot */}
        <p style={{
          fontFamily: t.headingFont,
          fontSize: isMobile ? `clamp(20px, 5.5vw, 28px)` : `clamp(22px, 2.8vw, 34px)`,
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.3, letterSpacing: '-0.02em', fontWeight: 400,
          opacity: cardsInView ? 1 : 0,
          transition: 'opacity 0.7s ease 0.5s',
        }}>
          Your body changes every day.<br />
          <em style={{ color: '#D47A8E' }}>Aster changes with you.</em>
        </p>
      </div>
    </section>
  )
}