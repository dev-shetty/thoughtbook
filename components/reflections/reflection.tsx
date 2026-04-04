import { Badges } from "@/components/reflections/components/badges"
import { Content } from "@/components/reflections/components/content"
import { Date } from "@/components/reflections/components/date"
import { Reflection as ReflectionType } from "@/components/reflections/types"
import { YStack } from "tamagui"

interface ReflectionProps {
  reflection: ReflectionType
}

export function Reflection({ reflection }: ReflectionProps) {
  return (
    <YStack gap="$2">
      <Date date={reflection.date} />
      <Content content={reflection.content} />
      <Badges badges={reflection.badges} />
    </YStack>
  )
}
