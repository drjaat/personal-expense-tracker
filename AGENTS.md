# AGENTS.md

## Stack

- Stack: `react-vite`. Versions are pinned in `package.json` — read it, don't assume.

## Navigation

- react-router-dom. Do not import react-native/expo/expo-router.

## Environment variables

- Any client-exposed env var must be prefixed `VITE_` — unprefixed vars are not available at runtime.

## Bundled fonts and assets

- Use DM Sans (sans), Playfair Display (serif), or JetBrains Mono (monospace).
- `index.html` loads them with a stylesheet link to `/appgenie/fonts/fonts.css`. This is a browser URL; CSS build imports resolve filesystem paths instead. The catalog imports six local face stylesheets under `public/appgenie/fonts/`. Each embeds WOFF2 bytes; no download is needed.
- Font stylesheets and `public/appgenie/fonts/LICENSE.txt` are platform assets. Trusted candidate preparation restores their bytes and the HTML link before verification.
- Use bundled paths or data URLs for images, video, fonts and stylesheets. The browser verifier has no public network access.

## Entry points

- `index.html`, `src/main.tsx`

## Package allowlist

- Only packages already in `package.json`, or on this stack's allowlist, may be added. Prefer what's already installed over adding a new dependency.

## Invariants — true of every app, non-negotiable

- Money is integer cents end to end. Format only at the display edge. Never `Math.round(x * 100) / 100`.
- Implement every screen and action the request implies. Do not reduce to a happy path. If you cut something, say so explicitly in your final message.

## When the plan and the workspace disagree

- The workspace wins. Use what is installed. Note the divergence in your final message; do not stop to ask — there is no human present to answer.

## Protected files

- Do not modify `tsconfig.json`, lint config, or `package.json` scripts. Do not silence type errors with `@ts-ignore`, `@ts-expect-error`, or `any` — fix the underlying type.