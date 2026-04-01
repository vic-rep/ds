import React, { useState, useEffect } from 'react'
import { Button } from '@/components/molecules/Button'
import { Card } from '@/components/molecules/Card'
import { Typography } from '@/components/atoms/Typography'
import { Icon } from '@/components/atoms/Icon'
import { leasingCompanies } from '../data/mockCompanies'

const EUR_TO_BGN = 1.956
const fmt = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')

interface Step4Props {
  loanAmount: number
  selectedCompanyIds: string[]
  onReset: () => void
}

export function Step4ThankYou({ loanAmount, selectedCompanyIds, onReset }: Step4Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const downPayment = Math.round(loanAmount * 0.25)
  const selectedCompanies = leasingCompanies.filter(c => selectedCompanyIds.includes(c.id))

  return (
    <div className="font-sans w-full min-h-full flex flex-col bg-[var(--surface)]">

      {/* ── Navbar ── */}
      <header className="bg-[var(--surface-adjacent)] flex items-center justify-between px-[var(--xl)] py-[var(--m)] shrink-0"
        style={{ boxShadow: '0 1px 0 var(--primary-200)' }}>
        <button className="bg-transparent border-none cursor-pointer p-[var(--xs)] flex" aria-label="Меню">
          <Icon name="fa-bars" size="md" />
        </button>
        <div className="flex items-center gap-[var(--s)]">
          <img src="/trusti-fav.png" alt="" style={{ height: 22, width: 'auto' }} />
          <Typography variant="h6" as="span" style={{ letterSpacing: '-0.02em' }}>trusti</Typography>
        </div>
        <button className="bg-transparent border-none cursor-pointer p-[var(--xs)] flex" aria-label="Профил">
          <Icon name="fa-user" size="md" weight="regular" />
        </button>
      </header>

      {/* ── Content ── */}
      <div className="flex-1 transition-all duration-[400ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
        }}>

        {/* Success block */}
        <div className="bg-[var(--surface-adjacent)] px-[var(--xl)] pt-[var(--4xl)] pb-[var(--xxl)] mb-[var(--s)]">
          <div className="max-w-[440px] mx-auto">

            {/* Green checkmark */}
            <div className="text-center mb-[var(--xl)]">
              <div className="w-[56px] h-[56px] rounded-full mx-auto flex items-center justify-center"
                style={{
                  background: 'var(--success-100)',
                  border: '2px solid var(--success-700)',
                }}>
                <Icon name="fa-check" size="xl" weight="solid" label="Успешно"
                  className="text-[var(--success-700)]" />
              </div>
            </div>

            <Typography variant="h2" className="text-center mb-[var(--4xl)]" style={{ letterSpacing: '-0.02em' }}>
              Заявката Ви е изпратена успешно
            </Typography>

            {/* Info items */}
            <div className="flex flex-col gap-[var(--xl)]">
              <div className="flex gap-[var(--m)] items-start">
                <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[var(--xxs)]">
                  <Icon name="fa-phone" size="md" weight="solid" className="text-[var(--accent-600)]" />
                </div>
                <div>
                  <Typography variant="textSm" className="font-semibold mb-[var(--xs)]">Очаквайте обаждане</Typography>
                  <Typography variant="textSm" color="secondary" className="leading-[1.5]">
                    Компаниите ще разгледат заявката Ви и ще се свържат с Вас при одобрение.
                  </Typography>
                </div>
              </div>

              <div className="flex gap-[var(--m)] items-start">
                <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0 mt-[var(--xxs)]">
                  <Icon name="fa-circle-exclamation" size="md" weight="solid" className="text-[var(--accent-600)]" />
                </div>
                <div>
                  <Typography variant="textSm" className="font-semibold mb-[var(--xs)]">Важна информация</Typography>
                  <Typography variant="textSm" color="secondary" className="leading-[1.5]">
                    <span className="text-[var(--accent-600)] font-medium">Trusti.bg не участва</span>
                    {' '}в процеса по одобрение. Решението се взема от лизинговите компании.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Преглед на заявката ── */}
        <div className="bg-[var(--surface-adjacent)] px-[var(--xl)] py-[var(--xl)] mb-[var(--s)]">
          <div className="max-w-[440px] mx-auto">
            <Typography variant="h5" className="text-center mb-[var(--xl)]">Преглед на заявката</Typography>

            <div className="flex flex-col">
              {[
                { label: 'Сума',         value: `${fmt(loanAmount)} €` },
                { label: 'Самоучастие',  value: `${fmt(downPayment)} €` },
                { label: 'Брой вноски', value: '36' },
              ].map((row, i, arr) => (
                <div key={row.label}
                  className="flex justify-between items-center py-[var(--m)]"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--primary-200)' : 'none' }}>
                  <Typography variant="textSm" color="muted">{row.label}</Typography>
                  <Typography variant="textSm" className="font-semibold">{row.value}</Typography>
                </div>
              ))}

              {/* Selected companies */}
              <div className="pt-[var(--m)] border-t border-[var(--primary-200)]">
                <Typography variant="textSm" color="muted" className="mb-[var(--m)]">Избрани компании</Typography>
                <div className="flex flex-wrap gap-[var(--s)]">
                  {selectedCompanies.map(company => (
                    <div key={company.id}
                      className="flex items-center gap-[var(--s)] rounded-[var(--radius-md)] px-[var(--m)] py-[var(--xs)]"
                      style={{
                        background: company.colorPrimary + '14',
                        border: `1px solid ${company.colorPrimary}30`,
                      }}>
                      <div className="w-[20px] h-[20px] rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
                        style={{ background: company.colorPrimary }}>
                        <Typography variant="caption" color="white" as="span" className="font-black">
                          {company.name[0].toUpperCase()}
                        </Typography>
                      </div>
                      <Typography variant="caption" className="font-semibold"
                        style={{ color: company.colorPrimary }}>
                        {company.name}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Reset CTA ── */}
        <div className="px-[var(--xl)] py-[var(--xxl)] pb-[var(--8xl)] text-center">
          <Button variant="secondary" size="l" leadingIcon="fa-rotate-left" onClick={onReset}>
            Нова заявка
          </Button>
        </div>

      </div>
    </div>
  )
}
