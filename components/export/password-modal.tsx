import { useState } from "react"
import { Modal, Pressable } from "react-native"
import { Input, SizableText, XStack, YStack } from "tamagui"

interface PasswordModalProps {
  visible: boolean
  mode: "export" | "import"
  loading: boolean
  onSubmit: (password: string) => void
  onCancel: () => void
  error?: string
}

export function PasswordModal({
  visible,
  mode,
  loading,
  onSubmit,
  onCancel,
  error,
}: PasswordModalProps) {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  // Clear the old fields when the modal opens
  const [wasVisible, setWasVisible] = useState(visible)
  if (visible !== wasVisible) {
    setWasVisible(visible)
    if (visible) {
      setPassword("")
      setConfirm("")
    }
  }

  const isExport = mode === "export"
  const mismatch =
    isExport &&
    password.length > 0 &&
    confirm.length > 0 &&
    password !== confirm
  const tooShort = isExport && password.length > 0 && password.length < 8
  const canSubmit =
    password.length >= 8 && (!isExport || password === confirm) && !loading

  function handleSubmit() {
    if (canSubmit) onSubmit(password)
  }

  function handleCancel() {
    setPassword("")
    setConfirm("")
    onCancel()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0,0,0,0.7)"
        padding="$7"
      >
        <YStack
          backgroundColor="$surfaceContainerHigh"
          borderRadius="$2"
          padding="$6"
          gap="$4"
          width="100%"
          maxWidth={400}
        >
          <SizableText fontFamily="$heading" fontSize="$5" color="$ink">
            {isExport ? "Set a password" : "Enter password"}
          </SizableText>

          <SizableText fontSize="$2" color="$onSurfaceVariant">
            {isExport
              ? "This password encrypts your export. You'll need it to import on another device."
              : "Enter the password you used when exporting."}
          </SizableText>

          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            backgroundColor="$surfaceContainer"
            color="$ink"
            placeholderTextColor="$muted"
            borderColor="$outlineVariant"
            borderWidth={0.5}
            fontSize={15}
            autoFocus
          />

          {isExport && (
            <Input
              placeholder="Confirm password"
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
              backgroundColor="$surfaceContainer"
              color="$ink"
              placeholderTextColor="$muted"
              borderColor="$outlineVariant"
              borderWidth={0.5}
              fontSize={15}
            />
          )}

          {tooShort && (
            <SizableText fontSize="$1" color="$error">
              Password must be at least 8 characters
            </SizableText>
          )}

          {mismatch && (
            <SizableText fontSize="$1" color="$error">
              Passwords don't match
            </SizableText>
          )}

          {error && (
            <SizableText fontSize="$1" color="$error">
              {error}
            </SizableText>
          )}

          <XStack
            gap="$2"
            justifyContent="flex-end"
            alignItems="center"
            marginTop="$2"
          >
            <Pressable onPress={handleCancel} disabled={loading}>
              <YStack
                height={40}
                paddingHorizontal="$4"
                justifyContent="center"
                alignItems="center"
                borderRadius="$2"
              >
                <SizableText fontSize="$3" color="$onSurfaceVariant">
                  Cancel
                </SizableText>
              </YStack>
            </Pressable>
            <Pressable onPress={handleSubmit} disabled={!canSubmit}>
              <YStack
                height={40}
                backgroundColor="$primary"
                paddingHorizontal="$5"
                justifyContent="center"
                alignItems="center"
                borderRadius="$2"
                opacity={canSubmit ? 1 : 0.4}
              >
                <SizableText fontSize="$3" color="$base">
                  {loading ? "Encrypting..." : isExport ? "Export" : "Import"}
                </SizableText>
              </YStack>
            </Pressable>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  )
}
