import type { PropDef } from '../registry'

interface PropTableProps {
  props: PropDef[]
}

export function PropTable({ props }: PropTableProps) {
  if (props.length === 0) return null

  return (
    <table className="prop-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Required</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map(prop => (
          <tr key={prop.name}>
            <td><span className="prop-table__name">{prop.name}</span></td>
            <td><span className="prop-table__type">{prop.type}</span></td>
            <td>
              <span className={`prop-table__required prop-table__required--${prop.required ? 'yes' : 'no'}`}>
                {prop.required ? '✓' : '–'}
              </span>
            </td>
            <td>
              {prop.default
                ? <span className="prop-table__default">{prop.default}</span>
                : <span style={{ color: 'var(--color-text-muted)' }}>–</span>
              }
            </td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
