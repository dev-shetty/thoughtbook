import { Badge } from "@/components/ui/badge"
import { XStack } from "tamagui"

interface BadgesProps {
  badges: string[]
}

export function Badges({ badges }: BadgesProps) {
  return (
    <XStack gap="$2">
      {badges.map((badge) => (
        <Badge key={badge}>{badge}</Badge>
      ))}
    </XStack>
  )
}
