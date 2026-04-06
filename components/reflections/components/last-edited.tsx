import { $state } from "@/state"
import { formatDateTime } from "@/utils"
import { observer } from "@legendapp/state/react"
import { Text } from "tamagui"

interface LastEditedProps {
  id: string
}

export const LastEdited = observer(function LastEdited({ id }: LastEditedProps) {
  const lastEditedAt = $state.thoughtsById[id].lastEditedAt.get()
  if (!lastEditedAt) return null
  return (
    <Text fontFamily="$body" fontSize="$1" color="$colorSecondary" fontStyle="italic">
      Edited {formatDateTime(lastEditedAt)}
    </Text>
  )
})
