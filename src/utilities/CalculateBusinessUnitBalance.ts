import { type IBalanceValue } from '@/components/Interfaces'

export default function calculateBusinessUnitBalance(
  inputSet: Set<String>,
  balanceData: any[],
  market: string
): IBalanceValue[] {
  const units: IBalanceValue[] = []

  inputSet.forEach((businessUnitCode: any) => {
    // gets all balance events that is of the same business unit
    let filteredUnits
    if (market === '') {
      filteredUnits = balanceData.filter((balanceEvent: any) => {
        return balanceEvent.businessUnit === businessUnitCode
      })
    } else if (businessUnitCode.length > 5) {
      filteredUnits = balanceData.filter((balanceEvent: any) => {
        return balanceEvent.customerId === businessUnitCode && balanceEvent.market === market
      })
    } else {
      filteredUnits = balanceData.filter((balanceEvent: any) => {
        return balanceEvent.businessUnit === businessUnitCode && balanceEvent.market === market
      })
    }
    let unitOpeningBalance = 0
    let unitClosingBalance = 0

    // calculates the opening and closing balance for each business unit
    filteredUnits.forEach((balanceEvent: { value: number; type: string }) => {
      if (balanceEvent.type === 'INCREASED') {
        unitOpeningBalance += balanceEvent.value
      } else if (balanceEvent.type === 'DECREASED') {
        unitClosingBalance += balanceEvent.value
      }
    })
    const unitDifferenceBalance = unitOpeningBalance - unitClosingBalance

    const unitResult = {
      name: businessUnitCode,
      openingBalance: unitOpeningBalance,
      closingBalance: unitClosingBalance,
      differenceBalance: unitDifferenceBalance
    }
    units.push(unitResult)
  })
  return units
}
