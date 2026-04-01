import { useParams } from 'react-router-dom'
import { getById } from '../registry'
import { VariantGrid } from '../components/VariantGrid'
import { PropTable } from '../components/PropTable'
import { CodeBlock } from '../components/CodeBlock'

function buildUsageSnippet(entry: ReturnType<typeof getById>): string {
  if (!entry) return ''
  const firstVariant = entry.variants[0]
  if (!firstVariant) return `<${entry.name} />`

  const propsStr = Object.entries(firstVariant.props)
    .map(([k, v]) => {
      if (typeof v === 'boolean') return v ? k : `${k}={false}`
      if (typeof v === 'string') return `${k}="${v}"`
      return `${k}={${JSON.stringify(v)}}`
    })
    .join('\n  ')

  if (!propsStr) return `<${entry.name} />`
  return `<${entry.name}\n  ${propsStr}\n/>`
}

export function PreviewFrame() {
  const { tier, id } = useParams<{ tier: string; id: string }>()
  const entry = getById(id ?? '')

  if (!entry) {
    return (
      <div className="preview-frame">
        <div style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>
          Component not found: <code style={{ fontFamily: 'var(--font-mono)' }}>{id}</code>
        </div>
      </div>
    )
  }

  const isPrototype = entry.tier === 'prototypes'

  return (
    <div className="preview-frame">
      <div className="preview-frame__title-row">
        <h1 className="preview-frame__title">{entry.name}</h1>
        {entry.status && (
          <span className={`preview-frame__status-badge status-${entry.status}`}>
            {entry.status}
          </span>
        )}
      </div>

      <p className="preview-frame__description">{entry.description}</p>

      {entry.sourceFile && (
        <div className="preview-frame__source">{entry.sourceFile}</div>
      )}

      {/* VARIANTS */}
      <div className="section-header">Variants</div>
      <VariantGrid entry={entry} />

      {/* PROPS — skip for prototypes */}
      {!isPrototype && entry.props && entry.props.length > 0 && (
        <>
          <div className="section-header">Props</div>
          <PropTable props={entry.props} />
        </>
      )}

      {/* USAGE */}
      {!isPrototype && (
        <>
          <div className="section-header">Usage</div>
          <CodeBlock code={buildUsageSnippet(entry)} />
        </>
      )}
    </div>
  )
}
