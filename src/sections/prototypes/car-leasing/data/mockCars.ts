export interface CarOffer {
  id: string
  brand: string
  model: string
  year: number
  imageUrl: string
  monthlyMin: number
  loanMin: number
  loanMax: number
  fuelType: 'Бензин' | 'Дизел' | 'Хибрид' | 'Електрически'
  transmission: 'Ръчна' | 'Автоматична'
  horsepower: number
  provider: string
  badge?: string
}

export const mockCars: CarOffer[] = [
  {
    id: '1', brand: 'Volkswagen', model: 'Golf 8', year: 2023,
    imageUrl: 'https://placehold.co/320x200/e8f0fe/1a73e8?text=VW+Golf+8',
    monthlyMin: 420, loanMin: 15000, loanMax: 45000,
    fuelType: 'Бензин', transmission: 'Автоматична', horsepower: 130,
    provider: 'Уникредит Лизинг', badge: 'Топ оферта',
  },
  {
    id: '2', brand: 'Toyota', model: 'Corolla', year: 2023,
    imageUrl: 'https://placehold.co/320x200/e8f5e9/2e7d32?text=Toyota+Corolla',
    monthlyMin: 390, loanMin: 12000, loanMax: 40000,
    fuelType: 'Хибрид', transmission: 'Автоматична', horsepower: 122,
    provider: 'ОТП Лизинг',
  },
  {
    id: '3', brand: 'Skoda', model: 'Octavia', year: 2022,
    imageUrl: 'https://placehold.co/320x200/fce4ec/c62828?text=Skoda+Octavia',
    monthlyMin: 350, loanMin: 10000, loanMax: 35000,
    fuelType: 'Дизел', transmission: 'Ръчна', horsepower: 116,
    provider: 'Райфайзен Лизинг',
  },
  {
    id: '4', brand: 'BMW', model: '3 Series', year: 2023,
    imageUrl: 'https://placehold.co/320x200/e3f2fd/0d47a1?text=BMW+3+Series',
    monthlyMin: 780, loanMin: 35000, loanMax: 80000,
    fuelType: 'Бензин', transmission: 'Автоматична', horsepower: 184,
    provider: 'БМВ Финаншъл Сървисис', badge: 'Ново',
  },
  {
    id: '5', brand: 'Dacia', model: 'Sandero', year: 2023,
    imageUrl: 'https://placehold.co/320x200/f3e5f5/6a1b9a?text=Dacia+Sandero',
    monthlyMin: 220, loanMin: 5000, loanMax: 20000,
    fuelType: 'Бензин', transmission: 'Ръчна', horsepower: 90,
    provider: 'Евролийз',
  },
  {
    id: '6', brand: 'Hyundai', model: 'Tucson', year: 2022,
    imageUrl: 'https://placehold.co/320x200/fff3e0/e65100?text=Hyundai+Tucson',
    monthlyMin: 560, loanMin: 25000, loanMax: 55000,
    fuelType: 'Хибрид', transmission: 'Автоматична', horsepower: 230,
    provider: 'Уникредит Лизинг',
  },
  {
    id: '7', brand: 'Ford', model: 'Focus', year: 2022,
    imageUrl: 'https://placehold.co/320x200/e0f7fa/006064?text=Ford+Focus',
    monthlyMin: 310, loanMin: 8000, loanMax: 28000,
    fuelType: 'Бензин', transmission: 'Ръчна', horsepower: 125,
    provider: 'Сосиете Женерал Лизинг',
  },
  {
    id: '8', brand: 'Tesla', model: 'Model 3', year: 2023,
    imageUrl: 'https://placehold.co/320x200/212121/ffffff?text=Tesla+Model+3',
    monthlyMin: 890, loanMin: 45000, loanMax: 80000,
    fuelType: 'Електрически', transmission: 'Автоматична', horsepower: 283,
    provider: 'ОТП Лизинг', badge: 'Топ оферта',
  },
]
