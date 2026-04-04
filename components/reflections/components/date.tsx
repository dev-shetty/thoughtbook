import { formatDateTime } from "@/utils"
import { Text } from "tamagui"

interface DateProps {
  date: string
}

export function Date({ date }: DateProps) {
  return (
    <Text fontFamily="$body" fontSize="$2" color="$colorSecondary">
      {formatDateTime(date)}
    </Text>
  )
}
