export default function filterBalanceByPeriod(balanceData: { value: any[] }, period: string) {
  const selectedPeriod = period.split('-')
  const year = Number(selectedPeriod[0])
  const month = Number(selectedPeriod[1])

  const test = balanceData.value.filter((balanceEvent) => {
    const time = new Date(balanceEvent.time)

    return year === time.getFullYear() && month === time.getMonth() + 1
  })

  return test
}
