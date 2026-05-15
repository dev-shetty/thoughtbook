import { $navbar } from "@/components/navbar/state"
import { PageContent } from "@/components/ui/page-content"
import { getDateKey } from "@/utils/formatters"
import { useCallback, useEffect, useState } from "react"
import { Calendar } from "react-native-calendars"
import { Button, Text, XStack, YStack } from "tamagui"
import { calendarTheme } from "./constants"
import { ThoughtCountsContext } from "./context"
import { DayCell } from "./day-cell"
import { useCalendarStats } from "./use-stats"
import { useThoughtCountsByMonth } from "./use-thought-counts"

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <YStack alignItems="center" flex={1}>
      <Text fontFamily="$heading" fontSize={32} color="$color">
        {value}
      </Text>
      <Text
        fontFamily="$body"
        fontSize="$2"
        color="$colorMuted"
        paddingTop="$1"
      >
        {label}
      </Text>
    </YStack>
  )
}

export function CalendarHeatmap() {
  const now = new Date()
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())

  const thoughtCounts = useThoughtCountsByMonth(currentYear, currentMonth)
  const { totalThoughts, streak } = useCalendarStats()

  const START_DATE = new Date(currentYear, currentMonth, 1)
  const currentDateString = getDateKey(START_DATE.toISOString())

  const isCurrentMonth =
    currentYear === now.getFullYear() && currentMonth === now.getMonth()

  const handleMonthChange = useCallback(
    (month: { year: number; month: number }) => {
      setCurrentYear(month.year)
      setCurrentMonth(month.month - 1)
    },
    [],
  )

  const goToToday = useCallback(() => {
    const today = new Date()
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
  }, [])

  useEffect(() => {
    if (!isCurrentMonth) {
      $navbar.rightActions.set(
        <Button
          unstyled
          onPress={goToToday}
          pressStyle={{ opacity: 0.65 }}
          hitSlop={12}
        >
          <Text fontFamily="$body" fontSize="$2" color="$colorSecondary">
            Today
          </Text>
        </Button>,
      )
    } else {
      $navbar.rightActions.set(null)
    }
    return () => {
      $navbar.rightActions.set(null)
    }
  }, [isCurrentMonth, goToToday])

  return (
    <ThoughtCountsContext.Provider value={thoughtCounts}>
      <PageContent paddingHorizontal="$4">
        <Calendar
          key={currentDateString}
          current={currentDateString}
          onMonthChange={handleMonthChange}
          dayComponent={DayCell}
          firstDay={1}
          enableSwipeMonths={true}
          hideExtraDays={false}
          theme={calendarTheme}
        />
        <XStack justifyContent="center" alignItems="center" paddingTop="$7">
          <StatItem value={totalThoughts} label="Thoughts" />
          <YStack width={1} height={36} backgroundColor="$borderColorHover" />
          <StatItem value={streak} label="Day Streak" />
        </XStack>
      </PageContent>
    </ThoughtCountsContext.Provider>
  )
}
