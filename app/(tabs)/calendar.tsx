import { Text, YStack } from "tamagui"

export default function CalendarScreen() {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="$background"
    >
      <Text color="$colorMuted" fontSize="$5" fontFamily="$body">
        Coming soon
      </Text>
    </YStack>
  )
}
