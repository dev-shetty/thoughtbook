import { Reflection } from "@/components/reflections/types"
import { storage } from "@/state/persist"
import { observable } from "@legendapp/state"
import { syncObservable } from "@legendapp/state/sync"

interface AppState {
    thoughtsById: Record<string, Reflection>
    thoughtIds: string[]
    currentId: string
}

export const $state = observable<AppState>({
    thoughtsById: {},
    thoughtIds: [],
    currentId: "",
})

syncObservable($state, {
    persist: {
        name: "thoughtbook",
        plugin: storage,
    },
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
