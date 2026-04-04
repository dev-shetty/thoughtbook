import { createFont, createTamagui, createTokens } from "@tamagui/core";
import { shorthands } from "@tamagui/shorthands";

// ─── Typography ────────────────────────────────────────────────────────────────
const newsreaderFont = createFont({
    family: "Newsreader",
    size: {
        1: 11,
        2: 13,
        3: 15,
        4: 17,
        5: 20,
        6: 24,
        7: 32,
    },
    lineHeight: {
        1: 16,
        2: 18,
        3: 22,
        4: 26,
        5: 30,
        6: 36,
        7: 44,
    },
    weight: {
        4: "400",
        8: "800",
    },
    letterSpacing: {
        4: 0,
        5: -0.3,
        6: -0.5,
    },
});

const interFont = createFont({
    family: "Inter",
    size: {
        1: 11,   // label-sm  → tags, encrypted label
        2: 13,   // label-md  → timestamps, meta
        3: 15,   // body-sm
        4: 17,   // body-lg   → the journaling text (primary writing size)
        5: 20,
        6: 24,
    },
    lineHeight: {
        1: 16,
        2: 18,
        3: 22,
        4: 28,
        5: 32,
        6: 38,
    },
    weight: {
        4: "400",
    },
    letterSpacing: {
        1: 0.2,
        2: 0.1,
        4: 0,
    },
});

// ─── Color Tokens ──────────────────────────────────────────────────────────────

export const surfaceColor = "hsla(30, 11%, 6%, 1)"

const tokens = createTokens({
    color: {
        // ── Surfaces (stacked paper sheets) ──────────────────────────────────────
        // "The desk on which the notebook sits"
        surface: surfaceColor,
        // Slightly lifted — "between desk and page"
        surfaceContainerLow: "hsla(32, 12%, 8%, 1)",
        // "The active writing area / the page"
        surfaceContainer: "hsla(32, 13%, 10%, 1)",
        // Raised card — natural soft lift
        surfaceContainerHigh: "hsla(32, 13%, 13%, 1)",
        // Topmost layer — tags, chips, focused elements
        surfaceContainerHighest: "hsla(30, 14%, 15%, 1)",
        // "Spotlight on a specific part of the page"
        surfaceBright: "hsla(29, 17%, 17%, 1)",

        // ── Primary (the warm parchment) ─────────────────────────────────────────
        // Main text color — warm off-white, never pure white
        primary: "hsla(37, 38%, 88%, 1)",
        primaryFixed: "hsla(37, 33%, 89%, 1)",
        // Button backgrounds
        primaryContainer: "hsla(36, 8%, 27%, 1)",
        onPrimaryContainer: "hsla(34, 18%, 83%, 1)",

        // ── On-Surface (text hierarchy without bold) ──────────────────────────────
        // Full-presence text — headings, entry body
        onSurface: "hsla(37, 38%, 88%, 1)",
        // Supporting text — second read
        onSurfaceVariant: "hsla(34, 13%, 67%, 1)",
        // Ghost text — timestamps, meta, encrypted label
        onTertiaryFixedVariant: "hsla(32, 6%, 41%, 1)",

        // ── Outline ───────────────────────────────────────────────────────────────
        // The "ghost border" — only used at 15% opacity, never as a solid line
        outlineVariant: "hsla(32, 8%, 28%, 1)",

        // ── Error (the only loud color) ───────────────────────────────────────────
        error: "hsla(13, 81%, 66%, 1)",

        // ── Named aliases (easier to read in components) ─────────────────────────
        base: "hsla(30, 11%, 6%, 1)",
        page: "hsla(32, 13%, 10%, 1)",
        muted: "hsla(32, 6%, 41%, 1)",
        subtle: "hsla(34, 13%, 67%, 1)",
        ink: "hsla(37, 38%, 88%, 1)",
        tag: "hsla(30, 14%, 15%, 1)",
        tagText: "hsla(34, 13%, 67%, 1)",
        accent: "hsla(37, 33%, 89%, 1)",
        danger: "hsla(13, 81%, 66%, 1)",
    },

    space: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        7: 32,
        8: 40,    // minimum entry separation
        9: 64,    // maximum entry separation
        10: 80,
        true: 16,
    },

    size: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        7: 32,
        8: 40,
        9: 48,
        10: 64,
        true: 40,
    },

    radius: {
        0: 0,
        1: 2,    // tags/chips only
        2: 4,    // subtle rounding for interactive states
        true: 0, // default: no rounding
    },

    zIndex: {
        0: 0,
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500,
    },
});

// ─── Theme ─────────────────────────────────────────────────────────────────────
// Single dark theme — "dark mode only, the Nocturnal Manuscript"


const nocturneTheme = {
    background: tokens.color.surface,
    backgroundStrong: tokens.color.surfaceContainerHighest,
    backgroundSoft: tokens.color.surfaceContainerLow,

    color: tokens.color.onSurface,
    colorSecondary: tokens.color.onSurfaceVariant,
    colorMuted: tokens.color.onTertiaryFixedVariant,

    placeholderColor: tokens.color.muted,

    borderColor: "transparent",  // no borders by default
    borderColorHover: tokens.color.outlineVariant + "26", // 15% opacity ghost

    shadowColor: tokens.color.onSurface,
    shadowOpacity: 0.04,   // "soft velvet" ambient glow

    // Component-specific
    buttonBackground: tokens.color.primaryContainer,
    buttonColor: tokens.color.onPrimaryContainer,
    inputBackground: tokens.color.surfaceContainer,
    tagBackground: tokens.color.surfaceContainerHighest,
    tagColor: tokens.color.onSurfaceVariant,
};

// ─── Tamagui Config ────────────────────────────────────────────────────────────

const config = createTamagui({
    tokens,
    themes: {
        dark: nocturneTheme,
        // No light theme — this app is dark only
    },
    fonts: {
        heading: newsreaderFont,   // dates, app name
        body: interFont,           // journal text, labels
    },
    shorthands,
    settings: {
        allowedStyleValues: "somewhat-strict",
        autocompleteSpecificTokens: true,
    },
    media: {
        xs: { maxWidth: 660 },
        sm: { maxWidth: 800 },
        md: { maxWidth: 1020 },
    },
});

export type AppConfig = typeof config;

declare module "@tamagui/core" {
    interface TamaguiCustomConfig extends AppConfig { }
}

export default config;
