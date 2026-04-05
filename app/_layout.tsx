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
import { $state } from "@/state"
import _config, { surfaceColor } from "@/tamagui.config"
import { syncState } from "@legendapp/state"
import { use$ } from "@legendapp/state/react"
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
  const isPersistLoaded = use$(syncState($state).isPersistLoaded)

  if (!isPersistLoaded) return null

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
