import { Reflections } from "@/components/reflections"
import { ScrollView } from "tamagui"

export default function HomeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      flex={1}
      backgroundColor="$background"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "transparent" }}
    >
      <Reflections />
    </ScrollView>
  )
}
