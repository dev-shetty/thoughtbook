export const NAVBAR_TITLES: Record<string, string> = {
    "/": "Thoughtbook",
    "/new": "New Thought",
} as const;


export const NAVBAR_SHOW_BACK: Record<string, boolean> = {
    "/": false,
    "/new": true,
} as const;

export const DEFAULT_NAVBAR_TITLE = "Thoughtbook";

export const NAVBAR_TOP_SPACING = 8
export const NAVBAR_BOTTOM_SPACING = 16 // $4 as per the design system