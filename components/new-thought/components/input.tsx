import { CollapseKeyboard } from "@/components/ios/collapse-keyboard"
import { $state } from "@/state"
import { observer } from "@legendapp/state/react"
import { Platform } from "react-native"
import { TextArea } from "tamagui"

const DONE_ACCESSORY_ID = "new-thought-input-done"

export const NewThoughtInput = observer(function NewThoughtInput() {
  const currentId = $state.currentId.get()
  const $thought = $state.thoughtsById[currentId]
  const content = $thought.content.get() ?? ""

  return (
    <>
      <CollapseKeyboard nativeID={DONE_ACCESSORY_ID} />
      <TextArea
        key={currentId}
        placeholder="Let your thoughts flow..."
        flex={1}
        fontSize="$4"
        autoFocus
        value={content}
        inputAccessoryViewID={
          Platform.OS === "ios" ? DONE_ACCESSORY_ID : undefined
        }
        onChangeText={(text) => $thought.content.set(text)}
      />
    </>
  )
})
