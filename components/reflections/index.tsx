import { Reflection } from "@/components/reflections/reflection"
import { $state } from "@/state"
import { For } from "@legendapp/state/react"
import { PageContent } from "@/components/ui/page-content"

export function Reflections() {
  return (
    <PageContent
      backgroundColor="$background"
      paddingBottom="$8"
      gap="$2"
    >
      <For each={$state.thoughtIds}>
        {($id) => <Reflection id={$id.get() as string} />}
      </For>
    </PageContent>
  )
}
