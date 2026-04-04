import { Tabs } from "expo-router"
import React from "react"

import { HapticTab } from "@/components/haptic-tab"
import { Navbar } from "@/components/navbar"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { Colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { YStack } from "tamagui"

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <YStack flex={1} backgroundColor="$background">
      <Navbar />
      <YStack flex={1}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
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
