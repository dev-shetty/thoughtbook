import { Text, XStack } from "tamagui"

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <XStack backgroundColor="$backgroundSoft" padding="$2" borderRadius="$2">
      <Text>{children}</Text>
    </XStack>
  )
}
