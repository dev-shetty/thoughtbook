# Thoughtbook

A private, encrypted journal for your thoughts.

## Why

Tackling a personal problem, Notion is an overkill for recording an instant, Twitter (or X Now) is distracting and public, Notes app can get cluttered easily, you cant carry a physical book everywhere, basically needed a middle ground for me to write down my thoughts on the fly, or on the go.

<details>
  <summary>If you want a more formal why</summary>

Most thoughts never make it out of your head. You either don't have someone to tell, or you're not comfortable sharing publicly. Over time, these pile up - ideas fade, frustrations linger, and experiences go unrecorded.

Writing is one of the simplest ways to process what's on your mind. Thoughtbook gives you a space to do that without worrying about who's reading.

</details>

<br />

Your thoughts are too precious to be lost in the void.

## What it does

Thoughtbook is a privacy-first journaling app where you are the only person who can read your entries. Everything is local :)

- **End-to-end encrypted** — All data is encrypted locally on your device before it's ever persisted. Encryption keys are generated per-device and stored in the OS secure keychain (via `expo-secure-store`). The storage layer (MMKV) is encrypted at rest.
- **Minimal by design** — Open the app, write a thought, done. No accounts, no social features, no feeds.
- **Offline-first** — Everything runs and persists locally. No network calls required.

## How the encryption works

1. On first launch, a 256-bit random key is generated using `expo-crypto`.
2. That key is stored in the device's secure keychain (`expo-secure-store`), accessible only when the device is unlocked.
3. All thought data is persisted to MMKV storage using that key for encryption at rest.
4. No plaintext ever leaves the device.

For extra security, you can also use native Biometric authentication to unlock the app. Most phones provide application lock out of the box.

## Planned

- Categorize entries (travel ideas, bucket lists, wishlists) to find them later.
- Semantic search across entries (local, on-device)
- AI-assisted reflection — surface patterns, summarize periods, answer questions about your own journal
- Self-hosting support — bring your own backend, own your data completely
- Cross-device sync with E2EE

## Tech stack

- React Native (Expo SDK 54)
- Expo Router for navigation
- Tamagui for UI
- Legend State for state management + persistence
- MMKV for encrypted local storage
- expo-crypto / expo-secure-store for key management

## Getting started

```bash
# Install dependencies
pnpm install

# Run on iOS
pnpm ios

# Run on Android
pnpm android
```

## License

AGPLv3 — see [LICENSE](./LICENSE) for details.
