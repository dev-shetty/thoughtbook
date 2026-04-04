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
import _config, { surfaceColor } from "@/tamagui.config"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createTamagui, TamaguiProvider } from "tamagui"

export const unstable_settings = {
  anchor: "(tabs)",
}

const config = createTamagui(_config)

/** Same base as Tamagui `surface` / `$background` so tab scenes and shell match. */
const navigationDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: surfaceColor,
  },
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

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
