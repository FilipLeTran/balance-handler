export default function CalculateBusinessUnitBalance(
  inputSet: Set<String>,
  balanceData: { value: any[] }
) {
  const units: {
    name: any
    openingBalance: number
    closingBalance: number
    differenceBalance: number
  }[] = []

  inputSet.forEach((businessUnitCode: any) => {
    const filteredUnits = balanceData.value.filter(
      (balanceEvent: any) => balanceEvent.businessUnit === businessUnitCode
    )

    let unitOpeningBalance = 0
    let unitClosingBalance = 0

    filteredUnits.forEach((balanceEvent: { type: string; value: number }) => {
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
