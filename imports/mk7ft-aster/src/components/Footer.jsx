import { useTheme } from '../ThemeContext'
import { useInView } from '../hooks/useInView'
import { useWindowSize } from '../hooks/useWindowSize'
import Logo from './Logo'

const legalLinks = ['Privacy', 'Terms', 'Cookies', 'User Agreement']

export default function Footer() {
  const { theme: t } = useTheme()
  const { isMobile } = useWindowSize()
  const [ref, inView] = useInView()

  return (
    <footer style={{
      background: t.negative,
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: isMobile ? '36px 24px 28px' : '40px 32px 32px',
    }}>
      <div ref={ref} style={{
        maxWidth: 1080, margin: '0 auto',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(12px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 24 : 0,
      }}>
        {/* Left: logo + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Logo white size={24} wordmarkColor={t.negativeText} />
          <p style={{ fontSize: 12, color: t.negativeText, opacity: 0.28, lineHeight: 1, fontWeight: 300, margin: 0, whiteSpace: 'nowrap' }}>
            The women's health app that connects your whole story.
          </p>
        </div>

        {/* Right: legal + instagram + copyright in one row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: isMobile ? '10px 20px' : '0 28px',
        }}>
          {legalLinks.map(link => (
            <a key={link} href="#" style={{
              fontSize: 12, color: t.negativeText,
              opacity: 0.32, textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.72'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.32'}
            >{link}</a>
          ))}

          <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.12)', display: isMobile ? 'none' : 'block' }} />

          <a href="https://instagram.com/trackaster" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: t.negativeText, opacity: 0.32,
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.72'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.32'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
            @trackaster
          </a>

          <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.12)', display: isMobile ? 'none' : 'block' }} />

          <p style={{ fontSize: 12, color: t.negativeText, opacity: 0.18, margin: 0, whiteSpace: 'nowrap' }}>
            © 2026 Aster Health
          </p>
        </div>
      </div>
    </footer>
  )
}
