import { $state } from "@/state"
import { truncateText } from "@/utils"
import { observer } from "@legendapp/state/react"
import { Text } from "tamagui"

interface ContentProps {
  id: string
}

const MAX_CONTENT_LENGTH = 256

export const Content = observer(function Content({ id }: ContentProps) {
  const content = $state.thoughtsById[id].content.get()

  const truncatedContent = truncateText(content, MAX_CONTENT_LENGTH)

  return (
    <Text fontFamily="$body" fontSize="$4" color="$color">
      {truncatedContent}
    </Text>
  )
})
