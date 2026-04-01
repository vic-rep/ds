import React, { useState } from 'react'
import { Button } from '@/components/molecules/Button'
import { Input } from '@/components/molecules/Input'
import { Card } from '@/components/molecules/Card'
import { Typography } from '@/components/atoms/Typography'
import { Icon } from '@/components/atoms/Icon'
import { LeasingProgressBar } from '../components/LeasingProgressBar'

const EUR_TO_BGN = 1.956
const fmt = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')

interface FormState {
  firstName: string
  lastName: string
  egn: string
  phone: string
  email: string
  plateNumber: string
  firstRegDate: string
  listingUrl: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  egn?: string
  phone?: string
  email?: string
  plateNumber?: string
}

function validate(form: FormState): FormErrors {
  const e: FormErrors = {}
  if (!form.firstName.trim() || form.firstName.trim().length < 2)
    e.firstName = 'Моля, въведете Вашето ime (минимум 2 символа)'
  if (!form.lastName.trim() || form.lastName.trim().length < 2)
    e.lastName = 'Моля, въведете Вашата фамилия'
  if (!/^[0-9]{10}$/.test(form.egn.trim()))
    e.egn = 'ЕГН трябва да съдържа точно 10 цифри'
  if (!/^0[0-9]{9}$/.test(form.phone.replace(/\s/g, '')))
    e.phone = 'Въведете валиден телефон: 08XXXXXXXXX'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    e.email = 'Въведете валиден имейл адрес'
  if (!form.plateNumber.trim() || form.plateNumber.trim().length < 5)
    e.plateNumber = 'Въведете регистрационен номер'
  return e
}

interface Step3Props {
  form: FormState
  loanAmount: number
  selectedCompanyIds: string[]
  onFormChange: (field: keyof FormState, value: string) => void
  onSubmit: () => void
  onBack: () => void
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card variant="elevated" padding="md">
      {/* Header */}
      <div className="mb-[var(--m)]">
        <Typography variant="h6" className="mb-[var(--xs)]">{title}</Typography>
        <button className="flex items-center gap-[var(--s)] pb-[var(--m)] w-full border-b border-[var(--primary-200)] bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer text-[var(--accent-600)]">
          <Icon name="fa-circle-info" size="sm" weight="solid" className="text-[var(--accent-600)]" />
          <Typography variant="caption" className="text-[var(--accent-600)]">
            Защо ни е необходима тази информация?
          </Typography>
        </button>
      </div>
      {/* Fields */}
      <div className="flex flex-col gap-[var(--m)]">
        {children}
      </div>
    </Card>
  )
}

function FieldRow({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--xs)]">
      <Typography variant="caption" color="secondary" className="font-medium">
        {label}
        {required && <span className="text-[var(--destructive-600)]"> *</span>}
      </Typography>
      {children}
    </div>
  )
}

export function Step3Checkout({
  form,
  loanAmount,
  selectedCompanyIds,
  onFormChange,
  onSubmit,
  onBack,
}: Step3Props) {
  const [errors, setErrors] = useState<FormErrors>({})
  const [attempted, setAttempted] = useState(false)

  const handleBlur = (field: keyof FormErrors) => {
    if (!attempted) return
    const e = validate(form)
    setErrors(prev => ({ ...prev, [field]: e[field] }))
  }

  const handleSubmit = () => {
    setAttempted(true)
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length === 0) onSubmit()
  }

  const downPayment = Math.round(loanAmount * 0.25)
  const selCount = selectedCompanyIds.length

  return (
    <div className="bg-[var(--surface)] font-sans w-full min-h-full flex flex-col">

      <LeasingProgressBar title="Необходими данни за заявката" progress={80} onBack={onBack} />

      <div className="flex-1 px-[var(--l)] pt-[var(--l)] pb-[120px] max-w-[480px] w-full mx-auto box-border flex flex-col gap-[var(--m)]">

        {/* ── Лични данни ── */}
        <SectionCard title="Лични данни">
          <FieldRow label="Иmе" required>
            <Input inputType="text" placeholder="Име" value={form.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')} error={errors.firstName} />
          </FieldRow>
          <FieldRow label="Фамилия" required>
            <Input inputType="text" placeholder="Фамилия" value={form.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')} error={errors.lastName} />
          </FieldRow>
          <FieldRow label="ЕГН" required>
            <Input inputType="text" placeholder="Единен граждански номер" maxLength={10}
              inputMode="numeric" value={form.egn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 10)
                onFormChange('egn', v)
              }}
              onBlur={() => handleBlur('egn')} error={errors.egn} />
          </FieldRow>
          <FieldRow label="Телефон" required>
            <Input inputType="phone" placeholder="089xxxxxxxxx" countryCode="+359" countryFlag="🇧🇬"
              value={form.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')} error={errors.phone} />
          </FieldRow>
          <FieldRow label="Email" required>
            <Input inputType="text" placeholder="vanyashtereva@gmail.com" value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('email', e.target.value)}
              onBlur={() => handleBlur('email')} error={errors.email} />
          </FieldRow>
        </SectionCard>

        {/* ── Данни за МПС ── */}
        <SectionCard title="Данни за МПС">
          <FieldRow label="Регистрационен номер" required>
            <Input inputType="text" placeholder="B1234AB" value={form.plateNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('plateNumber', e.target.value.toUpperCase())}
              onBlur={() => handleBlur('plateNumber')} error={errors.plateNumber} />
          </FieldRow>
          <FieldRow label="Дата на пуск">
            <Input inputType="text" placeholder="ДД/ММ/ГГГГ" value={form.firstRegDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('firstRegDate', e.target.value)} />
          </FieldRow>
          <FieldRow label="Линк на обява">
            <Input inputType="text" placeholder="http://" value={form.listingUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFormChange('listingUrl', e.target.value)} />
          </FieldRow>
        </SectionCard>
      </div>

      {/* ── Sticky bottom cart ── */}
      <div className="sticky bottom-0 bg-[var(--surface-adjacent)] border-t border-[var(--primary-200)] px-[var(--xl)] py-[var(--m)] flex flex-col gap-[var(--m)]"
        style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between gap-[var(--s)]">
          <div>
            <div className="flex items-baseline gap-[var(--xs)]">
              <Typography variant="textM" className="font-semibold">{fmt(loanAmount)} €</Typography>
              <Typography variant="caption" color="muted">/ {fmt(loanAmount * EUR_TO_BGN)} лв.</Typography>
            </div>
            <Typography variant="caption" color="muted">
              {selCount} {selCount === 1 ? 'компания' : 'компании'} избрани
            </Typography>
          </div>
          <Button variant="primary" size="l" leadingIcon="fa-paper-plane" onClick={handleSubmit}>
            Изпрати заявката
          </Button>
        </div>
      </div>
    </div>
  )
}
