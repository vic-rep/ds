import React from 'react'
import { Button } from '@/components/molecules/Button'
import { Typography } from '@/components/atoms/Typography'
import { Icon } from '@/components/atoms/Icon'
import { LeasingProgressBar } from '../components/LeasingProgressBar'
import { leasingCompanies, type LeasingCompany } from '../data/mockCompanies'

const EUR_TO_BGN = 1.956
const fmt = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')

const calcMonthly = (loanEur: number) => ({
  monthlyEur: Math.round(loanEur / 80),
  monthlyBgn: Math.round((loanEur / 80) * EUR_TO_BGN),
})

function CompanyLogo({ company }: { company: LeasingCompany }) {
  return (
    <div className="flex items-center gap-[var(--s)]">
      <div className="w-[32px] h-[32px] rounded-[var(--radius-lg)] flex items-center justify-center shrink-0"
        style={{
          background: company.colorPrimary + '18',
          border: `1.5px solid ${company.colorPrimary}30`,
        }}>
        <Typography variant="caption" as="span" className="font-black"
          style={{ color: company.colorPrimary }}>
          {company.name[0].toUpperCase()}
        </Typography>
      </div>
      <Typography variant="textM" as="span" className="font-bold" style={{ color: company.colorPrimary, letterSpacing: '-0.01em' }}>
        {company.name}
      </Typography>
    </div>
  )
}

interface Step2Props {
  loanAmount: number
  selectedCompanyIds: string[]
  onToggleCompany: (id: string) => void
  onContinue: () => void
  onBack: () => void
}

export function Step2Results({
  loanAmount,
  selectedCompanyIds,
  onToggleCompany,
  onContinue,
  onBack,
}: Step2Props) {
  const downPayment = Math.round(loanAmount * 0.25)
  const { monthlyEur, monthlyBgn } = calcMonthly(loanAmount)
  const selCount = selectedCompanyIds.length

  const filterTags = [
    { icon: 'fa-euro-sign',    label: `${fmt(loanAmount)} € / ${fmt(loanAmount * EUR_TO_BGN)} лв.` },
    { icon: 'fa-sack-dollar',  label: `${fmt(downPayment)} € / ${fmt(downPayment * EUR_TO_BGN)} лв.` },
    { icon: 'fa-clock',        label: '36 м.' },
  ]

  return (
    <div className="bg-[var(--surface)] font-sans w-full min-h-full flex flex-col">

      <LeasingProgressBar title="Изберете оферта" progress={50} onBack={onBack} />

      <div className="flex-1 px-[var(--xl)] pt-[var(--xl)] pb-[120px] max-w-[480px] w-full mx-auto box-border">

        <Typography variant="h2" className="text-center mb-[var(--l)]" style={{ letterSpacing: '-0.02em' }}>
          Изберете офертa
        </Typography>

        {/* Filter bar */}
        <div className="flex items-center justify-between gap-[var(--s)] mb-[var(--l)] flex-wrap">
          <div className="flex flex-wrap gap-[var(--s)] flex-1">
            {filterTags.map(tag => (
              <div key={tag.label}
                className="flex items-center gap-[var(--s)] border border-[var(--primary-200)] rounded-[var(--radius-sm)] px-[var(--s)] py-[var(--xxs)] bg-[var(--surface-adjacent)]">
                <Icon name={tag.icon} size="xs" weight="solid" className="text-[var(--primary-400)]" />
                <Typography variant="caption">{tag.label}</Typography>
              </div>
            ))}
          </div>
          <button className="bg-transparent border-none cursor-pointer p-[var(--s)] flex rounded-full text-[var(--primary-600)]">
            <Icon name="fa-gear" size="lg" />
          </button>
        </div>

        {/* Offer list */}
        <div className="flex flex-col gap-[var(--m)]">
          {leasingCompanies.map(company => {
            const selected = selectedCompanyIds.includes(company.id)
            return (
              <div
                key={company.id}
                role="checkbox"
                aria-checked={selected}
                tabIndex={0}
                onClick={() => onToggleCompany(company.id)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggleCompany(company.id)}
                className="bg-[var(--surface-adjacent)] rounded-[var(--radius-lg)] px-[var(--l)] py-[var(--m)] flex items-center justify-between cursor-pointer min-h-[65px] transition-all duration-150 outline-none"
                style={{
                  boxShadow: 'var(--elevation-level2)',
                  border: selected ? '1.5px solid var(--accent-600)' : '1.5px solid transparent',
                }}
              >
                {/* Left: checkbox + logo */}
                <div className="flex items-center gap-[var(--m)]">
                  {/* Checkbox */}
                  <div className="w-[24px] h-[24px] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0 transition-all duration-150"
                    style={{
                      background: selected ? 'var(--accent-600)' : 'transparent',
                      border: `2px solid ${selected ? 'var(--accent-600)' : 'var(--primary-300)'}`,
                    }}>
                    {selected && <Icon name="fa-check" size="xs" weight="solid" className="text-white" />}
                  </div>
                  <CompanyLogo company={company} />
                </div>

                {/* Right: monthly payment */}
                <div className="flex flex-col items-start min-w-[80px]">
                  <Typography variant="caption" color="muted" className="mb-[var(--xxs)]">Вноска</Typography>
                  <div className="flex items-baseline gap-[var(--xxs)]">
                    <Typography variant="h5" as="span" className="!font-bold">{fmt(monthlyBgn)}</Typography>
                    <Typography variant="textSm" color="muted" as="span">лв</Typography>
                  </div>
                  <Typography variant="caption" color="muted">{monthlyEur.toFixed(2)} euro</Typography>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sticky bottom bar */}
      {selCount > 0 && (
        <div className="sticky bottom-0 bg-[var(--surface-adjacent)] border-t border-[var(--primary-200)] px-[var(--xl)] py-[var(--m)] flex items-center justify-between gap-[var(--m)]"
          style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.06)' }}>
          <Typography variant="textSm" color="secondary" className="font-medium">
            {selCount === 1 ? '1 оферта избрана' : `${selCount} оферти избрани`}
          </Typography>
          <Button variant="primary" size="l" trailingIcon="fa-arrow-right" onClick={onContinue}>
            Продължи
          </Button>
        </div>
      )}
    </div>
  )
}
