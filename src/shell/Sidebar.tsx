import { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppNav, type NavItem } from '@/components/templates/AppNav'
import { registry } from '../registry'

/* ── Nav item definitions ──────────────────────────────────────────────── */

const FOUNDATION_CHILDREN = [
  { id: 'foundation/colors',     label: 'Colors' },
  { id: 'foundation/typography', label: 'Typography' },
  { id: 'foundation/spacing',    label: 'Spacing' },
  { id: 'foundation/tokens',     label: 'Tokens' },
  { id: 'foundation/icons',      label: 'Icons' },
]

const TIER_CONFIG = [
  { tier: 'molecules', label: 'Molecules', icon: 'fa-cubes' },
  { tier: 'organisms', label: 'Organisms', icon: 'fa-sitemap' },
  { tier: 'templates', label: 'Templates', icon: 'fa-table-columns' },
  { tier: 'pages',     label: 'Pages',     icon: 'fa-file-lines' },
] as const

function buildNavItems(): NavItem[] {
  const items: NavItem[] = [
    {
      id: 'atoms',
      label: 'Atoms',
      icon: 'fa-atom',
      children: FOUNDATION_CHILDREN,
    },
  ]

  for (const { tier, label, icon } of TIER_CONFIG) {
    const entries = registry.filter(e => e.tier === tier)
    if (entries.length === 0) continue
    items.push({
      id: tier,
      label,
      icon,
      children: entries.map(e => ({ id: `${tier}/${e.id}`, label: e.name })),
    })
  }

  return items
}

const NAV_ITEMS = buildNavItems()

/* ── Sidebar ───────────────────────────────────────────────────────────── */

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  // Derive active child id from current path: "/foundation/colors" → "foundation/colors"
  const activeId = location.pathname.replace(/^\//, '') || undefined

  const handleNavigate = useCallback((id: string) => {
    if (collapsed) {
      setCollapsed(false)
      return
    }
    navigate(`/${id}`)
  }, [navigate, collapsed])

  const prototypes = registry.filter(e => e.tier === 'prototypes')

  return (
    <nav className={`shell-sidebar${collapsed ? ' shell-sidebar--collapsed' : ''}`}>

      {/* Scrollable nav area */}
      <div className="shell-sidebar__scroll">
        <AppNav
          items={NAV_ITEMS}
          activeId={activeId}
          sectionLabel="MENU"
          defaultOpenIds={['atoms', 'molecules', 'templates']}
          onNavigate={handleNavigate}
          collapsed={collapsed}
        />

        {!collapsed && (
          <>
            <hr className="sidebar-divider" />
            <div className="sidebar-divider-label">Prototypes</div>
            {prototypes.map(entry => (
              <a
                key={entry.id}
                href={entry.url ?? `/proto/${entry.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-item"
              >
                {entry.name}
                <span style={{ marginLeft: 'auto', opacity: 0.35, fontSize: 10 }}>↗</span>
              </a>
            ))}
          </>
        )}
      </div>

      {/* Collapse toggle pinned to bottom */}
      <button
        className="shell-sidebar__collapse-btn"
        onClick={() => setCollapsed(c => !c)}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <i className={`fa-regular fa-chevron-${collapsed ? 'right' : 'left'}`} />
        {!collapsed && <span>Collapse</span>}
      </button>

    </nav>
  )
}
