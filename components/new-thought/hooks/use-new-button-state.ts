import { NEW_THOUGHT_STATES } from "@/components/new-thought/constants"
import { usePathname } from "expo-router"

export function useNewButtonState() {
    const pathname = usePathname()
    const isNewPage = pathname === "/new"

    if (isNewPage) {
        return NEW_THOUGHT_STATES.HIDDEN
    }

    return NEW_THOUGHT_STATES.NEW
}