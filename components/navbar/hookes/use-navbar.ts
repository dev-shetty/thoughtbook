import { DEFAULT_NAVBAR_TITLE, NAVBAR_SHOW_BACK, NAVBAR_TITLES } from "@/components/navbar/constants"
import { usePathname, useRouter } from "expo-router"

export function useNavbar() {
    const router = useRouter()
    const pathname = usePathname()

    const showBackButton = NAVBAR_SHOW_BACK[pathname] ?? false
    const title = NAVBAR_TITLES[pathname] ?? DEFAULT_NAVBAR_TITLE

    const goBack = () => {
        if (router.canGoBack()) {
            router.back()
        } else {
            router.replace("/")
        }
    }

    return {
        showBackButton,
        title,
        goBack,
    }
}