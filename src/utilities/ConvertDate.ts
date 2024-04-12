// 1703941515099
export default function convertDate(dateValue?: number): string | undefined {
  return dateValue ? new Date(dateValue)?.toUTCString().slice(7, -13) : undefined
}
