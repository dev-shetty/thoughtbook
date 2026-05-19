import { $state } from "@/state"
import { getDateKey } from "@/utils/formatters"
import { useSelector } from "@legendapp/state/react"

export function useCalendarStats() {
    return useSelector(() => {
        const ids = $state.thoughtIds.get()
        const byId = $state.thoughtsById.get()
        const totalThoughts = ids.length

        const datesWithThoughts = new Set<string>()
        for (const id of ids) {
            const thought = byId[id]
            if (thought?.date) {
                datesWithThoughts.add(getDateKey(thought.date))
            }
        }

        const today = new Date()
        let streak = 0
        const current = new Date(today.getFullYear(), today.getMonth(), today.getDate())

        // if today has no thoughts yet, maintain the streak till yesterday
        if (!datesWithThoughts.has(getDateKey(current.toISOString()))) {
            current.setDate(current.getDate() - 1)
        }

        while (true) {
            const key = getDateKey(current.toISOString())
            if (datesWithThoughts.has(key)) {
                streak++
                // safely rolls across month/year boundaries ie ("1 May 2026" - 1 = "30 Apr 2026")
                current.setDate(current.getDate() - 1)
            } else {
                break
            }
        }

        return { totalThoughts, streak }
    })
}
