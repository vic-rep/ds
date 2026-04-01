import React from 'react'

interface ErrorBoundaryState {
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  sourceFile?: string
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="cannot-render">
          <div className="cannot-render__title">Cannot render component</div>
          <div className="cannot-render__message">{this.state.error.message}</div>
          {this.props.sourceFile && (
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              {this.props.sourceFile}
            </div>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
