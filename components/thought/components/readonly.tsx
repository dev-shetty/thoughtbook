import { Badges } from "@/components/reflections/components/badges"
import { PAGE_TOP_PADDING } from "@/constants"
import { $state } from "@/state"
import { formatDateTime } from "@/utils"
import { parseBadges } from "@/utils/badges"
import { observer } from "@legendapp/state/react"
import { ScrollView, Text } from "tamagui"

interface ThoughtReadonlyProps {
  id: string
}

export const ThoughtReadonly = observer(function ThoughtReadonly({
  id,
}: ThoughtReadonlyProps) {
  const content = $state.thoughtsById[id].content.get() ?? ""
  const date = $state.thoughtsById[id].date.get()
  const lastEditedAt = $state.thoughtsById[id].lastEditedAt.get()
  const { displayContent } = parseBadges(content)

  return (
    <ScrollView
      flex={1}
      paddingHorizontal="$4"
      paddingTop={PAGE_TOP_PADDING}
      paddingBottom="$8"
      contentContainerStyle={{ gap: 12 }}
    >
      <Text fontFamily="$body" fontSize="$2" color="$colorSecondary">
        {formatDateTime(date)}
        {lastEditedAt ? ` · Edited ${formatDateTime(lastEditedAt)}` : ""}
      </Text>
      <Text fontFamily="$body" fontSize="$4" color="$color">
        {displayContent}
      </Text>
      <Badges id={id} />
    </ScrollView>
  )
})
