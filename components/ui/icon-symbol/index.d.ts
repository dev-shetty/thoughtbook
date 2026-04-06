import { StyleProp, TextStyle, ViewStyle } from "react-native"

export function IconSymbol(props: {
  name: string
  size?: number
  color: string
  style?: StyleProp<ViewStyle> | StyleProp<TextStyle>
  weight?: string
}): React.JSX.Element
