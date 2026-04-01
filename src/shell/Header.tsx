import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function Header() {
  const { tier } = useParams<{ tier?: string }>()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  return (
    <header className="shell-header">
      <div
        className="shell-header__logo"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <img src="/trusti-fav.png" alt="Trusti" style={{ height: 28, width: 'auto' }} />
        <span className="shell-header__logo-text">Trusti DS</span>
      </div>

      <input
        className="shell-header__search"
        type="text"
        placeholder="Search components..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {tier && (
        <div className="shell-header__tier-badge">{tier}</div>
      )}
    </header>
  )
}
