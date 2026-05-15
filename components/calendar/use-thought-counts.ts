import { $state } from "@/state"
import { getDateKey } from "@/utils/formatters"
import { useSelector } from "@legendapp/state/react"

export function useThoughtCountsByMonth(year: number, month: number): Record<string, number> {
    return useSelector(() => {
        const counts: Record<string, number> = {}
        const ids = $state.thoughtIds.get()
        const byId = $state.thoughtsById.get()
        for (const id of ids) {
            const thought = byId[id]
            if (!thought?.date) continue
            const d = new Date(thought.date)
            if (d.getFullYear() === year && d.getMonth() === month) {
                const key = getDateKey(thought.date)
                counts[key] = (counts[key] || 0) + 1
            }
        }
        return counts
    })
}
