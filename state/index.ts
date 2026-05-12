import { Reflection } from "@/components/reflections/types"
import { getStorage } from "@/state/persist"
import { observable, when } from "@legendapp/state"
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
    const syncState = syncObservable($state, {
        persist: { name: "thoughtbook", plugin: getStorage() },
    })
    // Sort existing thoughts in reverse chronological order once after persist loads
    when(() => syncState.isPersistLoaded.get(), () => {
        const ids = $state.thoughtIds.peek()
        if (ids.length > 1) {
            $state.thoughtIds.set([...ids].sort((a, b) => Number(b) - Number(a)))
        }
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
    $state.thoughtIds.unshift(id)
    $state.currentId.set(id)
    return id
}

export function updateThoughtContent(id: string, text: string) {
    $state.thoughtsById[id].content.set(text)
}

export function markThoughtEdited(id: string) {
    $state.thoughtsById[id].lastEditedAt.set(new Date().toISOString())
}

export function toggleFavourite(id: string) {
    const current = $state.thoughtsById[id].isFavourite.peek() ?? false
    $state.thoughtsById[id].isFavourite.set(!current)
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
