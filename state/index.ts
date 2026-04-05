import { FILLER_DATA } from "@/components/reflections/constants"
import { Reflection } from "@/components/reflections/types"
import { observable } from "@legendapp/state"

interface AppState {
    thoughtsById: Record<string, Reflection>
    thoughtIds: string[]
    currentId: string
}

const seedById: Record<string, Reflection> = {}
const seedIds: string[] = []
for (const r of FILLER_DATA) {
    seedById[r.id] = r
    seedIds.push(r.id)
}

export const $state = observable<AppState>({
    thoughtsById: seedById,
    thoughtIds: seedIds,
    currentId: "",
})


export function addThought(): string {
    const id = Date.now().toString()
    const date = new Date().toISOString()
    $state.thoughtsById[id].set({
        id,
        date,
        content: "",
        badges: [],
    })
    $state.thoughtIds.push(id)
    $state.currentId.set(id)
    return id
}

export function updateThoughtContent(id: string, text: string) {
    $state.thoughtsById[id].content.set(text)
}

export function getCurrentThought$() {
    const id = $state.currentId.peek()
    return $state.thoughtsById[id]
}
