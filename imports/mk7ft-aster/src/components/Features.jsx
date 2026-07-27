import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'

const chapters = [
  {
    num: '01', kicker: 'HEALTH',
    headline: `Your period is a\nvital sign, not\nan inconvenience.`,
    body: `Aster learns your rhythm and predicts your cycle, then explains how each phase shapes your energy, mood, and cravings. Not just dates. Context.`,
    callout: 'Flo tracks dates. Aster explains them.',
  },
  {
    num: '02', kicker: 'NUTRITION',
    headline: `Point your camera\nat any meal.\nWe'll do the math.`,
    body: `Point your camera at any meal. Aster maps it to your cycle phase — luteal? You need magnesium. Follicular? Load up on iron. Cal AI counts. Aster connects.`,
    callout: 'Cal AI counts calories. Aster counts on you.',
  },
  {
    num: '03', kicker: 'FITNESS',
    headline: `Train with your\nhormones,\nnot against them.`,
    body: `Your capacity shifts every week of your cycle. Aster reads your recovery and tells you when to push and when to rest. Stop guessing. Start progressing.`,
    callout: 'Strava tracks miles. Aster tracks readiness.',
  },
  {
    num: '04', kicker: 'AI COACH',
    headline: `A coach who knows\nyour whole story,\nnot just one chapter.`,
    body: `Ask anything. Your coach knows your cycle, sleep, food, and mood. No repeating yourself. No generic advice. Just answers that actually fit.`,
    callout: '"Why am I so tired?" Finally answered.',
  },
]

function FeatureVisual({ num, t }) {
  const visuals = {
    '01': (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 32px' }}>
        <svg width="180" height="180" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="wg01" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={t.accent} stopOpacity="0.18"/>
              <stop offset="100%" stopColor={t.accent} stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="96" fill="url(#wg01)"/>
          {[
            { days: 5,  color: '#B07CC4' },
            { days: 9,  color: '#7B9EE8' },
            { days: 2,  color: '#8A5CF6' },
            { days: 12, color: '#4A7CBF' },
          ].reduce((acc, p, i, arr) => {
            const total = 28
            const start = arr.slice(0, i).reduce((s, x) => s + x.days, 0)
            const sA = (start / total) * 2 * Math.PI - Math.PI / 2
            const eA = ((start + p.days) / total) * 2 * Math.PI - Math.PI / 2
            const r = 70
            const x1 = 100 + r * Math.cos(sA), y1 = 100 + r * Math.sin(sA)
            const x2 = 100 + r * Math.cos(eA), y2 = 100 + r * Math.sin(eA)
            acc.push(<path key={i} d={`M100,100 L${x1},${y1} A${r},${r} 0 ${p.days/total>0.5?1:0} 1 ${x2},${y2} Z`} fill={p.color} opacity={0.9}/>)
            return acc
          }, [])}
          <circle cx="100" cy="100" r="35" fill={t.surfaceAlt}/>
          <text x="100" y="96" textAnchor="middle" fill={t.ink} fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600">Day 14</text>
          <text x="100" y="111" textAnchor="middle" fill={t.accent} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="600">Ovulation ✦</text>
        </svg>
      </div>
    ),
    '02': (
      <div style={{ padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 10, color: t.inkMuted, letterSpacing: '0.08em', fontWeight: 600, margin: 0 }}>TODAY'S NUTRIENTS · LUTEAL PHASE</p>
        {[
          { name: 'Iron',      pct: 82, color: '#B07CC4' },
          { name: 'Magnesium', pct: 64, color: t.accent  },
          { name: 'Omega-3',   pct: 48, color: '#7B9EE8' },
          { name: 'Vitamin D', pct: 91, color: '#C9A96E' },
        ].map((n, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 13, color: t.ink, fontWeight: 500 }}>{n.name}</span>
              <span style={{ fontSize: 13, color: t.inkMuted }}>{n.pct}%</span>
            </div>
            <div style={{ height: 6, background: t.border, borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${n.pct}%`, background: `linear-gradient(to right, ${n.color}88, ${n.color})`, borderRadius: 100 }}/>
            </div>
          </div>
        ))}
        <p style={{ fontSize: 11, color: t.accent, fontWeight: 600, letterSpacing: '0.05em', margin: 0 }}>↑ BOOST MAGNESIUM THIS WEEK</p>
      </div>
    ),
    '03': (
      <div style={{ padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', gap: 13 }}>
        <p style={{ fontSize: 10, color: t.inkMuted, letterSpacing: '0.08em', fontWeight: 600, margin: 0 }}>READINESS THIS WEEK</p>
        {[
          { label: 'Mon', score: 88, ok: true  },
          { label: 'Tue', score: 91, ok: true  },
          { label: 'Wed', score: 74, ok: true  },
          { label: 'Thu', score: 45, ok: false },
          { label: 'Fri', score: 38, ok: false },
        ].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: t.inkMuted, fontWeight: 500, width: 28, flexShrink: 0 }}>{d.label}</span>
            <div style={{ flex: 1, height: 7, background: t.border, borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${d.score}%`, background: d.ok ? `linear-gradient(to right, ${t.accent}88, ${t.accent})` : 'linear-gradient(to right, #C0505088, #C05050)', borderRadius: 100 }}/>
            </div>
            <span style={{ fontSize: 11, color: d.ok ? t.accent : '#C05050', fontWeight: 600, width: 26, textAlign: 'right', flexShrink: 0 }}>{d.score}</span>
          </div>
        ))}
        <p style={{ fontSize: 11, color: '#C05050', fontWeight: 600, letterSpacing: '0.05em', margin: 0, opacity: 0.9 }}>↓ REST · LUTEAL PHASE · DAYS 22–28</p>
      </div>
    ),
    '04': (
      <div style={{ padding: '32px 24px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 10, color: t.inkMuted, letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>AI COACH</p>
        {[
          { msg: "Why am I so tired this week?", self: true },
          { msg: "You're in day 24, late luteal phase.. Progesterone is dropping, which disrupts sleep quality and lowers serotonin. Try magnesium glycinate tonight.", self: false },
        ].map((m, i) => (
          <div key={i} style={{
            alignSelf: m.self ? 'flex-end' : 'flex-start', maxWidth: '90%',
            background: m.self ? t.accentLight : t.surfaceAlt,
            border: `1px solid ${m.self ? t.accentBorder : t.border}`,
            borderRadius: m.self ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            padding: '10px 14px',
          }}>
            <p style={{ fontSize: 12, color: m.self ? t.accentText : t.ink, lineHeight: 1.55, margin: 0, fontWeight: m.self ? 500 : 300 }}>
              {m.msg}
            </p>
          </div>
        ))}
      </div>
    ),
  }
  return visuals[num] || null
}

