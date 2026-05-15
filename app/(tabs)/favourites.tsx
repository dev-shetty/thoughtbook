import { Reflection } from "@/components/reflections/reflection"
import { $state } from "@/state"
import { useSelector } from "@legendapp/state/react"
import { PageContent } from "@/components/ui/page-content"
import { ScrollView, Text, YStack } from "tamagui"

export default function FavouritesScreen() {
  const favouriteIds = useSelector(() =>
    $state.thoughtIds
      .get()
      .filter((id) => $state.thoughtsById[id].isFavourite.get() === true),
  )

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      flex={1}
      backgroundColor="$background"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "transparent" }}
    >
      <PageContent
        backgroundColor="$background"
        paddingBottom="$8"
        gap="$2"
      >
        {favouriteIds.length === 0 ? (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$2">
            <Text color="$colorSecondary" fontSize="$5" fontFamily="$body">
              No favourites yet
            </Text>
            <Text color="$colorMuted" fontSize="$4" fontFamily="$body">
              Swipe left on a thought to mark it as favourite
            </Text>
          </YStack>
        ) : (
          favouriteIds.map((id) => <Reflection key={id} id={id} />)
        )}
      </PageContent>
    </ScrollView>
  )
}
