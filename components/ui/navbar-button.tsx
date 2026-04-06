import { IconSymbol } from "@/components/ui/icon-symbol"
import { SymbolViewProps } from "expo-symbols"
import { Button } from "tamagui"

interface NavbarButtonProps {
  icon: SymbolViewProps["name"]
  onPress: () => void
}

export function NavbarButton({ icon, onPress }: NavbarButtonProps) {
  return (
    <Button
      unstyled
      onPress={onPress}
      pressStyle={{ opacity: 0.65 }}
      hitSlop={12}
    >
      <IconSymbol name={icon} size={20} color="white" />
    </Button>
  )
}
