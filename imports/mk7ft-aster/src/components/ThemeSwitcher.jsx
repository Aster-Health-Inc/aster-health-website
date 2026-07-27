import { useTheme } from '../ThemeContext'
import { themes } from '../themes'

export default function ThemeSwitcher() {
  const { themeId, setThemeId, theme: t } = useTheme()

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 100,
      padding: '8px 10px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }}>
      <span style={{
        fontSize: 11,
        color: '#8A847C',
        fontWeight: 600,
        letterSpacing: '0.05em',
        paddingLeft: 8,
        paddingRight: 8,
        whiteSpace: 'nowrap',
      }}>BRAND THEME</span>

      {Object.values(themes).map(th => (
        <button
          key={th.id}
          onClick={() => setThemeId(th.id)}
          title={th.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 14px',
            borderRadius: 100,
            border: 'none',
            cursor: 'pointer',
            background: themeId === th.id ? th.accent : 'transparent',
            transition: 'all 0.2s',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Palette dots */}
          <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
            {[th.bg, th.ink, th.accent].map((c, i) => (
              <div key={i} style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: c,
                border: '1px solid rgba(0,0,0,0.08)',
                flexShrink: 0,
              }} />
            ))}
          </div>
          <span style={{
            fontSize: 12,
            fontWeight: themeId === th.id ? 600 : 400,
            color: themeId === th.id
              ? (th.id === 'warm' ? '#1C1917' : th.id === 'blush' ? '#FDF7F5' : th.id === 'forest' ? '#F5F3EF' : '#F6F5FB')
              : '#3D3935',
            whiteSpace: 'nowrap',
          }}>{th.name}</span>
        </button>
      ))}
    </div>
  )
}
