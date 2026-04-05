import { $state } from "@/state"
import { observer } from "@legendapp/state/react"
import { Text } from "tamagui"

interface ContentProps {
  id: string
}

export const Content = observer(function Content({ id }: ContentProps) {
  const content = $state.thoughtsById[id].content.get()
  return (
    <Text fontFamily="$body" fontSize="$4" color="$color">
      {content}
    </Text>
  )
})
