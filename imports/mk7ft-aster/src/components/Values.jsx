import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const values = [
  {
    word: 'Empathetic',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 23s-9-5.5-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-9 11-9 11z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
    headline: 'We meet you where you are.',
    body: `Your health journey is not a performance. Aster doesn't judge your streak, your weight, or your choices — it listens, learns, and adapts to you.`,
  },
  {
    word: 'Inclusive',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.6"/>
        <path d="M7 14c0-3.9 3.1-7 7-7" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M14 7v14M7 14h14" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.4"/>
      </svg>
    ),
    headline: 'Built for every woman.',
    body: `Diverse cycles. Diverse bodies. Diverse goals. Aster is designed for all women — regardless of age, background, or health history.`,
  },
  {
    word: 'Informed',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="6" width="18" height="16" rx="3" stroke={color} strokeWidth="1.6"/>
        <path d="M9 11h10M9 15h7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    headline: 'Science, not speculation.',
    body: `Every recommendation Aster makes is grounded in peer-reviewed research on female physiology — not generic wellness advice written for a male-default world.`,
  },
  {
    word: 'Discreet',
    icon: (color) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5C8 5 3.5 10 3.5 14S8 23 14 23s10.5-5 10.5-9-4.5-9-10.5-9z" stroke={color} strokeWidth="1.6"/>
        <circle cx="14" cy="14" r="3" fill={color} fillOpacity="0.7"/>
        <path d="M3.5 3.5l21 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35"/>
      </svg>
    ),
    headline: 'Your data stays yours.',
    body: `Health is personal. Aster is built with privacy at its core — no ads, no selling your data, no third-party sharing. What you track here, stays here.`,
  },
]

export default function Values() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section style={{
      background: t.sectionBg,
      padding: isMobile ? '80px 24px' : '100px 32px',
      borderTop: `1px solid ${t.border}`,
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{
          marginBottom: isMobile ? 48 : 64,
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <p style={{ fontSize: 11, color: t.inkFaint, letterSpacing: '0.1em', fontWeight: 600, marginBottom: 16 }}>WHAT WE BELIEVE</p>
          <h2 style={{
            fontFamily: t.headingFont,
            fontSize: isMobile ? 'clamp(28px, 8vw, 44px)' : 'clamp(32px, 4vw, 52px)',
            fontWeight: 400, color: t.ink,
            lineHeight: 1.08, letterSpacing: '-0.025em',
            maxWidth: 520,
          }}>
            Health tech built<br />
            <em style={{ color: t.accent }}>with women in mind.</em>
          </h2>
        </div>

        {/* Values grid */}
        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 20 : 24,
        }}>
          {values.map((v, i) => (
            <div key={v.word} style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 20,
              padding: isMobile ? '28px 24px' : '32px 32px',
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? 'none' : 'translateY(24px)',
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}>
              {/* Icon + word */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: t.accentLight,
                  border: `1px solid ${t.accentBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {v.icon(t.accent)}
                </div>
                <span style={{
                  fontFamily: t.headingFont,
                  fontSize: 20, color: t.ink,
                  letterSpacing: '-0.02em', fontWeight: 400,
                }}>{v.word}</span>
              </div>

              <h3 style={{
                fontSize: 15, color: t.ink, fontWeight: 600,
                marginBottom: 10, lineHeight: 1.35,
              }}>{v.headline}</h3>

              <p style={{
                fontSize: 14, color: t.inkMuted, fontWeight: 300,
                lineHeight: 1.7, margin: 0,
              }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
