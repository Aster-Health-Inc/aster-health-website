import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const quotes = [
  {
    text: "I used Flo for four years. Aster in one month taught me more about my body than all four years combined.",
    name: "Maya L.", handle: "@mayahealth", from: "Switched from Flo", initial: "M",
  },
  {
    text: "Cal AI told me my macros. Aster told me why I was craving carbs three days before my period. That's the difference.",
    name: "Priya K.", handle: "@priyak", from: "Switched from Cal AI", initial: "P",
  },
  {
    text: "I had Clue, Sleep Cycle, and MyFitnessPal open every single day. Now just one app. My screen time dropped by an hour.",
    name: "Sofia R.", handle: "@sofiar", from: "3 apps → 1", initial: "S",
  },
]

function QuoteRow({ q, i, t, isMobile }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      padding: isMobile ? '36px 0' : '44px 0',
      borderBottom: i < quotes.length - 1 ? `1px solid ${t.border}` : 'none',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
      gap: isMobile ? 20 : 56,
      alignItems: 'start',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s`,
    }}>
      {/* Person */}
      <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', gap: isMobile ? 12 : 0, flexDirection: isMobile ? 'row' : 'column' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${t.accent}35, ${t.accent}15)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, color: t.accent, fontWeight: 700,
          marginBottom: isMobile ? 0 : 12,
          border: `1px solid ${t.accentBorder}`,
        }}>{q.initial}</div>
        <div>
          <div style={{ fontSize: 13, color: t.ink, fontWeight: 600, marginBottom: 2 }}>{q.name}</div>
          <div style={{ fontSize: 11, color: t.inkFaint, marginBottom: isMobile ? 0 : 10 }}>{q.handle}</div>
          {!isMobile && (
            <div style={{
              display: 'inline-block',
              background: t.accentLight, border: `1px solid ${t.accentBorder}`,
              borderRadius: 100, padding: '3px 10px',
              fontSize: 10, color: t.accentText, fontWeight: 600, letterSpacing: '0.05em',
            }}>{q.from.toUpperCase()}</div>
          )}
        </div>
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: t.headingFont,
        fontSize: isMobile ? 'clamp(18px, 5vw, 24px)' : 'clamp(20px, 2.2vw, 28px)',
        color: t.ink, fontWeight: 400,
        lineHeight: 1.4, letterSpacing: '-0.015em',
        fontStyle: 'italic', paddingTop: isMobile ? 0 : 4,
      }}>
        "{q.text}"
      </p>
    </div>
  )
}

export default function Testimonials() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [headerRef, headerInView] = useInView()

  return (
    <section style={{ background: t.bg, padding: isMobile ? '80px 24px' : '100px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div ref={headerRef} style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: 48,
          borderBottom: `1px solid ${t.border}`, paddingBottom: 36,
          flexWrap: 'wrap', gap: 20,
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div>
            <p style={{ fontSize: 11, color: t.inkFaint, letterSpacing: '0.1em', fontWeight: 600, marginBottom: 14 }}>REAL PEOPLE</p>
            <h2 style={{
              fontFamily: t.headingFont,
              fontSize: isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400, color: t.ink,
              lineHeight: 1.1, letterSpacing: '-0.025em',
            }}>
              Women who made<br /><em style={{ color: t.accent }}>the switch.</em>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="15" height="15" viewBox="0 0 12 12" fill={t.accent}>
                <path d="M6 0.5l1.545 3.13 3.455.502-2.5 2.437.59 3.44L6 8.295l-3.09 1.714.59-3.44L1 4.132l3.455-.502L6 0.5z"/>
              </svg>
            ))}
            <span style={{ fontSize: 13, color: t.inkMuted, marginLeft: 8, fontWeight: 600 }}>4.9</span>
          </div>
        </div>

        <div>
          {quotes.map((q, i) => (
            <QuoteRow key={i} q={q} i={i} t={t} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}
