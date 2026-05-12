import { Badge } from "@/components/ui/badge"
import { $state } from "@/state"
import { parseBadges } from "@/utils/badges"
import { observer } from "@legendapp/state/react"
import { XStack } from "tamagui"

interface BadgesProps {
  id: string
}

export const Badges = observer(function Badges({ id }: BadgesProps) {
  const content = $state.thoughtsById[id].content.get() ?? ""
  const { badges } = parseBadges(content)
  if (badges.length === 0) return null
  return (
    <XStack gap="$2" flexWrap="wrap">
      {badges.map((badge) => (
        <Badge key={badge}>{badge}</Badge>
      ))}
    </XStack>
  )
})
