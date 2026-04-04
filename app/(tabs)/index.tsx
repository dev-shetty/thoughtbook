import { Reflections } from "@/components/reflections"
import { $state } from "@/state"
import { ScrollView } from "tamagui"

export default function HomeScreen() {
  const reflections = $state.thoughts.get()

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Reflections reflections={reflections} />
    </ScrollView>
  )
}
