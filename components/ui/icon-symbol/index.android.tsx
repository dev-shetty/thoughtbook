import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { StyleProp, TextStyle } from "react-native"

const SF_TO_MATERIAL: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  "chevron.left": "chevron-left",
  "plus": "add",
  "trash": "delete",
  "pencil": "edit",
  "checkmark": "check",
  "keyboard.chevron.compact.down": "keyboard-hide",
}

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string
  size?: number
  color: string
  style?: StyleProp<TextStyle>
  weight?: string
}) {
  const materialName = SF_TO_MATERIAL[name] ?? "help-outline"
  return <MaterialIcons name={materialName} size={size} color={color} style={style} />
}
