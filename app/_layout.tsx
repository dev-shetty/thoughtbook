import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  type Theme,
} from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/use-color-scheme"
import { bootstrap } from "@/state/boostrap"
import _config, { surfaceColor } from "@/tamagui.config"
import { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createTamagui, TamaguiProvider } from "tamagui"

export const unstable_settings = {
  anchor: "(tabs)",
}

const config = createTamagui(_config)

const navigationDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: surfaceColor,
  },
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    bootstrap()
      .then(() => setReady(true))
      .catch(setError)
  }, [])

  if (error || !ready) return null

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? navigationDarkTheme : DefaultTheme}
    >
      <TamaguiProvider config={config} defaultTheme="dark">
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </TamaguiProvider>
    </ThemeProvider>
  )
}
