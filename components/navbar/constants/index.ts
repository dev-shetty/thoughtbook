export const NAVBAR_TITLES: Record<string, string> = {
    "/": "Thoughtbook",
    "/new": "New Thought",
} as const;


export const NAVBAR_SHOW_BACK: Record<string, boolean> = {
    "/": false,
    "/new": true,
} as const;