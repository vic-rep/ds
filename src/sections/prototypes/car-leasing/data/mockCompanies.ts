export interface LeasingCompany {
  id: string
  name: string
  colorPrimary: string
}

export const leasingCompanies: LeasingCompany[] = [
  { id: 'moneyplus',   name: 'money+',     colorPrimary: '#d4153d' },
  { id: 'credissimo',  name: 'credissimo', colorPrimary: '#e03218' },
  { id: 'cashcredit',  name: 'CashCredit', colorPrimary: '#00a99d' },
  { id: 'smilecredit', name: 'smilecredit',colorPrimary: '#3bb44a' },
  { id: 'vivacredit',  name: 'VIVA credit',colorPrimary: '#f7941d' },
]
