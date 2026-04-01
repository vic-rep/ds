// All design tokens extracted from tokens.css, grouped by category
const tokenGroups = [
  {
    label: 'Font',
    tokens: [
      { name: '--font-sans', value: "'Source Sans 3', system-ui, sans-serif" },
    ],
  },
  {
    label: 'Border Radius',
    tokens: [
      { name: '--radius-sm', value: '4px' },
      { name: '--radius-md', value: '6px' },
      { name: '--radius-lg', value: '8px' },
      { name: '--radius-xl', value: '12px' },
      { name: '--radius-full', value: '9999px' },
    ],
  },
  {
    label: 'Elevation (Box Shadows)',
    tokens: [
      { name: '--elevation-level1', value: '0px 1px 1px rgba(0,0,0,0.05), 0px 3px 3px rgba(0,0,0,0.04)...' },
      { name: '--elevation-level2', value: '0px 2px 4px rgba(0,0,0,0.05), 0px 7px 7px rgba(0,0,0,0.04)...' },
      { name: '--elevation-level3', value: '0px 3px 7px rgba(0,0,0,0.05), 0px 13px 13px rgba(0,0,0,0.04)...' },
    ],
  },
  {
    label: 'Accent (Orange)',
    tokens: [
      { name: '--accent-900', value: '#602901' },
      { name: '--accent-800', value: '#923E02' },
      { name: '--accent-700', value: '#C55302' },
      { name: '--accent-600', value: '#F76803' },
      { name: '--accent-500', value: '#FC7D21' },
      { name: '--accent-400', value: '#FD9A54' },
      { name: '--accent-300', value: '#FEB886' },
      { name: '--accent-200', value: '#FED5B8' },
      { name: '--accent-100', value: '#FFF3EB' },
    ],
  },
  {
    label: 'Primary (Neutral)',
    tokens: [
      { name: '--primary-900', value: '#191919' },
      { name: '--primary-800', value: '#333333' },
      { name: '--primary-700', value: '#4d4d4d' },
      { name: '--primary-600', value: '#666666' },
      { name: '--primary-500', value: '#808080' },
      { name: '--primary-400', value: '#999999' },
      { name: '--primary-300', value: '#cccccc' },
      { name: '--primary-200', value: '#e6e6e6' },
      { name: '--primary-100', value: '#f0f0f0' },
    ],
  },
  {
    label: 'Surface',
    tokens: [
      { name: '--surface', value: '#F3F2F0' },
      { name: '--surface-adjacent', value: '#FFFFFF' },
      { name: '--surface-adjacent-2', value: '#E1E5EB' },
    ],
  },
  {
    label: 'Spacing',
    tokens: [
      { name: '--none', value: '0px' },
      { name: '--xxs', value: '2px' },
      { name: '--xs', value: '4px' },
      { name: '--s', value: '8px' },
      { name: '--m', value: '12px' },
      { name: '--l', value: '16px' },
      { name: '--xl', value: '20px' },
      { name: '--xxl', value: '24px' },
      { name: '--3xl', value: '28px' },
      { name: '--4xl', value: '32px' },
      { name: '--5xl', value: '40px' },
      { name: '--6xl', value: '48px' },
      { name: '--7xl', value: '64px' },
      { name: '--8xl', value: '80px' },
      { name: '--max', value: '128px' },
    ],
  },
]

export function TokensPage() {
  return (
    <div className="foundation-page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-primary)' }}>
          Tokens
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          All CSS custom properties from <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>tokens.css</code>.
          Import the file directly: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>import '@vic-rep/design-system/tokens.css'</code>
        </p>
      </div>

      {tokenGroups.map(group => (
        <div key={group.label} style={{ marginBottom: 36 }}>
          <div className="section-header">{group.label}</div>
          <table className="token-table">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {group.tokens.map(token => (
                <tr key={token.name}>
                  <td>{token.name}</td>
                  <td>
                    {token.value.startsWith('#') && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: 12,
                          height: 12,
                          background: token.value,
                          borderRadius: 2,
                          border: '1px solid rgba(0,0,0,0.1)',
                          marginRight: 8,
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                    {token.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
