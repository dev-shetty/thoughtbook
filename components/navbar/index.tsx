import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, H1, XStack } from "tamagui"

import { useNavbar } from "@/components/navbar/hookes/use-navbar"
import { IconSymbol } from "@/components/ui/icon-symbol"

export function Navbar() {
  const { top } = useSafeAreaInsets()
  const { showBackButton, title, goBack } = useNavbar()

  return (
    <XStack
      paddingTop={top + 8}
      paddingHorizontal="$4"
      backgroundColor="$background"
      paddingBottom="$4"
      alignItems="center"
      gap="$2"
    >
      {showBackButton ? (
        <Button
          unstyled
          onPress={goBack}
          pressStyle={{ opacity: 0.65 }}
          hitSlop={12}
        >
          <IconSymbol name="chevron.left" size={16} color="white" />
        </Button>
      ) : null}
      <H1
        flex={1}
        fontFamily="$heading"
        fontSize="$6"
        color="$color"
        numberOfLines={1}
      >
        {title}
      </H1>
    </XStack>
  )
}
