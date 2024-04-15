export interface IGlobalState {
  retailUnit: string
  businessUnit: string
  period: string
  regionCustomers: string[]
  setRetailUnit: (retailUnit: string) => void
  setBusinessUnit: (BusinessUnit: string) => void
  setPeriod: (period: string) => void
  setRegionCustomers: (regionCustomers: string[]) => void
}

export interface IBalance {
  id: string
  time: number
  market: string
  customerId: string
  reason: string
  reasonTime: number
  businessUnit: string
  type: string
  value: number
}

export interface IBalanceValue {
  name: string
  openingBalance: number
  closingBalance: number
  differenceBalance: number
}
