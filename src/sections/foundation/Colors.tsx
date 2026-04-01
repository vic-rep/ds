import { useState, useEffect } from 'react'

const colorGroups = [
  {
    label: 'Accent',
    note: 'Orange in default · Lime-green in Rebrand',
    swatches: [
      '--accent-900', '--accent-800', '--accent-700', '--accent-600',
      '--accent-500', '--accent-400', '--accent-300', '--accent-200', '--accent-100',
    ],
  },
  {
    label: 'Tertiary',
    note: 'Matches Accent in default · Purple in Rebrand',
    swatches: [
      '--tertiary-900', '--tertiary-800', '--tertiary-700', '--tertiary-600',
      '--tertiary-500', '--tertiary-400', '--tertiary-300', '--tertiary-200', '--tertiary-100',
    ],
  },
  {
    label: 'Primary',
    note: 'Neutral scale · Inverted in dark modes',
    swatches: [
      '--primary-900', '--primary-800', '--primary-700', '--primary-600',
      '--primary-500', '--primary-400', '--primary-300', '--primary-200', '--primary-100',
    ],
  },
  {
    label: 'Surface',
    note: 'Background layering tokens',
    swatches: ['--surface', '--surface-adjacent', '--surface-adjacent-2'],
  },
  {
    label: 'Success',
    swatches: [
      '--success-800', '--success-700', '--success-600',
      '--success-400', '--success-200', '--success-100',
    ],
  },
  {
    label: 'Warning',
    swatches: [
      '--warning-600', '--warning-500', '--warning-400',
      '--warning-300', '--warning-200', '--warning-100',
    ],
  },
  {
    label: 'Destructive',
    swatches: [
      '--destructive-600', '--destructive-550', '--destructive-500',
      '--destructive-400', '--destructive-300', '--destructive-200', '--destructive-100',
    ],
  },
  {
    label: 'Constants',
    note: 'Never change between modes',
    swatches: ['--constant-white', '--constant-black', '--brand'],
  },
]

const ALL_TOKENS = colorGroups.flatMap(g => g.swatches)

function useTokenValues() {
  const read = () => {
    const s = getComputedStyle(document.documentElement)
    const out: Record<string, string> = {}
    ALL_TOKENS.forEach(t => {
      out[t] = s.getPropertyValue(t).trim().toUpperCase()
    })
    return out
  }

  const [values, setValues] = useState<Record<string, string>>(read)

  useEffect(() => {
    const obs = new MutationObserver(() => setValues(read()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return values
}

export function ColorsPage() {
  const values = useTokenValues()

  return (
    <div className="foundation-page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-primary)' }}>
          Colors
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          All colors are CSS custom properties. Switch modes using the header controls — the palette updates live.
          Use <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>var(--accent-600)</code> in components.
        </p>
      </div>

      {colorGroups.map(group => (
        <div key={group.label} style={{ marginBottom: 40 }}>
          <div className="section-header">{group.label}</div>
          {group.note && (
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 12, marginTop: 4 }}>
              {group.note}
            </p>
          )}
          <div className="swatch-grid">
            {group.swatches.map(token => (
              <div key={token} className="swatch">
                <div
                  className="swatch__color"
                  style={{ background: `var(${token})` }}
                />
                <div className="swatch__name">{token}</div>
                <div className="swatch__hex">{values[token] || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
