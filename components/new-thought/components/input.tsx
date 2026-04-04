import { KEYBOARD_ACCESSORY_VIEW_HEIGHT } from "@/components/new-thought/constants"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { onSurfaceVariantColor } from "@/tamagui.config"
import { InputAccessoryView, Keyboard, Platform, Pressable } from "react-native"
import { TextArea, XStack } from "tamagui"

const DONE_ACCESSORY_ID = "new-thought-input-done"

export function NewThoughtInput() {
  return (
    <>
      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={DONE_ACCESSORY_ID}>
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
      )}
      <TextArea
        placeholder="Let your thoughts flow..."
        flex={1}
        fontSize="$4"
        autoFocus={true}
        inputAccessoryViewID={
          Platform.OS === "ios" ? DONE_ACCESSORY_ID : undefined
        }
      />
    </>
  )
}
