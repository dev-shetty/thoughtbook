import { PasswordModal } from "@/components/export/password-modal"
import {
  SettingsAction,
  SettingsSection,
} from "@/components/settings/section"
import { PageContent } from "@/components/ui/page-content"
import { exportThoughts, importThoughts, pickAndReadFile } from "@/utils/export"
import { DecryptError } from "@/utils/export-crypto"
import { useRef, useState } from "react"
import { Alert } from "react-native"
import { YStack } from "tamagui"

const ERROR_MESSAGES: Record<string, string> = {
  invalid_file: "This doesn't look like a Thoughtbook file.",
  wrong_password: "Incorrect password. Please try again.",
  newer_version: "This file was created by a newer version of Thoughtbook.",
}

export type ModalMode = "export" | "import" | null

export default function SettingsScreen() {
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const pendingFileData = useRef<Uint8Array | null>(null)

  const lastMode = useRef<Exclude<ModalMode, null>>("export")
  if (modalMode) lastMode.current = modalMode

  async function handleExport(password: string) {
    setLoading(true)
    setError(undefined)
    try {
      await exportThoughts(password)
      setModalMode(null)
    } catch (e) {
      console.error("Export failed:", e)
      setError("Couldn't export your thoughts. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function startImport() {
    try {
      const data = await pickAndReadFile()
      if (!data) return
      pendingFileData.current = data
      setError(undefined)
      setModalMode("import")
    } catch {
      // user cancelled the picker
    }
  }

  async function handleImport(password: string) {
    if (!pendingFileData.current) return
    setLoading(true)
    setError(undefined)
    try {
      const result = await importThoughts(pendingFileData.current, password)
      pendingFileData.current = null
      setModalMode(null)
      const importedText = `Imported ${result.imported} thought${result.imported === 1 ? "" : "s"}`
      const skippedText =
        result.skipped > 0 ? ` (${result.skipped} skipped as duplicates)` : ""
      Alert.alert("Import complete", importedText + skippedText)
    } catch (e) {
      const code = e as DecryptError
      if (
        code === "invalid_file" ||
        code === "wrong_password" ||
        code === "newer_version"
      ) {
        setError(ERROR_MESSAGES[code])
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContent>
      <YStack padding="$6" gap="$7">
        <SettingsSection title="Backup">
          <SettingsAction
            label="Export Thoughts"
            description="Save an encrypted backup file."
            variant="primary"
            onPress={() => {
              setError(undefined)
              setModalMode("export")
            }}
          />
          <SettingsAction
            label="Import Thoughts"
            description="Restore from a backup file. Duplicates are skipped."
            onPress={startImport}
          />
        </SettingsSection>
      </YStack>

      <PasswordModal
        visible={modalMode !== null}
        mode={modalMode ?? lastMode.current}
        loading={loading}
        onSubmit={modalMode === "export" ? handleExport : handleImport}
        onCancel={() => {
          setModalMode(null)
          setError(undefined)
          pendingFileData.current = null
        }}
        error={error}
      />
    </PageContent>
  )
}
