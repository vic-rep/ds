import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { registry, type Tier } from '../registry'

const TIERS: { tier: Tier; label: string }[] = [
  { tier: 'foundation', label: 'Atoms' },
  { tier: 'atoms', label: 'Atoms' },
  { tier: 'molecules', label: 'Molecules' },
  { tier: 'organisms', label: 'Organisms' },
  { tier: 'templates', label: 'Templates' },
  { tier: 'pages', label: 'Pages' },
]

const FOUNDATION_LINKS = [
  { id: 'colors', name: 'Colors' },
  { id: 'typography', name: 'Typography' },
  { id: 'spacing', name: 'Spacing' },
  { id: 'tokens', name: 'Tokens' },
  { id: 'icons', name: 'Icons' },
]

function TierGroup({ tier, label }: { tier: Tier; label: string }) {
  const location = useLocation()
  const items = tier === 'foundation' ? null : registry.filter(c => c.tier === tier)
  const foundationItems = tier === 'foundation' ? FOUNDATION_LINKS : null

  const isActive = location.pathname.startsWith(`/${tier}/`)
  const [open, setOpen] = useState(isActive || tier === 'foundation' || tier === 'atoms' || tier === 'molecules')

  const count = items?.length ?? foundationItems?.length ?? 0
  if (count === 0 && tier !== 'foundation') return null

  return (
    <div className="sidebar-group">
      <button className="sidebar-group__header" onClick={() => setOpen(o => !o)}>
        <span>{label}</span>
        <span className={`sidebar-group__chevron ${open ? 'sidebar-group__chevron--open' : ''}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="sidebar-group__items">
          {tier === 'foundation' && foundationItems!.map(item => (
            <NavLink
              key={item.id}
              to={`/foundation/${item.id}`}
              className={({ isActive }) =>
                `sidebar-item${isActive ? ' sidebar-item--active' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {tier !== 'foundation' && items!.map(entry => (
            <NavLink
              key={entry.id}
              to={`/${entry.tier}/${entry.id}`}
              className={({ isActive }) =>
                `sidebar-item${isActive ? ' sidebar-item--active' : ''}`
              }
            >
              {entry.status && (
                <span className={`sidebar-item__dot sidebar-item__dot--${entry.status}`} />
              )}
              {entry.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const location = useLocation()
  const prototypes = registry.filter(c => c.tier === 'prototypes')

  return (
    <nav className="shell-sidebar">
      {TIERS.map(({ tier, label }) => (
        <TierGroup key={tier} tier={tier} label={label} />
      ))}

      <hr className="sidebar-divider" />
      <div className="sidebar-divider-label">Prototypes</div>

      {prototypes.map(entry => (
        <a
          key={entry.id}
          href={entry.url ?? `/prototypes/${entry.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-item"
        >
          {entry.status && (
            <span className={`sidebar-item__dot sidebar-item__dot--${entry.status}`} />
          )}
          {entry.name}
          <span style={{ marginLeft: 'auto', opacity: 0.35, fontSize: 10 }}>↗</span>
        </a>
      ))}

      {prototypes.length === 0 && (
        <div style={{ padding: '6px 20px', fontSize: 12, color: 'var(--color-text-muted)' }}>
          No prototypes yet
        </div>
      )}
    </nav>
  )
}
