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
  const isTemplate = entry.tier === 'templates'

  return (
    <div className={['preview-frame', isTemplate ? 'preview-frame--template' : ''].filter(Boolean).join(' ')}>
      {/* Meta: title, description, source */}
      <div className={isTemplate ? 'preview-frame__meta--padded' : ''}>
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

        {!isTemplate && <div className="section-header">Variants</div>}
      </div>

      {/* VARIANTS */}
      <VariantGrid entry={entry} standalone={isTemplate} />

      {/* PROPS & USAGE — skip for prototypes and templates */}
      {!isPrototype && !isTemplate && entry.props && entry.props.length > 0 && (
        <div className="preview-frame__meta--padded">
          <div className="section-header">Props</div>
          <PropTable props={entry.props} />
        </div>
      )}

      {!isPrototype && !isTemplate && (
        <div className="preview-frame__meta--padded">
          <div className="section-header">Usage</div>
          <CodeBlock code={buildUsageSnippet(entry)} />
        </div>
      )}

      {/* PROPS & USAGE for templates — shown below variants */}
      {isTemplate && entry.props && entry.props.length > 0 && (
        <div className="preview-frame__meta--padded">
          <div className="section-header" style={{ marginTop: 48 }}>Props</div>
          <PropTable props={entry.props} />
          <div className="section-header">Usage</div>
          <CodeBlock code={buildUsageSnippet(entry)} />
        </div>
      )}

      {/* NOTES — per-component documentation sections */}
      {entry.notes && entry.notes.length > 0 && (
        <div className="preview-frame__meta--padded">
          {entry.notes.map((note, i) => (
            <div key={i} style={{ marginTop: i === 0 ? 48 : 32 }}>
              <div className="section-header">{note.title}</div>
              <p className="preview-frame__note-body">{note.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
