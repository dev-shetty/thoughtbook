import { Reflections } from "@/components/reflections"
import { ScrollView } from "tamagui"

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Reflections />
    </ScrollView>
  )
}
