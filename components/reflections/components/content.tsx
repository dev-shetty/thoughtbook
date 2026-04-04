import { Text } from "tamagui"

interface ContentProps {
  content: string
}

export function Content({ content }: ContentProps) {
  return (
    <Text fontFamily="$body" fontSize="$4" color="$color">
      {content}
    </Text>
  )
}
