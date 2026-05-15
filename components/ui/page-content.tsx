import { PAGE_TOP_PADDING } from "@/constants"
import { YStack, YStackProps } from "tamagui"


export function PageContent({ children, ...props }: YStackProps) {
    return (
        <YStack flex={1} paddingTop={PAGE_TOP_PADDING} {...props}>
            {children}
        </YStack>
    )
}
