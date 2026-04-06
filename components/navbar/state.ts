import { observable } from "@legendapp/state"
import { ReactNode } from "react"

export const $navbar = observable<{ rightActions: ReactNode }>({
    rightActions: null,
})
