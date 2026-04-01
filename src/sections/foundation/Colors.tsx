const colorGroups = [
  {
    label: 'Accent (Orange)',
    swatches: [
      { name: '--accent-900', hex: '#602901' },
      { name: '--accent-800', hex: '#923E02' },
      { name: '--accent-700', hex: '#C55302' },
      { name: '--accent-600', hex: '#F76803' },
      { name: '--accent-500', hex: '#FC7D21' },
      { name: '--accent-400', hex: '#FD9A54' },
      { name: '--accent-300', hex: '#FEB886' },
      { name: '--accent-200', hex: '#FED5B8' },
      { name: '--accent-100', hex: '#FFF3EB' },
    ],
  },
  {
    label: 'Primary (Neutral)',
    swatches: [
      { name: '--primary-900', hex: '#191919' },
      { name: '--primary-800', hex: '#333333' },
      { name: '--primary-700', hex: '#4d4d4d' },
      { name: '--primary-600', hex: '#666666' },
      { name: '--primary-500', hex: '#808080' },
      { name: '--primary-400', hex: '#999999' },
      { name: '--primary-300', hex: '#cccccc' },
      { name: '--primary-200', hex: '#e6e6e6' },
      { name: '--primary-100', hex: '#f0f0f0' },
    ],
  },
  {
    label: 'Surface',
    swatches: [
      { name: '--surface', hex: '#F3F2F0' },
      { name: '--surface-adjacent', hex: '#FFFFFF' },
      { name: '--surface-adjacent-2', hex: '#E1E5EB' },
    ],
  },
  {
    label: 'Success (Green)',
    swatches: [
      { name: '--success-800', hex: '#006632' },
      { name: '--success-700', hex: '#009147' },
      { name: '--success-600', hex: '#4DB27E' },
      { name: '--success-400', hex: '#80C8A3' },
      { name: '--success-200', hex: '#B3DEC8' },
      { name: '--success-100', hex: '#E6F4ED' },
    ],
  },
  {
    label: 'Warning (Amber)',
    swatches: [
      { name: '--warning-600', hex: '#B86700' },
      { name: '--warning-500', hex: '#E98300' },
      { name: '--warning-400', hex: '#FF9D1F' },
      { name: '--warning-300', hex: '#FFB352' },
      { name: '--warning-200', hex: '#FFC985' },
      { name: '--warning-100', hex: '#FFE0B8' },
    ],
  },
  {
    label: 'Destructive (Red)',
    swatches: [
      { name: '--destructive-600', hex: '#CC001B' },
      { name: '--destructive-550', hex: '#FF0022' },
      { name: '--destructive-400', hex: '#FF4D64' },
      { name: '--destructive-300', hex: '#FF8091' },
      { name: '--destructive-200', hex: '#FFCCD3' },
      { name: '--destructive-100', hex: '#FFE6E9' },
    ],
  },
]

export function ColorsPage() {
  return (
    <div className="foundation-page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-primary)' }}>
          Colors
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          Design system color tokens. All colors are available as CSS custom properties.
          Use the variable name (e.g. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>var(--accent-600)</code>) in components.
        </p>
      </div>

      {colorGroups.map(group => (
        <div key={group.label} style={{ marginBottom: 40 }}>
          <div className="section-header">{group.label}</div>
          <div className="swatch-grid">
            {group.swatches.map(swatch => (
              <div key={swatch.name} className="swatch">
                <div
                  className="swatch__color"
                  style={{ background: swatch.hex }}
                />
                <div className="swatch__name">{swatch.name}</div>
                <div className="swatch__hex">{swatch.hex}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
