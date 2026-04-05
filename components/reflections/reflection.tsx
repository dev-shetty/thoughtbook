import { Badges } from "@/components/reflections/components/badges"
import { Content } from "@/components/reflections/components/content"
import { Date } from "@/components/reflections/components/date"
import { memo } from "react"
import { YStack } from "tamagui"

interface ReflectionProps {
  id: string
}

export const Reflection = memo(function Reflection({ id }: ReflectionProps) {
  return (
    <YStack gap="$2">
      <Date id={id} />
      <Content id={id} />
      <Badges id={id} />
    </YStack>
  )
})
