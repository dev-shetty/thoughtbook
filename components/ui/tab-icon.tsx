import { IconSymbol } from "@/components/ui/icon-symbol"
import { inactiveHexColor, inkHexColor } from "@/tamagui.config"

const ICON_SIZE = 24

export function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <IconSymbol
      name={name}
      size={ICON_SIZE}
      color={focused ? inkHexColor : inactiveHexColor}
      weight={focused ? "bold" : "regular"}
    />
  )
}
