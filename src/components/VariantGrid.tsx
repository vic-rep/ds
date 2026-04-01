import React, { Suspense, useState } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import type { ComponentEntry } from '../registry'

type Viewport = 'mobile' | 'tablet' | 'desktop'

const VIEWPORTS: { id: Viewport; label: string; icon: string; size?: string }[] = [
  { id: 'mobile',  label: 'Mobile',  icon: 'fa-mobile-screen',        size: '375' },
  { id: 'tablet',  label: 'Tablet',  icon: 'fa-tablet-screen-button', size: '768' },
  { id: 'desktop', label: 'Desktop', icon: 'fa-display' },
]

function ViewportSwitcher({ value, onChange }: { value: Viewport; onChange: (v: Viewport) => void }) {
  return (
    <div className="viewport-switcher">
      {VIEWPORTS.map(vp => (
        <button
          key={vp.id}
          type="button"
          className={`viewport-switcher__btn${value === vp.id ? ' viewport-switcher__btn--active' : ''}`}
          onClick={() => onChange(vp.id)}
        >
          <i className={`fa-solid ${vp.icon}`} />
          {vp.label}
          {vp.size && <span className="viewport-switcher__size">{vp.size}</span>}
        </button>
      ))}
    </div>
  )
}

interface VariantGridProps {
  entry: ComponentEntry
  standalone?: boolean
}

function VariantPreview({ entry, variantProps }: { entry: ComponentEntry; variantProps: Record<string, unknown> }) {
  const Comp = entry.component
  return <Comp {...variantProps} />
}

function StandaloneVariant({ entry, variant, viewport }: { entry: ComponentEntry; variant: ComponentEntry['variants'][number]; viewport: Viewport }) {
  return (
    <div className="variant-standalone">
      <div className="variant-standalone__toolbar">
        <span className="variant-standalone__label">{variant.label}</span>
      </div>
      <div className={`variant-viewport variant-viewport--${viewport}`}>
        <ErrorBoundary sourceFile={entry.sourceFile}>
          <Suspense fallback={<span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</span>}>
            <VariantPreview entry={entry} variantProps={variant.props} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export function VariantGrid({ entry, standalone }: VariantGridProps) {
  const [viewport, setViewport] = useState<Viewport>('desktop')

  if (standalone) {
    return (
      <div className="variant-standalone-list">
        <div className="variant-standalone-list__toolbar">
          <ViewportSwitcher value={viewport} onChange={setViewport} />
        </div>
        {entry.variants.map(variant => (
          <StandaloneVariant key={variant.label} entry={entry} variant={variant} viewport={viewport} />
        ))}
      </div>
    )
  }

  return (
    <div className="variant-grid">
      {entry.variants.map(variant => (
        <div key={variant.label} className="variant-card">
          <div
            className={[
              'variant-card__preview',
              entry.tier === 'prototypes' ? 'variant-card__preview--prototype' : '',
              variant.background === 'light' ? 'variant-card__preview--light' : '',
              variant.background === 'dark' ? 'variant-card__preview--dark' : '',
            ].filter(Boolean).join(' ')}
          >
            <ErrorBoundary sourceFile={entry.sourceFile}>
              <Suspense fallback={<span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</span>}>
                <VariantPreview entry={entry} variantProps={variant.props} />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="variant-card__label">{variant.label}</div>
        </div>
      ))}
    </div>
  )
}
