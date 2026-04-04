import { useSafeAreaInsets } from "react-native-safe-area-context"
import { H1, XStack } from "tamagui"

export function Navbar() {
  const { top } = useSafeAreaInsets()

  return (
    <XStack
      paddingTop={top}
      paddingHorizontal="$4"
      backgroundColor="$background"
    >
      <H1 fontFamily="$heading" fontSize="$6" color="$color">
        Thoughtbook
      </H1>
    </XStack>
  )
}
