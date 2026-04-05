import { Reflection } from "@/components/reflections/reflection"
import { $state } from "@/state"
import { For } from "@legendapp/state/react"
import { YStack } from "tamagui"

export function Reflections() {
  return (
    <YStack
      backgroundColor="$background"
      flex={1}
      padding="$4"
      paddingTop="$6"
      paddingBottom="$8"
      gap="$8"
    >
      <For each={$state.thoughtIds}>
        {($id) => <Reflection id={$id.get() as string} />}
      </For>
    </YStack>
  )
}
