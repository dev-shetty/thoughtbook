import { Tabs } from "expo-router"
import React from "react"

import { HapticTab } from "@/components/haptic-tab"
import { Navbar } from "@/components/navbar"
import { NewThoughtButton } from "@/components/new-thought/components/fab"
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
              title: "Feed",
              href: null,
            }}
          />
          <Tabs.Screen
            name="new"
            options={{
              title: "New Thought",
              href: null,
            }}
          />
        </Tabs>
      </YStack>
    </YStack>
  )
}
