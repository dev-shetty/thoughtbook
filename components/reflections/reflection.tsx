import { Badges } from "@/components/reflections/components/badges"
import { Content } from "@/components/reflections/components/content"
import { Date } from "@/components/reflections/components/date"
import { SwipeableRow } from "@/components/reflections/components/swipeable-row"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { $state } from "@/state"
import { inkHexColor } from "@/tamagui.config"
import { useSelector } from "@legendapp/state/react"
import { useRouter } from "expo-router"
import { memo } from "react"
import { XStack, YStack } from "tamagui"

interface ReflectionProps {
  id: string
}

export const Reflection = memo(function Reflection({ id }: ReflectionProps) {
  const router = useRouter()
  const isFavourite = useSelector(
    () => $state.thoughtsById[id].isFavourite.get() ?? false,
  )

  const handlePress = () => {
    router.push(`/thought/${id}`)
  }

  return (
    <SwipeableRow id={id} onPress={handlePress}>
        <YStack
          gap="$2"
          paddingHorizontal="$4"
          paddingVertical="$3"
          paddingBottom="$6"
          borderBottomWidth={1}
          borderBottomColor="hsla(0, 0%, 0%, 0.9)"
          shadowColor="hsla(34, 13%, 67%, 0.1)"
          shadowOffset={{ width: 0, height: 1 }}
          shadowRadius={0}
          backgroundColor="$background"
        >
          {isFavourite && (
            <XStack position="absolute" top="$3" right="$3">
              <IconSymbol
                name="star.fill"
                size={12}
                color={inkHexColor}
              />
            </XStack>
          )}
          <Content id={id} />
          <Date id={id} />
          <Badges id={id} />
        </YStack>
    </SwipeableRow>
  )
})
