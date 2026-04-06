import {
  NAVBAR_BOTTOM_SPACING,
  NAVBAR_TOP_SPACING,
} from "@/components/navbar/constants"
import { KEYBOARD_ACCESSORY_VIEW_HEIGHT } from "@/components/new-thought/constants"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const DEFAULT_EXTRA_OFFSET =
  NAVBAR_TOP_SPACING + NAVBAR_BOTTOM_SPACING + KEYBOARD_ACCESSORY_VIEW_HEIGHT

export function useKeyboardOffset(extraOffset: number = DEFAULT_EXTRA_OFFSET) {
  const { top } = useSafeAreaInsets()
  return top + extraOffset
}
