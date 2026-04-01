import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ColorMode = 'light' | 'dark' | 'light-rebrand' | 'dark-rebrand'

const MODES: { id: ColorMode; label: string; accent: string }[] = [
  { id: 'light',        label: 'Light',    accent: '#F76803' },
  { id: 'dark',         label: 'Dark',     accent: '#F76803' },
  { id: 'light-rebrand',label: 'Rebrand',  accent: '#B9E856' },
  { id: 'dark-rebrand', label: 'Rebrand ◑',accent: '#B9E856' },
]

const STORAGE_KEY = 'ds-color-mode'

function applyMode(mode: ColorMode) {
  const html = document.documentElement
  html.classList.remove('dark', 'light-rebrand', 'dark-rebrand')
  if (mode === 'dark')          html.classList.add('dark')
  if (mode === 'light-rebrand') html.classList.add('light-rebrand')
  if (mode === 'dark-rebrand')  html.classList.add('dark', 'dark-rebrand')
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useColorMode(): [ColorMode, (m: ColorMode) => void] {
  const [mode, setModeState] = useState<ColorMode>(() => {
    return (localStorage.getItem(STORAGE_KEY) as ColorMode) ?? 'light'
  })

  useEffect(() => {
    applyMode(mode)
  }, [mode])

  // Apply on first mount
  useEffect(() => {
    applyMode(mode)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setMode = (m: ColorMode) => {
    setModeState(m)
    localStorage.setItem(STORAGE_KEY, m)
  }

  return [mode, setMode]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ThemeSwitcher() {
  const [mode, setMode] = useColorMode()

  return (
    <div className="theme-switcher" role="group" aria-label="Color mode">
      {MODES.map(m => (
        <button
          key={m.id}
          className={`theme-switcher__btn${mode === m.id ? ' theme-switcher__btn--active' : ''}`}
          onClick={() => setMode(m.id)}
          aria-pressed={mode === m.id}
          title={`Switch to ${m.label}`}
          style={{ '--mode-accent': m.accent } as React.CSSProperties}
        >
          <span className="theme-switcher__dot" />
          {m.label}
        </button>
      ))}
    </div>
  )
}
