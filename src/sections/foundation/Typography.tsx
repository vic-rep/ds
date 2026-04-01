const typeScale = [
  { variant: 'h1', tag: 'h1', desktop: '48px / 600', mobile: '32px / 600', specimen: 'The quick brown fox' },
  { variant: 'h2', tag: 'h2', desktop: '40px / 600', mobile: '28px / 600', specimen: 'The quick brown fox' },
  { variant: 'h3', tag: 'h3', desktop: '36px / 600', mobile: '24px / 600', specimen: 'The quick brown fox' },
  { variant: 'h4', tag: 'h4', desktop: '32px / 600', mobile: '20px / 600', specimen: 'The quick brown fox' },
  { variant: 'h5', tag: 'h5', desktop: '24px / 500', mobile: '18px / 500', specimen: 'The quick brown fox jumps' },
  { variant: 'h6', tag: 'h6', desktop: '20px / 500', mobile: '16px / 500', specimen: 'The quick brown fox jumps over' },
  { variant: 'textLg', tag: 'p', desktop: '18px / 400', mobile: '16px / 400', specimen: 'The quick brown fox jumps over the lazy dog' },
  { variant: 'text', tag: 'p', desktop: '16px / 400', mobile: '14px / 400', specimen: 'The quick brown fox jumps over the lazy dog. Used for body copy and UI text.' },
  { variant: 'textM', tag: 'p', desktop: '16px / 500', mobile: '14px / 500', specimen: 'The quick brown fox jumps over the lazy dog. Medium weight body text.' },
  { variant: 'textSm', tag: 'span', desktop: '14px / 400', mobile: '12px / 400', specimen: 'Small text — used for labels, hints, and secondary information.' },
  { variant: 'caption', tag: 'span', desktop: '12px / 400', mobile: '10px / 400', specimen: 'Caption text — metadata, timestamps, footnotes.' },
]

const sizeMap: Record<string, { fontSize: string; fontWeight: number; lineHeight: number }> = {
  h1: { fontSize: '48px', fontWeight: 600, lineHeight: 1.2 },
  h2: { fontSize: '40px', fontWeight: 600, lineHeight: 1.2 },
  h3: { fontSize: '36px', fontWeight: 600, lineHeight: 1.2 },
  h4: { fontSize: '32px', fontWeight: 600, lineHeight: 1.2 },
  h5: { fontSize: '24px', fontWeight: 500, lineHeight: 1.2 },
  h6: { fontSize: '20px', fontWeight: 500, lineHeight: 1.2 },
  textLg: { fontSize: '18px', fontWeight: 400, lineHeight: 1.5 },
  text: { fontSize: '16px', fontWeight: 400, lineHeight: 1.5 },
  textM: { fontSize: '16px', fontWeight: 500, lineHeight: 1.5 },
  textSm: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: '12px', fontWeight: 400, lineHeight: 1.5 },
}

export function TypographyPage() {
  return (
    <div className="foundation-page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-primary)' }}>
          Typography
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          Type scale using <strong>Source Sans 3</strong>. Desktop and mobile scales differ at the 768px breakpoint.
        </p>
      </div>

      <div className="section-header">Type scale</div>

      {typeScale.map(item => {
        const style = sizeMap[item.variant]
        return (
          <div key={item.variant} className="type-specimen">
            <div className="type-specimen__meta">
              <div style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{item.variant}</div>
              <div>Desktop: {item.desktop}</div>
              <div>Mobile: {item.mobile}</div>
            </div>
            <div style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              lineHeight: style.lineHeight,
              color: 'var(--color-text-primary)',
            }}>
              {item.specimen}
            </div>
          </div>
        )
      })}
    </div>
  )
}
