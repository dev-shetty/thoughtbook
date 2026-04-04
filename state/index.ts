import { FILLER_DATA } from "@/components/reflections/constants"
import { Reflection } from "@/components/reflections/types"
import { observable } from "@legendapp/state"


export const $state = observable({
    thoughts: [] as Reflection[],
    draft: "",
    currentId: "",
})

$state.thoughts.set(FILLER_DATA)