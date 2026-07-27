import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const rows = [
  {
    belief: 'Empathetic',
    headline: 'We meet you where you are.',
    quote: `"I used Flo for four years. Aster in one month taught me more about my body than all four years combined."`,
    name: 'Maya L.', from: 'Switched from Flo',
  },
  {
    belief: 'Informed',
    headline: 'Science, not speculation.',
    quote: `"Cal AI told me my macros. Aster told me why I was craving carbs three days before my period. That's the difference."`,
    name: 'Priya K.', from: 'Switched from Cal AI',
  },
  {
    belief: 'Inclusive',
    headline: 'Built for every woman.',
    quote: `"I didn't think a health app could actually feel like it gets me. Aster does."`,
    name: 'Zara M.', from: 'Beta user',
  },
  {
    belief: 'Discreet',
    headline: 'Your data stays yours.',
    quote: `"No ads. No upsells. Just honest, private tracking. Rare."`,
    name: 'Sofia R.', from: '3 apps → 1',
  },
]

function Row({ row, i, t, isMobile }) {
  const [ref, inView] = useInView()
  const isEven = i % 2 === 0
  const isLast = i === rows.length - 1

  // Padding calculated cleanly — no undefined overrides
  const beliefPad = isMobile
    ? '36px 0 20px'
    : isEven
      ? '56px 52px 56px 0'
      : '56px 0 56px 52px'

  const quotePad = isMobile
    ? '0 0 36px'
    : isEven
      ? '56px 0 56px 52px'
      : '56px 52px 56px 0'

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      borderBottom: isLast ? 'none' : `1px solid ${t.border}`,
    }}>
      {/* Belief */}
      <div style={{
        order: isMobile ? 0 : (isEven ? 0 : 1),
        padding: beliefPad,
        borderRight: (!isMobile && isEven) ? `1px solid ${t.border}` : 'none',
        borderLeft: (!isMobile && !isEven) ? `1px solid ${t.border}` : 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateX(${isEven ? -18 : 18}px)`,
        transition: 'opacity 0.65s ease, transform 0.65s ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <span style={{
          display: 'inline-block', alignSelf: 'flex-start',
          fontSize: 10, color: t.accent, letterSpacing: '0.12em', fontWeight: 700,
          background: t.accentLight, border: `1px solid ${t.accentBorder}`,
          borderRadius: 100, padding: '4px 12px', marginBottom: 16,
        }}>{row.belief.toUpperCase()}</span>
        <h3 style={{
          fontFamily: t.headingFont,
          fontSize: isMobile ? 22 : 28,
          color: t.ink, fontWeight: 400,
          lineHeight: 1.2, letterSpacing: '-0.02em',
          margin: 0,
        }}>{row.headline}</h3>
      </div>

      {/* Quote */}
      <div style={{
        order: isMobile ? 1 : (isEven ? 1 : 0),
        padding: quotePad,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateX(${isEven ? 18 : -18}px)`,
        transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
      }}>
        <p style={{
          fontFamily: t.headingFont,
          fontSize: isMobile ? 17 : 20,
          color: t.ink, fontWeight: 400,
          fontStyle: 'italic', lineHeight: 1.5,
          letterSpacing: '-0.01em', marginBottom: 18,
        }}>{row.quote}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: t.accentLight, border: `1px solid ${t.accentBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: t.accent, fontWeight: 700,
          }}>{row.name[0]}</div>
          <div>
            <span style={{ fontSize: 13, color: t.ink, fontWeight: 600 }}>{row.name}</span>
            <span style={{ fontSize: 12, color: t.inkMuted, marginLeft: 8, fontWeight: 300 }}>{row.from}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Social() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [headerRef, headerInView] = useInView()

  return (
    <section style={{
      background: t.bg,
      borderTop: `1px solid ${t.border}`,
      padding: isMobile ? '88px 24px' : '112px 32px',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          gap: 16, marginBottom: 0,
          paddingBottom: 40, borderBottom: `1px solid ${t.border}`,
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div>
            <p style={{ fontSize: 11, color: t.accent, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 16, opacity: 0.65 }}>BUILT ON BELIEF</p>
            <h2 style={{
              fontFamily: t.headingFont,
              fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : 'clamp(30px, 3.5vw, 44px)',
              fontWeight: 400, color: t.ink,
              lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0,
            }}>
              What we stand for,<br />
              <em style={{ color: t.accent }}>in their words.</em>
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill={t.accent}>
                <path d="M6 0.5l1.545 3.13 3.455.502-2.5 2.437.59 3.44L6 8.295l-3.09 1.714.59-3.44L1 4.132l3.455-.502L6 0.5z"/>
              </svg>
            ))}
            <span style={{ fontSize: 13, color: t.inkMuted, marginLeft: 7, fontWeight: 600 }}>4.9</span>
          </div>
        </div>

        {rows.map((row, i) => (
          <Row key={i} row={row} i={i} t={t} isMobile={isMobile} />
        ))}
      </div>
    </section>
  )
}
