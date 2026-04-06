import { NewThoughtInput } from "@/components/new-thought/components/input"
import { useKeyboardOffset } from "@/hooks/use-keyboard-offset"
import { KeyboardAvoidingView, Platform } from "react-native"
import { YStack } from "tamagui"

export default function NewScreen() {
  const keyboardVerticalOffset = useKeyboardOffset()

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
