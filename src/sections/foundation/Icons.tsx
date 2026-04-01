import { useState } from 'react'

const sizes = [
  { label: 'xs', px: '12px', class: 'text-[12px]' },
  { label: 'sm', px: '14px', class: 'text-[14px]' },
  { label: 'md', px: '16px', class: 'text-[16px]' },
  { label: 'lg', px: '20px', class: 'text-[20px]' },
  { label: 'xl', px: '24px', class: 'text-[24px]' },
]

const iconGroups = [
  {
    label: 'Navigation & Actions',
    icons: [
      'fa-chevron-right', 'fa-chevron-left', 'fa-chevron-down', 'fa-chevron-up',
      'fa-arrow-right', 'fa-arrow-left', 'fa-arrow-up', 'fa-arrow-down',
      'fa-xmark', 'fa-plus', 'fa-minus', 'fa-check',
      'fa-magnifying-glass', 'fa-bars', 'fa-ellipsis', 'fa-ellipsis-vertical',
    ],
  },
  {
    label: 'Status & Feedback',
    icons: [
      'fa-circle-check', 'fa-circle-info', 'fa-circle-exclamation', 'fa-triangle-exclamation',
      'fa-circle-xmark', 'fa-star', 'fa-bookmark', 'fa-bell',
      'fa-lock', 'fa-lock-open', 'fa-shield', 'fa-shield-check',
    ],
  },
  {
    label: 'Insurance & Finance',
    icons: [
      'fa-car', 'fa-motorcycle', 'fa-truck', 'fa-house',
      'fa-heart-pulse', 'fa-plane', 'fa-umbrella', 'fa-file-contract',
      'fa-coins', 'fa-wallet', 'fa-credit-card', 'fa-receipt',
      'fa-chart-line', 'fa-percent', 'fa-money-bill', 'fa-hand-holding-dollar',
    ],
  },
  {
    label: 'Users & Account',
    icons: [
      'fa-user', 'fa-user-check', 'fa-user-plus', 'fa-users',
      'fa-id-card', 'fa-address-card', 'fa-phone', 'fa-envelope',
      'fa-gear', 'fa-sliders', 'fa-pen', 'fa-trash',
    ],
  },
  {
    label: 'Files & Data',
    icons: [
      'fa-file', 'fa-file-pdf', 'fa-file-image', 'fa-folder',
      'fa-upload', 'fa-download', 'fa-floppy-disk', 'fa-copy',
      'fa-share-nodes', 'fa-link', 'fa-qrcode', 'fa-barcode',
    ],
  },
  {
    label: 'UI Elements',
    icons: [
      'fa-calendar', 'fa-calendar-lines-pen', 'fa-clock', 'fa-hourglass',
      'fa-sun', 'fa-moon', 'fa-eye', 'fa-eye-slash',
      'fa-filter', 'fa-sort', 'fa-sort-up', 'fa-sort-down',
      'fa-grid', 'fa-list', 'fa-table', 'fa-map',
    ],
  },
]

const codeBlock = (code: string) => (
  <pre
    style={{
      background: 'var(--primary-100)',
      border: '1px solid var(--primary-200)',
      borderRadius: 6,
      padding: '12px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--primary-800)',
      overflowX: 'auto',
      margin: 0,
    }}
  >
    <code>{code}</code>
  </pre>
)

