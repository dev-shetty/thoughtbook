import * as Crypto from "expo-crypto"
import { install } from "react-native-quick-crypto"

install()

const MAGIC = new Uint8Array([0x54, 0x48, 0x42, 0x4b]) // "THBK"
const FORMAT_VERSION = 0x01
const SALT_LEN = 32
const IV_LEN = 12
const HEADER_LEN = MAGIC.length + 1 + SALT_LEN + IV_LEN // 49 bytes

const PBKDF2_ITERATIONS = 600_000

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        // NFC-normalize so the same typed password produces the same bytes across platforms and keyboards
        encoder.encode(password.normalize("NFC")),
        "PBKDF2",
        false,
        ["deriveKey"],
    )
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", hash: "SHA-256", salt: salt.buffer as ArrayBuffer, iterations: PBKDF2_ITERATIONS },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"],
    )
}

export async function encrypt(plaintext: string, password: string): Promise<Uint8Array> {
    const salt = new Uint8Array(await Crypto.getRandomBytesAsync(SALT_LEN))
    const iv = new Uint8Array(await Crypto.getRandomBytesAsync(IV_LEN))
    const key = await deriveKey(password, salt)

    const encrypted = new Uint8Array(
        await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv.buffer as ArrayBuffer },
            key,
            new TextEncoder().encode(plaintext),
        ),
    )

    const result = new Uint8Array(HEADER_LEN + encrypted.length)
    result.set(MAGIC, 0)
    result[MAGIC.length] = FORMAT_VERSION
    result.set(salt, MAGIC.length + 1)
    result.set(iv, MAGIC.length + 1 + SALT_LEN)
    result.set(encrypted, HEADER_LEN)

    return result
}

export type DecryptError = "invalid_file" | "wrong_password" | "newer_version"

export function decrypt(
    data: Uint8Array,
    password: string,
): Promise<string> {
    if (data.length < HEADER_LEN) return Promise.reject("invalid_file" as DecryptError)

    for (let i = 0; i < MAGIC.length; i++) {
        if (data[i] !== MAGIC[i]) return Promise.reject("invalid_file" as DecryptError)
    }

    const version = data[MAGIC.length]
    if (version > FORMAT_VERSION) return Promise.reject("newer_version" as DecryptError)

    const salt = data.slice(MAGIC.length + 1, MAGIC.length + 1 + SALT_LEN)
    const iv = data.slice(MAGIC.length + 1 + SALT_LEN, HEADER_LEN)
    const ciphertext = data.slice(HEADER_LEN)

    return deriveKey(password, salt)
        .then((key) =>
            crypto.subtle.decrypt({ name: "AES-GCM", iv: iv.buffer as ArrayBuffer }, key, ciphertext),
        )
        .then((buf) => new TextDecoder().decode(buf))
        .catch(() => Promise.reject("wrong_password" as DecryptError))
}
