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
