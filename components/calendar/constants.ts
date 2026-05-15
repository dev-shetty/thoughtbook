import {
    inactiveHexColor,
    inkHexColor,
    onSurfaceVariantColor,
    surfaceColor
} from "@/tamagui.config"

// Heatmap circle sizing
export const MIN_CIRCLE_SIZE = 24
export const MAX_CIRCLE_SIZE = 64
export const MIN_CIRCLE_OPACITY = 0.2
export const MAX_CIRCLE_OPACITY = 0.7
export const SCALE_STEPS = 5

export function getCircleProps(count: number) {
    if (count <= 0) return null
    const t = Math.min(count / SCALE_STEPS, 1)
    return {
        size: MIN_CIRCLE_SIZE + (MAX_CIRCLE_SIZE - MIN_CIRCLE_SIZE) * t,
        opacity: MIN_CIRCLE_OPACITY + (MAX_CIRCLE_OPACITY - MIN_CIRCLE_OPACITY) * t,
    }
}

// react-native-calendars theme mapped to nocturne palette
export const calendarTheme = {
    calendarBackground: surfaceColor,
    monthTextColor: inkHexColor,
    textMonthFontFamily: "Newsreader",
    textMonthFontSize: 24,
    textSectionTitleColor: inactiveHexColor,
    textDayHeaderFontFamily: "Inter",
    textDayHeaderFontSize: 11,
    arrowColor: onSurfaceVariantColor,

    // Hide default day text — we render our own in dayComponent
    dayTextColor: "transparent",
    textDisabledColor: "transparent",
    todayTextColor: "transparent",
    "stylesheet.calendar.header": {
        header: {
            flexDirection: "row" as const,
            justifyContent: "space-between" as const,
            alignItems: "center" as const,
            paddingHorizontal: 8,
            paddingBottom: 16,
        },
        monthText: {
            fontFamily: "Newsreader",
            fontSize: 24,
            color: inkHexColor,
        },
        dayHeader: {
            fontFamily: "Inter",
            fontSize: 11,
            color: inactiveHexColor,
            textAlign: "center" as const,
            width: 44,
        },
    },
    "stylesheet.day.basic": {
        base: {
            width: 44,
            height: 52,
            alignItems: "center" as const,
            justifyContent: "center" as const,
        },
    },
}
