import React, { Suspense } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import type { ComponentEntry } from '../registry'

interface VariantGridProps {
  entry: ComponentEntry
  standalone?: boolean
}

function VariantPreview({
  entry,
  variantProps,
}: {
  entry: ComponentEntry
  variantProps: Record<string, unknown>
}) {
  const Comp = entry.component
  return <Comp {...variantProps} />
}

export function VariantGrid({ entry, standalone }: VariantGridProps) {
  if (standalone) {
    return (
      <div className="variant-standalone-list">
        {entry.variants.map(variant => (
          <div key={variant.label} className="variant-standalone">
            <div className="variant-standalone__label">{variant.label}</div>
            <ErrorBoundary sourceFile={entry.sourceFile}>
              <Suspense fallback={<span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</span>}>
                <VariantPreview entry={entry} variantProps={variant.props} />
              </Suspense>
            </ErrorBoundary>
          </div>
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
