import { KEYBOARD_ACCESSORY_VIEW_HEIGHT } from "@/components/new-thought/constants"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { onSurfaceVariantColor } from "@/tamagui.config"
import { InputAccessoryView, Keyboard, Platform, Pressable } from "react-native"
import { XStack } from "tamagui"

interface CollapseKeyboardProps {
  nativeID: string
}

export function CollapseKeyboard({ nativeID }: CollapseKeyboardProps) {
  return (
    Platform.OS === "ios" && (
      <InputAccessoryView nativeID={nativeID}>
        <XStack
          backgroundColor="$background"
          justifyContent="flex-end"
          alignItems="center"
          paddingHorizontal="$3"
          height={KEYBOARD_ACCESSORY_VIEW_HEIGHT}
        >
          <Pressable
            accessibilityLabel="Dismiss keyboard"
            accessibilityRole="button"
            onPress={() => Keyboard.dismiss()}
            hitSlop={12}
          >
            <IconSymbol
              name="keyboard.chevron.compact.down"
              size={20}
              color={onSurfaceVariantColor}
            />
          </Pressable>
        </XStack>
      </InputAccessoryView>
    )
  )
}
