import { Navbar } from "@/components/navbar"
import { $navbar } from "@/components/navbar/state"
import { NewThoughtInput } from "@/components/new-thought/components/input"
import { ThoughtReadonly } from "@/components/thought/components/readonly"
import { NavbarButton } from "@/components/ui/navbar-button"
import { $state, deleteThought, markThoughtEdited } from "@/state"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { Alert, KeyboardAvoidingView, Platform } from "react-native"
import { useKeyboardOffset } from "@/hooks/use-keyboard-offset"
import { XStack, YStack } from "tamagui"

export default function ThoughtScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const keyboardVerticalOffset = useKeyboardOffset()
  const [isEditing, setIsEditing] = useState(false)
  const contentBeforeEdit = useRef("")

  const markIfChanged = useCallback(() => {
    const currentContent = $state.thoughtsById[id].content.peek() ?? ""
    if (currentContent !== contentBeforeEdit.current) {
      markThoughtEdited(id)
    }
  }, [id])

  const handleEdit = useCallback(() => {
    contentBeforeEdit.current = $state.thoughtsById[id].content.peek() ?? ""
    setIsEditing(true)
  }, [id])

  const handleSave = useCallback(() => {
    markIfChanged()
    setIsEditing(false)
  }, [markIfChanged])

  // Mark edited when navigating away while still editing
  useEffect(() => {
    return () => {
      if (contentBeforeEdit.current !== "") {
        markIfChanged()
      }
    }
  }, [markIfChanged])

  const handleDelete = useCallback(() => {
    Alert.alert(
      "Delete Thought",
      "Are you sure you want to delete this thought?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteThought(id)
            router.canGoBack() ? router.back() : router.replace("/")
          },
        },
      ],
    )
  }, [id, router])

  useEffect(() => {
    $navbar.rightActions.set(
      <XStack gap="$3" alignItems="center">
        <NavbarButton
          icon={isEditing ? "checkmark" : "pencil"}
          onPress={isEditing ? handleSave : handleEdit}
        />
        <NavbarButton icon="trash" onPress={handleDelete} />
      </XStack>,
    )
    return () => {
      $navbar.rightActions.set(null)
    }
  }, [isEditing, handleEdit, handleSave, handleDelete])

  return (
    <YStack flex={1} backgroundColor="$background">
      <Navbar />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {isEditing ? <NewThoughtInput id={id} /> : <ThoughtReadonly id={id} />}
      </KeyboardAvoidingView>
    </YStack>
  )
}
