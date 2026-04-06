import { $state } from "@/state"
import { formatDateTime } from "@/utils"
import { observer } from "@legendapp/state/react"
import { Text } from "tamagui"

interface DateProps {
  id: string
}

export const Date = observer(function Date({ id }: DateProps) {
  const date = $state.thoughtsById[id].date.get()
  const lastEditedAt = $state.thoughtsById[id].lastEditedAt.get()
  return (
    <Text fontFamily="$body" fontSize="$2" color="$colorSecondary">
      {formatDateTime(date)}
      {lastEditedAt ? ` · Edited ${formatDateTime(lastEditedAt)}` : ""}
    </Text>
  )
})
