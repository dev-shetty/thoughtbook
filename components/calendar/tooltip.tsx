import { onSurfaceVariantColor } from "@/tamagui.config"
import { useEffect } from "react"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { getTokens } from "tamagui"

const tokens = getTokens()

interface TooltipProps {
  count: number
  onDismiss: () => void
}

const TOOLTIP_DELAY = 1000 // ms

export function Tooltip({ count, onDismiss }: TooltipProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, TOOLTIP_DELAY)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const label = count === 1 ? "1 Thought" : `${count} Thoughts`

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(100)}
      style={{
        position: "absolute",
        top: -32,
        alignSelf: "center",
        backgroundColor: tokens.color.surfaceContainerHigh.val,
        paddingHorizontal: tokens.space["$2"].val,
        paddingVertical: tokens.space["$1"].val,
        borderRadius: 6,
        minWidth: 100,
        zIndex: 100,
      }}
    >
      <Animated.Text
        style={{
          fontFamily: "Inter",
          fontSize: tokens.size["$3"].val,
          color: onSurfaceVariantColor,
          textAlign: "center",
        }}
      >
        {label}
      </Animated.Text>
    </Animated.View>
  )
}
