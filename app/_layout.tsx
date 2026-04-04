import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/use-color-scheme"
import _config from "@/tamagui.config"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createTamagui, TamaguiProvider } from "tamagui"

export const unstable_settings = {
  anchor: "(tabs)",
}

const config = createTamagui(_config)

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
