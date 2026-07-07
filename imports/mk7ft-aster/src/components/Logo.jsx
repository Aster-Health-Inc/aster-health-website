// white prop: use white logo (for dark backgrounds)
// size: pixel size of the icon
export default function Logo({ white = false, size = 28, showWordmark = true, wordmarkColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
      <img
        src={white ? '/logo-white.png' : '/logo.png'}
        alt="Aster"
        width={size}
        height={size}
        style={{ display: 'block', flexShrink: 0 }}
      />
      {showWordmark && (
        <span style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: size * 0.72,
          color: wordmarkColor || 'inherit',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>aster</span>
      )}
    </div>
  )
}
