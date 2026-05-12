import { $state } from "@/state"
import { parseBadges } from "@/utils/badges"
import { truncateText } from "@/utils/general"
import { observer } from "@legendapp/state/react"
import { Text } from "tamagui"

interface ContentProps {
  id: string
}

const MAX_PREVIEW_CHARS = 255
const MAX_PREVIEW_LINES = 8

export const Content = observer(function Content({ id }: ContentProps) {
  const content = $state.thoughtsById[id].content.get()
  const { displayContent } = parseBadges(content)

  const truncatedContent = truncateText(displayContent, MAX_PREVIEW_CHARS, MAX_PREVIEW_LINES)

  return (
    <Text fontFamily="$body" fontSize="$4" color="$color">
      {truncatedContent}
    </Text>
  )
})
