const spacingScale = [
  { name: '--none', value: '0px', px: 0 },
  { name: '--xxs', value: '2px', px: 2 },
  { name: '--xs', value: '4px', px: 4 },
  { name: '--s', value: '8px', px: 8 },
  { name: '--m', value: '12px', px: 12 },
  { name: '--l', value: '16px', px: 16 },
  { name: '--xl', value: '20px', px: 20 },
  { name: '--xxl', value: '24px', px: 24 },
  { name: '--3xl', value: '28px', px: 28 },
  { name: '--4xl', value: '32px', px: 32 },
  { name: '--5xl', value: '40px', px: 40 },
  { name: '--6xl', value: '48px', px: 48 },
  { name: '--7xl', value: '64px', px: 64 },
  { name: '--8xl', value: '80px', px: 80 },
  { name: '--max', value: '128px', px: 128 },
]

const MAX_PX = 128

export function SpacingPage() {
  return (
    <div className="foundation-page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-primary)' }}>
          Spacing
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          Spacing scale defined as CSS custom properties. Use the variable name directly (e.g.{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>padding: var(--l)</code>).
        </p>
      </div>

      <div className="section-header">Spacing scale</div>

      {spacingScale.map(item => (
        <div key={item.name} className="spacing-bar-row">
          <div className="spacing-bar-row__name">{item.name}</div>
          <div
            className="spacing-bar-row__bar"
            style={{ width: item.px === 0 ? 4 : (item.px / MAX_PX) * 400 }}
          />
          <div className="spacing-bar-row__value">{item.value}</div>
        </div>
      ))}
    </div>
  )
}
