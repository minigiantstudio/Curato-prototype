# Curato — MVP mobile prototype

An Expo (React Native) implementation of the Curato clickable prototype
handed off from Claude Design (`project/Curato Prototype.dc.html`, plus the
`project/uploads/curato-handoff/` design-system bundle).

## Run it

```
npm install
npm run web      # browser preview, phone-framed
npm run ios      # iOS simulator (macOS only)
npm run android
```

## What's implemented

Home, and all four flows wired exactly as specified in `chats/chat1.md`:
Capture (Upload → Reading → The Why → Kept), Compare (Upload → Comparing →
Result → Saved), Brand Check (Upload → brand-picker sheet → Analyzing →
Verdict), Review (Card → Confirmed, cycling 3 sample principles). Account
sheet and bottom tab bar included. State machine lives in
`src/state/AppState.tsx` and mirrors the `.dc.html` prototype's screen
transitions (including the ~1.8s auto-transitions and the ◈ particle-fly
before Keep/Save).

## Fonts

The source design specifies **Reckless Neue Light** (display) and
**General Sans** (body) — both commercial, no public CDN. This build uses
the documented fallbacks instead:

| Role | Spec'd | Used here |
|---|---|---|
| Display | Reckless Neue Light | Newsreader 300 (Google Fonts) |
| Body | General Sans | Manrope 500 (Google Fonts, closest free match — General Sans isn't on Google Fonts at all) |
| Mono | JetBrains Mono | JetBrains Mono (exact match) |

To swap in the licensed fonts:

1. Add the `.woff2`/`.ttf` files under `assets/fonts/`.
2. In `src/theme/fonts.ts`, replace the `useFonts({...})` call with
   `Font.loadAsync` pointing at the local files, and update the
   `fontFamily` map's `display`/`displayItalic` (and `body`/`bodySemiBold`
   if you also license General Sans) values to the new family names.

No other file references font names directly — everything goes through
`src/theme/Type.tsx` and `src/theme/fonts.ts`.

## Design reference

`project/uploads/curato-handoff/DESIGN_SYSTEM.md` is ground truth for
color/type/shape tokens (mirrored in `src/theme/colors.ts`). The `.dc.html`
files under `project/` are the source prototype this app reimplements.
