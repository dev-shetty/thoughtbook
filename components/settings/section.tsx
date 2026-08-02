import { ReactNode } from "react"
import { Pressable } from "react-native"
import { SizableText, YStack } from "tamagui"

interface SettingsSectionProps {
  title: string
  children: ReactNode
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <YStack gap="$3">
      <SizableText
        fontSize="$1"
        color="$muted"
        fontWeight="600"
        letterSpacing={0.8}
        textTransform="uppercase"
      >
        {title}
      </SizableText>
      <YStack gap="$4">{children}</YStack>
    </YStack>
  )
}

interface SettingsActionProps {
  label: string
  description: string
  variant?: "primary" | "secondary"
  onPress: () => void
}

export function SettingsAction({
  label,
  description,
  variant = "secondary",
  onPress,
}: SettingsActionProps) {
  const isPrimary = variant === "primary"

  return (
    <YStack gap="$2">
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <YStack
            backgroundColor={isPrimary ? "$primaryContainer" : "transparent"}
            borderWidth={isPrimary ? 0 : 1}
            borderColor="$outlineVariant"
            opacity={pressed ? 0.65 : 1}
            paddingVertical="$3"
            alignItems="center"
            borderRadius="$1"
          >
            <SizableText
              fontSize="$3"
              color={isPrimary ? "$onPrimaryContainer" : "$ink"}
            >
              {label}
            </SizableText>
          </YStack>
        )}
      </Pressable>
      <SizableText fontSize="$2" color="$onSurfaceVariant" numberOfLines={1}>
        {description}
      </SizableText>
    </YStack>
  )
}
