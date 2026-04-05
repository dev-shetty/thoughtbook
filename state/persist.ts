import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv"

export const storage = new ObservablePersistMMKV({ id: "thoughtbook-storage" })