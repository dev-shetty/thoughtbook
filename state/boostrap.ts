import { getOrCreateEncryptionKey } from "./encryption"
import { initStateSync } from "./index"
import { initStorage } from "./persist"

let _promise: Promise<void> | null = null
export function bootstrap(): Promise<void> {
    if (!_promise) {
        _promise = (async () => {
            const key = await getOrCreateEncryptionKey()
            initStorage(key)
            initStateSync()
        })()
    }
    return _promise
}