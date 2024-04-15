export default function calculateTotalBalance(allBusinessUnits: { value: any[] }) {
  let newOpeningBalance = 0
  let newClosingBalance = 0
  allBusinessUnits.value.forEach((businessUnitAggregation: any) => {
    newOpeningBalance += businessUnitAggregation.openingBalance
    newClosingBalance += businessUnitAggregation.closingBalance
  })

  return [newOpeningBalance, newClosingBalance, Math.abs(newOpeningBalance - newClosingBalance)]
}
