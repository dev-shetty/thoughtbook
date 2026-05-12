import { IconSymbol } from "@/components/ui/icon-symbol"
import { $state, deleteThought, toggleFavourite } from "@/state"
import {
  inkHexColor,
  swipeDeleteColor,
  swipeEditColor,
  swipeFavouriteColor,
} from "@/tamagui.config"
import { useSelector } from "@legendapp/state/react"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { useRef } from "react"
import { Alert, Pressable, StyleSheet } from "react-native"
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import Reanimated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated"

const ACTION_WIDTH = 72
const HANDLE_SWIPABLE_CLOSE_DELAY = 100
const RIGHT_THRESHOLD = 40
const FRICTION = 2
const RIGHT_ACTIONS_COUNT = 2

interface SwipeableRowProps {
  id: string
  onPress?: () => void
  children: React.ReactNode
}

function LeftActions(
  progress: SharedValue<number>,
  _dragX: SharedValue<number>,
  isFavourite: boolean,
) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }))

  return (
    <Reanimated.View style={[styles.leftAction, animatedStyle]}>
      <IconSymbol
        name={isFavourite ? "star.fill" : "star"}
        size={20}
        color={inkHexColor}
      />
    </Reanimated.View>
  )
}

function RightActions(
  progress: SharedValue<number>,
  _dragX: SharedValue<number>,
  onEdit: () => void,
  onDelete: () => void,
) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }))

  return (
    <Reanimated.View style={[styles.rightActions, animatedStyle]}>
      <Pressable
        style={[styles.actionButton, { backgroundColor: swipeEditColor }]}
        onPress={onEdit}
      >
        <IconSymbol name="pencil" size={20} color={inkHexColor} />
      </Pressable>
      <Pressable
        style={[styles.actionButton, { backgroundColor: swipeDeleteColor }]}
        onPress={onDelete}
      >
        <IconSymbol name="trash" size={20} color={inkHexColor} />
      </Pressable>
    </Reanimated.View>
  )
}

export function SwipeableRow({ id, onPress, children }: SwipeableRowProps) {
  const swipeableRef = useRef<SwipeableMethods>(null)
  const swiped = useRef(false)
  const router = useRouter()
  const isFavourite = useSelector(
    () => $state.thoughtsById[id].isFavourite.get() ?? false,
  )

  const handleEdit = () => {
    swipeableRef.current?.close()
    router.push(`/thought/${id}?edit=true`)
  }

  const handleDelete = () => {
    swipeableRef.current?.close()
    Alert.alert(
      "Delete Thought",
      "Are you sure you want to delete this thought?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteThought(id),
        },
      ],
    )
  }

  const handlePress = () => {
    if (swiped.current) {
      swiped.current = false
      return
    }
    onPress?.()
  }

  const handleSwipeableWillOpen = () => {
    swiped.current = true
  }

  const handleSwipeableOpen = (direction: "left" | "right") => {
    if (direction === "right") {
      toggleFavourite(id)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      swipeableRef.current?.close()
    }
  }

  const handleSwipeableClose = () => {
    setTimeout(() => {
      swiped.current = false
    }, HANDLE_SWIPABLE_CLOSE_DELAY)
  }

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderLeftActions={(progress, dragX) =>
        LeftActions(progress, dragX, isFavourite)
      }
      renderRightActions={(progress, dragX) =>
        RightActions(progress, dragX, handleEdit, handleDelete)
      }
      onSwipeableWillOpen={handleSwipeableWillOpen}
      onSwipeableOpen={handleSwipeableOpen}
      onSwipeableClose={handleSwipeableClose}
      leftThreshold={ACTION_WIDTH}
      rightThreshold={RIGHT_THRESHOLD}
      overshootLeft={false}
      friction={FRICTION}
    >
      <Pressable onPress={handlePress}>{children}</Pressable>
    </ReanimatedSwipeable>
  )
}

const styles = StyleSheet.create({
  leftAction: {
    backgroundColor: swipeFavouriteColor,
    justifyContent: "center",
    alignItems: "center",
    width: ACTION_WIDTH,
  },
  rightActions: {
    flexDirection: "row",
    width: ACTION_WIDTH * RIGHT_ACTIONS_COUNT,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: ACTION_WIDTH,
  },
})
