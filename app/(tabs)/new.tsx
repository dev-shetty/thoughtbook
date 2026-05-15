import { NewThoughtInput } from "@/components/new-thought/components/input"
import { useKeyboardOffset } from "@/hooks/use-keyboard-offset"
import { $state, deleteThought } from "@/state"
import { useNavigation } from "expo-router"
import { useEffect } from "react"
import { KeyboardAvoidingView, Platform } from "react-native"
import { PageContent } from "@/components/ui/page-content"

export default function NewScreen() {
  const keyboardVerticalOffset = useKeyboardOffset()
  const navigation = useNavigation()

  useEffect(() => {
    const deleteEmptyThoughtOnBlur = navigation.addListener("blur", () => {
      const id = $state.currentId.peek()
      const content = $state.thoughtsById[id]?.content.peek() ?? ""
      if (content.trim() === "") {
        deleteThought(id)
      }
    })
    return deleteEmptyThoughtOnBlur
  }, [navigation])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <PageContent>
        <NewThoughtInput />
      </PageContent>
    </KeyboardAvoidingView>
  )
}
