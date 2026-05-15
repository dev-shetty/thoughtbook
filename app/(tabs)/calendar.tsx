import { CalendarHeatmap } from "@/components/calendar"
import { ScrollView } from "tamagui"

export default function CalendarScreen() {
  return (
    <ScrollView
      flex={1}
      backgroundColor="$background"
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <CalendarHeatmap />
    </ScrollView>
  )
}
