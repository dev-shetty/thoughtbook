import { Reflection } from "@/components/reflections/types"
import { getStorage } from "@/state/persist"
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

let _synced = false
export function initStateSync() {
    if (_synced) return
    _synced = true
    syncObservable($state, {
        persist: { name: "thoughtbook", plugin: getStorage() },
    })
}

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

export function markThoughtEdited(id: string) {
    $state.thoughtsById[id].lastEditedAt.set(new Date().toISOString())
}

export function deleteThought(id: string) {
    $state.thoughtsById[id].delete()
    const index = $state.thoughtIds.peek().indexOf(id)
    if (index !== -1) $state.thoughtIds.splice(index, 1)
}

export function getCurrentThought$() {
    const id = $state.currentId.peek()
    return $state.thoughtsById[id]
}
