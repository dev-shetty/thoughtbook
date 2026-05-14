import { Tabs } from "expo-router"
import React from "react"

import { HapticTab } from "@/components/haptic-tab"
import { Navbar } from "@/components/navbar"
import { NewThoughtButton } from "@/components/new-thought/components/fab"
import { TabIcon } from "@/components/ui/tab-icon"
import { inactiveHexColor, inkHexColor, outlineVariantColor, surfaceColor } from "@/tamagui.config"
import { YStack } from "tamagui"

export default function TabLayout() {
  return (
    <YStack flex={1} backgroundColor="$background">
      <Navbar />
      <NewThoughtButton />
      <YStack flex={1}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarShowLabel: false,
            tabBarActiveTintColor: inkHexColor,
            tabBarInactiveTintColor: inactiveHexColor,
            tabBarStyle: {
              backgroundColor: surfaceColor,
              borderTopColor: outlineVariantColor,
              borderTopWidth: 0.5,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Feed",
              tabBarIcon: ({ focused }) => (
                <TabIcon name="house" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="favourites"
            options={{
              title: "Favourites",
              tabBarIcon: ({ focused }) => (
                <TabIcon name="star" focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="calendar"
            options={{
              title: "Calendar",
              tabBarIcon: ({ focused }) => (
                <TabIcon name="calendar" focused={focused} />
              ),
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
