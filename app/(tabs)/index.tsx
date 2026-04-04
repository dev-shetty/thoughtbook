import { Reflections } from "@/components/reflections"
import { FILLER_DATA } from "@/components/reflections/constants"
import { ScrollView } from "tamagui"

export default function HomeScreen() {
  const reflections = FILLER_DATA

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Reflections reflections={reflections} />
    </ScrollView>
  )
}
