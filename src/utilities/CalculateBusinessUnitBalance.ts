export default function calculateBusinessUnitBalance(
  inputSet: Set<String>,
  balanceData: { value: any[] },
  period: string
) {
  const units: {
    name: any
    openingBalance: number
    closingBalance: number
    differenceBalance: number
  }[] = []

  const date = period.split('-')

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
