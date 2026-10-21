# Artix Capital website

Static clone of artixcapital.com, built with Nuxt 4 and served from `docs/` on GitHub Pages.

## Stack
- Nuxt 4 (`app/` directory, no pages router, single page in `app/app.vue`)
- Tailwind CSS v4 through `@tailwindcss/vite`. Tokens are in `app/assets/css/main.css` under `@theme`.
- GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG, ScrambleText, MotionPath) and Lenis smooth scroll, set up in `app/plugins/motion.ts`
- `@nuxt/fonts` self-hosts Space Grotesk and JetBrains Mono
- Icons: `@phosphor-icons/vue` only

## Conventions
- Page content and links live in `app/utils/site.ts`. Change `SITE` there to switch absolute links to relative paths.
- Market prices are a simulated feed (`app/composables/useMarketFeed.ts`). Label them as indicative.
- Every animation goes through `useMotion(root, fn)` so it uses `gsap.matchMedia` and reverts on unmount.
- Respect `prefers-reduced-motion`: the `reduce` branch must show final content with no movement.
- Directives: `v-reveal` (`lines` | `words` | `chars` | `fade`), `v-magnetic`, `v-tilt`.
- Brand: background `#0f0f15`, accent `#5184ff`, up `#3fd17a`, down `#ff5d64`. Cards 24px radius, buttons pill.
- Never add a GitHub Actions deploy workflow.

## Commands
- `make run`: dev server
- `make build`: `nuxt generate`, output copied to `docs/` with `.nojekyll`
- `make deploy`: build, commit on `main`, push
