import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { StyleProp, TextStyle } from "react-native"

type IconMaterialMap = Record<string, keyof typeof MaterialIcons.glyphMap>

// Filled variants for bold/active state
const SF_TO_MATERIAL_BOLD: IconMaterialMap = {
  house: "home-filled",
  star: "star",
  calendar: "event",
  gear: "settings",
}

const SF_TO_MATERIAL: IconMaterialMap = {
  "chevron.left": "chevron-left",
  plus: "add",
  trash: "delete",
  pencil: "edit",
  checkmark: "check",
  "keyboard.chevron.compact.down": "keyboard-hide",
  house: "home",
  star: "star",
  calendar: "calendar-today",
  gear: "settings",
}

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: string
  size?: number
  color: string
  style?: StyleProp<TextStyle>
  weight?: string
}) {
  const isBold = weight === "bold"
  const materialName = (() => {
    if (isBold) {
      return SF_TO_MATERIAL_BOLD[name] ?? SF_TO_MATERIAL[name] ?? "help-outline"
    }
    return SF_TO_MATERIAL[name] ?? "help-outline"
  })()
  return (
    <MaterialIcons
      name={materialName}
      size={size}
      color={color}
      style={style}
    />
  )
}
