import React from 'react'

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4
}

const STEPS = [
  { number: 1, label: 'Оферти' },
  { number: 2, label: 'Избор' },
  { number: 3, label: 'Данни' },
  { number: 4, label: 'Потвърждение' },
] as const

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '24px 32px 16px',
      background: 'var(--color-bg)',
      borderBottom: '1px solid var(--color-line)',
    }}>
      {STEPS.map((step, i) => {
        const isCompleted = step.number < currentStep
        const isCurrent = step.number === currentStep
        const isFuture = step.number > currentStep

        return (
          <React.Fragment key={step.number}>
            {/* Step circle + label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 64 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isCompleted || isCurrent ? 'var(--accent-600)' : 'var(--surface-adjacent)',
                border: `2px solid ${isFuture ? 'var(--primary-300)' : 'var(--accent-600)'}`,
                color: isCompleted || isCurrent ? '#fff' : 'var(--primary-400)',
                fontWeight: 700,
                fontSize: 14,
                fontFamily: 'var(--font-ui)',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}>
                {isCompleted
                  ? <i className="fa-solid fa-check" style={{ fontSize: 13 }} aria-hidden="true" />
                  : step.number
                }
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: isCurrent ? 600 : 400,
                color: isCurrent ? 'var(--accent-600)' : isFuture ? 'var(--primary-400)' : 'var(--primary-600)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-ui)',
              }}>
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1,
                height: 2,
                marginTop: 17,
                background: step.number < currentStep ? 'var(--accent-600)' : 'var(--primary-200)',
                transition: 'background 0.3s ease',
              }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
