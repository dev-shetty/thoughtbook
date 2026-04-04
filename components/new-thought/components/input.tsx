import { CollapseKeyboard } from "@/components/ios/collapse-keyboard"
import { Platform } from "react-native"
import { TextArea } from "tamagui"

const DONE_ACCESSORY_ID = "new-thought-input-done"

export function NewThoughtInput() {
  return (
    <>
      <CollapseKeyboard nativeID={DONE_ACCESSORY_ID} />
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
