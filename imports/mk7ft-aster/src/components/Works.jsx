import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const cycles = [
  {
    label: 'DAILY',
    title: '24 hours',
    items: [
      { icon: '◑', label: 'Track', detail: 'Food, sleep, mood. Logged in under 10 seconds.' },
      { icon: '↗', label: 'Notify', detail: 'Real-time nudges when your energy or cravings shift.' },
      { icon: '✦', label: 'Analyze', detail: 'See how today compares to the same day last cycle.' },
    ],
  },
  {
    label: 'WEEKLY',
    title: '7 days',
    items: [
      { icon: '◑', label: 'Track', detail: `Phase detection. No guessing, no journals.` },
      { icon: '↗', label: 'Notify', detail: 'Know when to push your workout and when to rest.' },
      { icon: '✦', label: 'Analyze', detail: 'Readiness scores and nutrients for your exact phase.' },
    ],
  },
  {
    label: 'MONTHLY',
    title: '28 days',
    items: [
      { icon: '◑', label: 'Track', detail: '97% accurate cycle prediction across all four phases.' },
      { icon: '↗', label: 'Notify', detail: 'Phase transitions, expected symptoms, and prep tips.' },
      { icon: '✦', label: 'Analyze', detail: 'Sleep, HRV, and cycle patterns your other apps miss.' },
    ],
  },
]

const integrations = ['Apple Health', 'Google Fit', 'Strava', 'Garmin', 'WHOOP', 'Fitbit']

export default function Works() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [headerRef, headerInView] = useInView()
  const [cardsRef, cardsInView] = useInView()

  return (
    <section style={{ background: t.bg }}>
      {/* Header */}
      <div ref={headerRef} style={{
        maxWidth: 1080, margin: '0 auto',
        padding: isMobile ? '88px 24px 52px' : '112px 32px 60px',
        borderBottom: `1px solid ${t.border}`,
        opacity: headerInView ? 1 : 0,
        transform: headerInView ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <p style={{ fontSize: 11, color: t.accent, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 20, opacity: 0.65 }}>HOW ASTER WORKS</p>
        <h2 style={{
          fontFamily: t.headingFont,
          fontSize: isMobile ? 'clamp(28px, 8vw, 42px)' : `clamp(32px, 4vw, 52px)`,
          fontWeight: 400, color: t.ink,
          lineHeight: 1.07, letterSpacing: '-0.025em', maxWidth: 600,
        }}>
          Tracked. Notified. Analyzed.<br />
          <em style={{ color: t.accent }}>Around every cycle.</em>
        </h2>
      </div>

      {/* Three columns */}
      <div ref={cardsRef} style={{
        maxWidth: 1080, margin: '0 auto',
        padding: isMobile ? '52px 24px 80px' : '64px 32px 96px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? 24 : 28,
      }}>
        {cycles.map((col, ci) => (
          <div key={ci} style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 24,
            padding: isMobile ? '32px 24px' : '36px 28px',
            opacity: cardsInView ? 1 : 0,
            transform: cardsInView ? 'none' : 'translateY(20px)',
            transition: `opacity 0.6s ease ${ci * 0.1}s, transform 0.6s ease ${ci * 0.1}s`,
          }}>
            <div style={{ marginBottom: 28 }}>
              <span style={{
                fontSize: 10, color: t.accent, letterSpacing: '0.12em', fontWeight: 700,
                background: t.accentLight, borderRadius: 100, padding: '4px 12px',
                display: 'inline-block', marginBottom: 12,
              }}>{col.label}</span>
              <h3 style={{
                fontFamily: t.headingFont,
                fontSize: isMobile ? 24 : 28, color: t.ink,
                fontWeight: 400, lineHeight: 1.1, margin: 0,
                letterSpacing: '-0.02em',
              }}>{col.title}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {col.items.map((item, ii) => (
                <div key={ii} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  padding: '14px 0',
                  borderTop: ii === 0 ? `1px solid ${t.border}` : 'none',
                  borderBottom: ii < col.items.length - 1 ? `1px solid ${t.border}` : 'none',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: t.accentLight,
                    border: `1px solid ${t.accentBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, color: t.accent,
                  }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: t.ink, fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: t.inkMuted, fontWeight: 300, lineHeight: 1.55 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Integration strip — replaces Consolidation */}
      <div style={{
        background: t.sectionBg,
        borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        padding: isMobile ? '48px 24px' : '56px 32px',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: 12, color: t.inkMuted, fontWeight: 500, marginBottom: 20,
            letterSpacing: '0.06em',
          }}>
            Syncs with everything you already use
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 10,
            justifyContent: 'center',
          }}>
            {integrations.map((name, i) => (
              <span key={i} style={{
                fontSize: 12, color: t.inkMuted,
                background: t.pill,
                border: `1px solid ${t.pillBorder}`,
                borderRadius: 100, padding: '7px 16px', fontWeight: 500,
              }}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}