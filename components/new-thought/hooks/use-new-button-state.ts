import { NEW_THOUGHT_STATES } from "@/components/new-thought/constants"
import { usePathname } from "expo-router"

const HIDDEN_PATHS = ["/new", "/calendar"]

export function useNewButtonState() {
    const pathname = usePathname()

    if (HIDDEN_PATHS.includes(pathname)) {
        return NEW_THOUGHT_STATES.HIDDEN
    }

    return NEW_THOUGHT_STATES.NEW
}