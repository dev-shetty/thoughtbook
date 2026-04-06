import { DEFAULT_NAVBAR_TITLE, NAVBAR_SHOW_BACK, NAVBAR_TITLES } from "@/components/navbar/constants"
import { usePathname, useRouter } from "expo-router"

// Normalizes dynamic paths (e.g. "/thought/12345") back to their route pattern
// (e.g. "/thought/[id]") so we can look up navbar config from static key maps.
function resolveRoute(pathname: string): string {
    if (pathname.startsWith("/thought/")) return "/thought/[id]"
    return pathname
}

export function useNavbar() {
    const router = useRouter()
    const pathname = usePathname()
    const routeKey = resolveRoute(pathname)

    const showBackButton = NAVBAR_SHOW_BACK[routeKey] ?? false
    const title = NAVBAR_TITLES[routeKey] ?? DEFAULT_NAVBAR_TITLE

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