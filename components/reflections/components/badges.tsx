import { Badge } from "@/components/ui/badge"
import { $state } from "@/state"
import { observer } from "@legendapp/state/react"
import { XStack } from "tamagui"

interface BadgesProps {
  id: string
}

export const Badges = observer(function Badges({ id }: BadgesProps) {
  const badges = $state.thoughtsById[id].badges.get() ?? []
  return (
    <XStack gap="$2">
      {badges.map((badge) => (
        <Badge key={badge}>{badge}</Badge>
      ))}
    </XStack>
  )
})
