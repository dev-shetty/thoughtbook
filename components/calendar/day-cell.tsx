import { highlightColor, outlineVariantColor } from "@/tamagui.config"
import { useCallback, useContext, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { DateData } from "react-native-calendars"
import { Text } from "tamagui"
import { getCircleProps } from "./constants"
import { ThoughtCountsContext } from "./context"
import { Tooltip } from "./tooltip"

interface DayCellProps {
  date?: DateData
  state?: string
}

const CELL_SIZE = 44
const CELL_PADDING = 8
const TODAY_RING_SIZE = 28

const DELAY_LONG_PRESS = 400 // ms

export function DayCell({ date, state }: DayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const thoughtCounts = useContext(ThoughtCountsContext)

  const dateString = date?.dateString ?? ""
  const day = date?.day ?? 0
  const count = thoughtCounts[dateString] ?? 0
  const circle = getCircleProps(count)
  const isToday = state === "today"
  const isDisabled = state === "disabled"

  const handleLongPress = useCallback(() => {
    if (count > 0) setShowTooltip(true)
  }, [count])

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false)
  }, [])

  return (
    <Pressable
      onLongPress={handleLongPress}
      delayLongPress={DELAY_LONG_PRESS}
      onPress={dismissTooltip}
      style={styles.cell}
    >
      {circle && !isDisabled && (
        <View
          style={[
            styles.circle,
            {
              width: circle.size,
              height: circle.size,
              borderRadius: circle.size / 2,
              opacity: circle.opacity,
              backgroundColor: highlightColor,
            },
          ]}
        />
      )}
      {isToday && !circle && <View style={[styles.circle, styles.todayRing]} />}
      <Text
        fontFamily="$heading"
        fontSize={15}
        color={isDisabled ? "$colorMuted" : "$color"}
        opacity={isDisabled ? 0.3 : 1}
      >
        {day}
      </Text>
      {showTooltip && count > 0 && (
        <Tooltip count={count} onDismiss={dismissTooltip} />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE + CELL_PADDING,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circle: {
    position: "absolute",
    alignSelf: "center",
  },
  todayRing: {
    width: TODAY_RING_SIZE,
    height: TODAY_RING_SIZE,
    borderRadius: TODAY_RING_SIZE / 2,
    borderWidth: 1,
    borderColor: outlineVariantColor,
  },
})
