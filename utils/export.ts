import { Reflection } from "@/components/reflections/types"
import { $state } from "@/state"
import { File as ExpoFile, Paths } from "expo-file-system"

type FileWithBlob = ExpoFile & Blob
import * as Sharing from "expo-sharing"

import { decrypt, encrypt } from "./export-crypto"

interface ExportPayload {
    version: number
    exportedAt: string
    thoughtsById: Record<string, Reflection>
    thoughtIds: string[]
}

export async function exportThoughts(password: string): Promise<void> {
    const thoughtsById = $state.thoughtsById.peek()
    const thoughtIds = $state.thoughtIds.peek()

    const payload: ExportPayload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        thoughtsById,
        thoughtIds,
    }

    const encrypted = await encrypt(JSON.stringify(payload), password)

    const date = new Date().toISOString().slice(0, 10)
    const filename = `thoughtbook-export-${date}.thoughtbook`
    const file = new ExpoFile(Paths.cache, filename)

    file.create({ overwrite: true, intermediates: true })
    file.write(encrypted)

    await Sharing.shareAsync(file.uri, {
        mimeType: "application/octet-stream",
        UTI: "public.data",
    })
}

export interface ImportResult {
    imported: number
    skipped: number
}

export async function importThoughts(fileData: Uint8Array, password: string): Promise<ImportResult> {
    const json = await decrypt(fileData, password)
    const payload: ExportPayload = JSON.parse(json)

    const existingIds = new Set($state.thoughtIds.peek())
    let imported = 0
    let skipped = 0

    for (const id of payload.thoughtIds) {
        if (existingIds.has(id)) {
            skipped++
            continue
        }
        const thought = payload.thoughtsById[id]
        if (!thought) continue
        $state.thoughtsById[id].set(thought)
        $state.thoughtIds.push(id)
        imported++
    }

    if (imported > 0) {
        const ids = $state.thoughtIds.peek()
        $state.thoughtIds.set([...ids].sort((a, b) => Number(b) - Number(a)))
    }

    return { imported, skipped }
}

export async function pickAndReadFile(): Promise<Uint8Array> {
    const file = await ExpoFile.pickFileAsync()
    if (!file) throw new Error("cancelled")
    const picked = (Array.isArray(file) ? file[0] : file) as FileWithBlob
    const buffer = await picked.arrayBuffer()
    return new Uint8Array(buffer)
}

export { type DecryptError } from "./export-crypto"
