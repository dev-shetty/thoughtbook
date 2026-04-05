import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv"

let _storage: ObservablePersistMMKV | null = null

const STORAGE_ID = "thoughtbook-storage"

export function initStorage(encryptionKey: string) {
    if (_storage) return _storage
    _storage = new ObservablePersistMMKV({
        id: STORAGE_ID,
        encryptionKey,
    })
    return _storage
}

export function getStorage() {
    if (!_storage) throw new Error("Storage not initialized — call initStorage first")
    return _storage
}