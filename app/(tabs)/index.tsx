import { Text, YStack } from "tamagui"

export default function HomeScreen() {
  return (
    <YStack backgroundColor="$background" flex={1} padding="$4">
      <Text fontFamily="$heading" fontSize="$6" color="$color">
        Hello
      </Text>
    </YStack>
  )
}
