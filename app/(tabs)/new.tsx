import {
  NAVBAR_BOTTOM_SPACING,
  NAVBAR_TOP_SPACING,
} from "@/components/navbar/constants"
import { NewThoughtInput } from "@/components/new-thought/components/input"
import { KEYBOARD_ACCESSORY_VIEW_HEIGHT } from "@/components/new-thought/constants"
import { KeyboardAvoidingView, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { YStack } from "tamagui"

export default function NewScreen() {
  const { top } = useSafeAreaInsets()
  const keyboardVerticalOffset =
    top +
    NAVBAR_TOP_SPACING +
    NAVBAR_BOTTOM_SPACING +
    KEYBOARD_ACCESSORY_VIEW_HEIGHT

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <YStack flex={1}>
        <NewThoughtInput />
      </YStack>
    </KeyboardAvoidingView>
  )
}