export function IconsPage() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  const filteredGroups = iconGroups
    .map(g => ({ ...g, icons: g.icons.filter(i => i.includes(query.toLowerCase())) }))
    .filter(g => g.icons.length > 0)

  return (
    <div className="foundation-page">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-primary)' }}>
          Icons
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          Trusti DS uses{' '}
          <strong>Font Awesome 6 Pro</strong> loaded via kit{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--primary-100)', padding: '1px 5px', borderRadius: 4 }}>
            5414e64bc6
          </code>. Icons are wrapped by the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--primary-100)', padding: '1px 5px', borderRadius: 4 }}>Icon</code> atom for
          consistent sizing and accessibility.
        </p>
      </div>

      {/* Icon atom usage */}
      <div className="section-header">Using the Icon atom</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {codeBlock(
`import { Icon } from '@/components/atoms/Icon'

<Icon name="fa-star" />                          // solid 16px (defaults)
<Icon name="fa-chevron-right" size="lg" />       // 20px
<Icon name="fa-user" weight="regular" />         // regular weight
<Icon name="fa-check" size="sm" className="text-[var(--success-700)]" />
<Icon name="fa-bell" label="Notifications" />    // accessible, role="img"`
        )}
      </div>

      {/* Sizes */}
      <div className="section-header">Sizes</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 32,
          padding: '24px',
          background: 'var(--primary-100)',
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        {sizes.map(s => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <i
              className={`fa-solid fa-star`}
              style={{ fontSize: s.px, color: 'var(--accent-600)' }}
              aria-hidden="true"
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--primary-900)' }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary-500)' }}>
                {s.px}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weights */}
      <div className="section-header">Weights</div>
      <div style={{ display: 'flex', gap: 40, padding: '24px', background: 'var(--primary-100)', borderRadius: 8, marginBottom: 40 }}>
        {(['solid', 'regular'] as const).map(w => (
          <div key={w} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <i
              className={w === 'solid' ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
              style={{ fontSize: 28, color: 'var(--primary-900)' }}
              aria-hidden="true"
            />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary-700)' }}>
              weight="{w}"
            </code>
          </div>
        ))}
        <div style={{ borderLeft: '1px solid var(--primary-200)', paddingLeft: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
            FA class mapping:
          </p>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary-700)' }}>solid → fa-solid</code>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary-700)' }}>regular → fa-regular</code>
        </div>
      </div>

      {/* Colors */}
      <div className="section-header">Colors</div>
      <div style={{ display: 'flex', gap: 24, padding: '24px', background: 'var(--primary-100)', borderRadius: 8, marginBottom: 40, flexWrap: 'wrap' }}>
        {[
          { label: 'primary-900', color: 'var(--primary-900)' },
          { label: 'primary-600', color: 'var(--primary-600)' },
          { label: 'primary-400', color: 'var(--primary-400)' },
          { label: 'accent-600', color: 'var(--accent-600)' },
          { label: 'success-700', color: 'var(--success-700)' },
          { label: 'destructive-600', color: 'var(--destructive-600)' },
          { label: 'warning-500', color: 'var(--warning-500)' },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <i className="fa-solid fa-circle" style={{ fontSize: 20, color }} aria-hidden="true" />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary-700)' }}>
              --{label}
            </code>
          </div>
        ))}
      </div>

      {/* Raw HTML usage */}
      <div className="section-header">Raw HTML (without the atom)</div>
      <div style={{ marginBottom: 40 }}>
        {codeBlock(
`<!-- Solid (default) -->
<i class="fa-solid fa-house" aria-hidden="true"></i>

<!-- Regular -->
<i class="fa-regular fa-heart" aria-hidden="true"></i>

<!-- With custom color -->
<i class="fa-solid fa-star" style="color: var(--accent-600)"></i>

<!-- Accessible with label -->
<i class="fa-solid fa-bell" role="img" aria-label="Notifications"></i>`
        )}
      </div>

      {/* Icon gallery */}
      <div className="section-header">Icon gallery</div>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
        Click any icon to copy its name. Use the copied name as the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--primary-100)', padding: '1px 5px', borderRadius: 4 }}>name</code> prop on the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--primary-100)', padding: '1px 5px', borderRadius: 4 }}>Icon</code> atom.
      </p>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 24, maxWidth: 320 }}>
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--primary-400)', pointerEvents: 'none' }}
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search icons..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px 8px 36px',
            fontSize: 13,
            border: '1px solid var(--primary-300)',
            borderRadius: 6,
            background: 'var(--surface-adjacent)',
            color: 'var(--primary-900)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {filteredGroups.map(group => (
        <div key={group.label} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            {group.label}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {group.icons.map(icon => (
              <button
                key={icon}
                onClick={() => handleCopy(icon)}
                title={icon}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  width: 80,
                  padding: '12px 6px',
                  background: copied === icon ? 'var(--accent-100)' : 'var(--surface-adjacent)',
                  border: `1px solid ${copied === icon ? 'var(--accent-300)' : 'var(--primary-200)'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (copied !== icon) {
                    (e.currentTarget as HTMLElement).style.background = 'var(--primary-100)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--primary-300)'
                  }
                }}
                onMouseLeave={e => {
                  if (copied !== icon) {
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface-adjacent)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--primary-200)'
                  }
                }}
              >
                <i
                  className={`fa-solid ${icon}`}
                  style={{ fontSize: 18, color: copied === icon ? 'var(--accent-600)' : 'var(--primary-700)' }}
                  aria-hidden="true"
                />
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: copied === icon ? 'var(--accent-700)' : 'var(--primary-500)', lineHeight: 1.2, textAlign: 'center', wordBreak: 'break-all' }}>
                  {copied === icon ? 'copied!' : icon.replace('fa-', '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {filteredGroups.length === 0 && (
        <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--primary-400)', fontSize: 14 }}>
          No icons match "{query}"
        </div>
      )}
    </div>
  )
}
