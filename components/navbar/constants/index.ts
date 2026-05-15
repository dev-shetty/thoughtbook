export const NAVBAR_TITLES: Record<string, string> = {
    "/": "Thoughtbook",
    "/new": "New Thought",
    "/thought/[id]": "Thought",
    "/favourites": "Favourites",
    "/calendar": "Calendar",
} as const;


export const NAVBAR_SHOW_BACK: Record<string, boolean> = {
    "/": false,
    "/new": true,
    "/thought/[id]": true,
    "/favourites": false,
    "/calendar": false,
} as const;

export const DEFAULT_NAVBAR_TITLE = "Thoughtbook";

export const NAVBAR_TOP_SPACING = 16
export const NAVBAR_BOTTOM_SPACING = 0