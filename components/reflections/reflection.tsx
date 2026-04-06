import { Badges } from "@/components/reflections/components/badges"
import { Content } from "@/components/reflections/components/content"
import { Date } from "@/components/reflections/components/date"
import { useRouter } from "expo-router"
import { memo } from "react"
import { Pressable } from "react-native"
import { YStack } from "tamagui"

interface ReflectionProps {
  id: string
}

export const Reflection = memo(function Reflection({ id }: ReflectionProps) {
  const router = useRouter()

  const handlePress = () => {
    router.push(`/thought/${id}`)
  }

  return (
    <Pressable onPress={handlePress}>
      <YStack gap="$2">
        <Date id={id} />
        <Content id={id} />
        <Badges id={id} />
      </YStack>
    </Pressable>
  )
})
