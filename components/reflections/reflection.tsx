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
      <YStack
        gap="$2"
        paddingBottom="$6"
        borderBottomWidth={1}
        borderBottomColor="hsla(0, 0%, 0%, 0.9)"
        shadowColor="hsla(34, 13%, 67%, 0.1)"
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={0}
      >
        <Content id={id} />
        <Date id={id} />
        <Badges id={id} />
      </YStack>
    </Pressable>
  )
})
