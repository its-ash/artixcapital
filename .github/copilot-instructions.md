# Artix Capital website

Static clone of artixcapital.com, built with Nuxt 4 and served from `docs/` on GitHub Pages.

## Stack
- Nuxt 4 (`app/` directory, no pages router, single page in `app/app.vue`)
- Tailwind CSS v4 through `@tailwindcss/vite`. Tokens are in `app/assets/css/main.css` under `@theme`.
- GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG, ScrambleText, MotionPath) and Lenis smooth scroll, set up in `app/plugins/motion.ts`
- `@nuxt/fonts` self-hosts Geist and Geist Mono
- Icons: `@phosphor-icons/vue` only

## Conventions
- Page content and links live in `app/utils/site.ts`. Change `SITE` there to switch absolute links to relative paths.
- Live prices and the economic calendar use MQL5 widgets through `Mql5Widget` (`ticker`, `overview`, `chart`, `calendar`). MQL5 symbol names have no slash (`XAUUSD`, `US500`, `USTEC`, `DE40`). Widgets sit in `.mql5-frame` / `.mql5-strip`, which match the widget dark theme (`--color-elevated` `#1a1d22`).
- The simulated feed (`app/composables/useMarketFeed.ts`) only drives the globe labels and platform illustration charts. Label it as indicative.
- The hero globe (`GlobeGrid locate`) shows the visitor's approximate location from `get.geojs.io`, cached in `sessionStorage`.
- Subpages use the shared parts in `app/components/page/` (`PageHero`, `PageSection`, `PageFeatures`, `PageSpecs`, `PageStats`, `PageTable`, `PageFaq`, `PageSteps`, `PageCta`).
- Every animation goes through `useMotion(root, fn)` so it uses `gsap.matchMedia` and reverts on unmount.
- Respect `prefers-reduced-motion`: the `reduce` branch must show final content with no movement.
- Directives: `v-reveal` (`lines` | `words` | `chars` | `fade`), `v-magnetic`, `v-tilt`.
- Brand: background `#0b0c0e`, accent `#d6141c` (text `#ff5a5f`, from the logo red), up `#3fd17a`, down `#ff5d64`. Containers 16px radius (`rounded-2xl`), buttons pill. No gradient text, no glass cards.
- Accent is user-selectable through `ThemePicker` (`app/utils/accent.ts`). It sets `--color-accent`, `--color-accent-soft` and `--color-on-accent` on `<html>`, saves to `localStorage` (`artix-accent`), and a head script in `nuxt.config.ts` applies it before paint. Never hard-code the accent: use `accent` utilities or `color-mix(in_oklab,var(--color-accent)_N%,transparent)`. Text on accent fills uses `text-on-accent`. Canvas code listens for the `accentchange` event.
- Deploys run through `.github/workflows/deploy.yml` (GitHub Pages, source "GitHub Actions").

## Commands
- `make run`: dev server
- `make build`: `nuxt generate`, output copied to `docs/` with `.nojekyll`
- `make deploy`: build, commit on `main`, push
