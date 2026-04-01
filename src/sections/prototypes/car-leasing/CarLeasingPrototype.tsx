import React, { useState } from 'react'
import { Step1Landing } from './steps/Step1Landing'
import { Step2Results } from './steps/Step2Results'
import { Step3Checkout } from './steps/Step3Checkout'
import { Step4ThankYou } from './steps/Step4ThankYou'
import { leasingCompanies } from './data/mockCompanies'

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

export function CarLeasingPrototype() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [loanAmount, setLoanAmount] = useState(24000) // EUR
  const [leasingType, setLeasingType] = useState<'financial' | 'operational'>('financial')
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>(
    leasingCompanies.map(c => c.id) // all selected by default
  )
  const [consent, setConsent] = useState(false)
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    egn: '',
    phone: '',
    email: '',
    plateNumber: '',
    firstRegDate: '',
    listingUrl: '',
  })

  const handleToggleCompany = (id: string) => {
    setSelectedCompanyIds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleFormChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setCurrentStep(1)
    setLoanAmount(24000)
    setLeasingType('financial')
    setSelectedCompanyIds(leasingCompanies.map(c => c.id))
    setConsent(false)
    setForm({
      firstName: '',
      lastName: '',
      egn: '',
      phone: '',
      email: '',
      plateNumber: '',
      firstRegDate: '',
      listingUrl: '',
    })
  }

  if (currentStep === 1) {
    return (
      <Step1Landing
        loanAmount={loanAmount}
        leasingType={leasingType}
        consent={consent}
        onLoanChange={setLoanAmount}
        onLeasingTypeChange={setLeasingType}
        onConsentChange={setConsent}
        onContinue={() => setCurrentStep(2)}
      />
    )
  }

  if (currentStep === 2) {
    return (
      <Step2Results
        loanAmount={loanAmount}
        selectedCompanyIds={selectedCompanyIds}
        onToggleCompany={handleToggleCompany}
        onContinue={() => setCurrentStep(3)}
        onBack={() => setCurrentStep(1)}
      />
    )
  }

  if (currentStep === 3) {
    return (
      <Step3Checkout
        form={form}
        loanAmount={loanAmount}
        selectedCompanyIds={selectedCompanyIds}
        onFormChange={handleFormChange}
        onSubmit={() => setCurrentStep(4)}
        onBack={() => setCurrentStep(2)}
      />
    )
  }

  return (
    <Step4ThankYou
      loanAmount={loanAmount}
      selectedCompanyIds={selectedCompanyIds}
      onReset={handleReset}
    />
  )
}
