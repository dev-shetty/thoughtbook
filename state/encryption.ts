import * as Crypto from "expo-crypto"
import * as SecureStore from "expo-secure-store"

const KEY_NAME = "thoughtbook-mmkv-key"

export async function getOrCreateEncryptionKey(): Promise<string> {
    const existing = await SecureStore.getItemAsync(KEY_NAME, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
    })
    if (existing) return existing

    const bytes = await Crypto.getRandomBytesAsync(32)
    // base64 via btoa-safe path
    let bin = ""
    bytes.forEach((b) => (bin += String.fromCharCode(b)))
    const key = global.btoa ? global.btoa(bin) : Buffer.from(bytes).toString("base64")

    await SecureStore.setItemAsync(KEY_NAME, key, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
    })
    return key
}