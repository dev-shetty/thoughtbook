import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, H1, XStack } from "tamagui"

import {
  NAVBAR_BOTTOM_SPACING,
  NAVBAR_TOP_SPACING,
} from "@/components/navbar/constants"
import { useNavbar } from "@/components/navbar/hookes/use-navbar"
import { $navbar } from "@/components/navbar/state"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { observer } from "@legendapp/state/react"

export const Navbar = observer(function Navbar() {
  const { top } = useSafeAreaInsets()
  const { showBackButton, title, goBack } = useNavbar()
  const rightActions = $navbar.rightActions.get()

  return (
    <XStack
      paddingTop={top + NAVBAR_TOP_SPACING}
      paddingHorizontal="$4"
      backgroundColor="$background"
      paddingBottom={NAVBAR_BOTTOM_SPACING}
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
      {rightActions}
    </XStack>
  )
})
