import React from 'react'
import { ProgressBar } from '@/components/molecules/ProgressBar'

interface LeasingProgressBarProps {
  title: string
  /** 0–100 percentage fill */
  progress: number
  onBack: () => void
}

/** Wraps the DS ProgressBar molecule, mapping a raw percentage to currentStep/totalSteps */
export function LeasingProgressBar({ title, progress, onBack }: LeasingProgressBarProps) {
  return (
    <div className="bg-[var(--surface-adjacent)] px-[var(--xl)] pt-[var(--m)] sticky top-0 z-10"
      style={{ boxShadow: 'var(--elevation-level1)' }}>
      <ProgressBar
        currentStep={progress}
        totalSteps={100}
        stepLabel={title}
        showBack
        onBack={onBack}
      />
    </div>
  )
}
