import { NEW_THOUGHT_STATES } from "@/components/new-thought/constants"
import { useNewButtonState } from "@/components/new-thought/hooks/use-new-button-state"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { FAB_GAP, TAB_BAR_BASE } from "@/constants"
import { useRouter } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button } from "tamagui"

export function NewThoughtButton() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const newButtonState = useNewButtonState()

  if (newButtonState === NEW_THOUGHT_STATES.HIDDEN) return null

  return (
    <Button
      circular
      size="$10"
      borderRadius={100}
      position="absolute"
      zIndex="$2"
      bottom={insets.bottom + TAB_BAR_BASE + FAB_GAP}
      right={Math.max(insets.right, FAB_GAP)}
      backgroundColor="$buttonBackground"
      shadowColor="$shadowColor"
      shadowOpacity={0.04}
      shadowRadius={14}
      shadowOffset={{ width: 0, height: 6 }}
      pressStyle={{ opacity: 0.98 }}
      onPress={() => router.push("/new")}
    >
      <IconSymbol name="plus" size={24} color="white" />
    </Button>
  )
}
