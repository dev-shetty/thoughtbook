import { Reflection } from "@/components/reflections/reflection"
import { Reflection as ReflectionType } from "@/components/reflections/types"
import { YStack } from "tamagui"

interface ReflectionsProps {
  reflections: ReflectionType[]
}

export function Reflections({ reflections }: ReflectionsProps) {
  return (
    <YStack
      backgroundColor="$background"
      flex={1}
      padding="$4"
      paddingTop="$6"
      paddingBottom="$8"
      gap="$8"
    >
      {reflections.map((reflection) => (
        <Reflection key={reflection.date} reflection={reflection} />
      ))}
    </YStack>
  )
}
