import { Text, XStack } from "tamagui"

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <XStack
      backgroundColor="$backgroundStrong"
      paddingHorizontal="$2"
      paddingVertical="$1"
      borderRadius="$1"
    >
      <Text fontFamily="$body" fontSize="$1" color="$colorSecondary">
        {children}
      </Text>
    </XStack>
  )
}
