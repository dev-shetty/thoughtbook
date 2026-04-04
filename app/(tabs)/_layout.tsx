import { Tabs } from "expo-router"
import React from "react"

import { HapticTab } from "@/components/haptic-tab"
import { Navbar } from "@/components/navbar"
import { NewThoughtButton } from "@/components/new-thought-btn"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { Colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { YStack } from "tamagui"

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <YStack flex={1} backgroundColor="$background">
      <Navbar />
      <NewThoughtButton />
      <YStack flex={1}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              display: "none",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
        </Tabs>
      </YStack>
    </YStack>
  )
}
