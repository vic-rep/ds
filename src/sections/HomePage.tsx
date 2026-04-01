import { registry } from '../registry'

// Foundation/atom pages: Colors, Typography, Spacing, Tokens, Icons
const FOUNDATION_COUNT = 5

export function HomePage() {
  const counts = {
    atoms: FOUNDATION_COUNT + registry.filter(c => c.tier === 'atoms').length,
    molecules: registry.filter(c => c.tier === 'molecules').length,
    organisms: registry.filter(c => c.tier === 'organisms').length,
  }
  const total = registry.length

  return (
    <div className="home-screen">
      <div className="home-screen__title">Trusti DS</div>
      <p className="home-screen__subtitle">
        A living component explorer for the Trusti design system.
        Browse components by atomic tier, inspect props, and preview
        all variants in isolation.
      </p>
      <div className="home-screen__stats">
        <div>
          <div className="home-screen__stat-value">{total}</div>
          <div className="home-screen__stat-label">Components</div>
        </div>
        <div>
          <div className="home-screen__stat-value">{counts.atoms}</div>
          <div className="home-screen__stat-label">Atoms</div>
        </div>
        <div>
          <div className="home-screen__stat-value">{counts.molecules}</div>
          <div className="home-screen__stat-label">Molecules</div>
        </div>
        <div>
          <div className="home-screen__stat-value">{counts.organisms}</div>
          <div className="home-screen__stat-label">Organisms</div>
        </div>
      </div>
    </div>
  )
}