function Chapter({ c, i, t, isMobile }) {
  const [ref, inView] = useInView()
  const isEven = i % 2 === 0

  return (
    <div ref={ref} style={{
      borderBottom: `1px solid ${t.border}`,
      background: isEven ? t.bg : t.sectionBg,
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        padding: isMobile ? '64px 24px' : '88px 32px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
        gap: isMobile ? 36 : 80,
        alignItems: 'center',
      }}>
        {/* Text */}
        <div style={{
          order: isMobile ? 0 : (isEven ? 0 : 1),
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : `translateX(${isEven ? -24 : 24}px)`,
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span style={{ fontSize: 11, color: t.accent, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.8 }}>{c.num}</span>
            <span style={{ width: 1, height: 16, background: t.border, display: 'inline-block' }}/>
            <span style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600, letterSpacing: '0.1em' }}>{c.kicker}</span>
          </div>
          <h3 style={{
            fontFamily: t.headingFont,
            fontSize: isMobile ? 'clamp(26px, 7vw, 38px)' : 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400, color: t.ink,
            lineHeight: 1.1, letterSpacing: '-0.025em',
            marginBottom: 18, whiteSpace: 'pre-line',
          }}>{c.headline}</h3>
          <p style={{ fontSize: 15, color: t.inkMuted, fontWeight: 300, lineHeight: 1.78, marginBottom: 22, maxWidth: 400 }}>
            {c.body}
          </p>
          <p style={{
            fontSize: 13, color: t.accent, fontWeight: 600, fontStyle: 'italic',
            paddingTop: 16, borderTop: `1px solid ${t.border}`,
          }}>
            {c.callout}
          </p>
        </div>

        {/* Visual */}
        <div className="lift-card" style={{
          order: isMobile ? 1 : (isEven ? 1 : 0),
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(138,92,246,0.10)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : `translateX(${isEven ? 24 : -24}px)`,
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          <FeatureVisual num={c.num} t={t} />
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [headerRef, headerInView] = useInView()

  return (
    <section id="features" style={{ background: t.bg }}>
      <div ref={headerRef} style={{
        maxWidth: 1080, margin: '0 auto',
        padding: isMobile ? '88px 24px 52px' : '112px 32px 72px',
        borderBottom: `1px solid ${t.border}`,
        opacity: headerInView ? 1 : 0,
        transform: headerInView ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        <p style={{ fontSize: 11, color: t.accent, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 20, opacity: 0.65 }}>HOW IT WORKS</p>
        <h2 style={{
          fontFamily: t.headingFont,
          fontSize: isMobile ? 'clamp(30px, 8vw, 46px)' : 'clamp(34px, 4.2vw, 56px)',
          fontWeight: 400, color: t.ink,
          lineHeight: 1.07, letterSpacing: '-0.028em', maxWidth: 540,
        }}>
          Your body is one system.<br />
          <em style={{ color: t.accent }}>Aster treats it that way.</em>
        </h2>
      </div>

      {chapters.map((c, i) => (
        <Chapter key={c.num} c={c} i={i} t={t} isMobile={isMobile} />
      ))}
    </section>
  )
}
