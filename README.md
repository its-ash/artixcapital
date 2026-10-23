# Artix Capital website

Static website for [artixcapital.com](https://artixcapital.com). Built with Nuxt 4 and served from `docs/` on GitHub Pages.

## Stack

- Nuxt 4 (static generation, `app/` directory)
- Tailwind CSS v4 through `@tailwindcss/vite`
- GSAP 3 (ScrollTrigger, SplitText) and Lenis smooth scroll
- `@nuxt/fonts` for Geist and Geist Mono
- `@phosphor-icons/vue` for icons
- MQL5 widgets for live prices, charts and the economic calendar

## Requirements

- Node.js 24 (see `.nvmrc`)
- npm

## Commands

| Command | Action |
|---|---|
| `npm install` | Install the dependencies. |
| `make run` | Start the dev server. |
| `make build` | Generate the static site into `docs/` and add `.nojekyll`. |
| `make deploy` | Build, commit on `main` and push to `origin`. |

## Project structure

```
app/
  app.vue              Root layout and organization structured data
  pages/               One file for each route
  components/          Home page sections, nav and footer
  components/page/     Shared parts for subpages (PageHero, PageSection, PageFaqSection, ...)
  composables/         useMotion, usePageSeo, useJsonLd, useMarketFeed
  plugins/motion.ts    GSAP, Lenis and the v-reveal, v-magnetic, v-tilt, v-spot directives
  utils/site.ts        Company details, navigation, markets, accounts, FAQs and policies
  assets/css/main.css  Design tokens and shared styles
shared/routes.ts       Site URL and page slugs for the sitemap and prerender
server/routes/         sitemap.xml and robots.txt
public/                Logo, favicon, flags and social share image
docs/                  Build output for GitHub Pages (do not edit)
```

## Content

- Change company details, links, navigation and FAQs in `app/utils/site.ts`.
- Change legal text (risk statement, restricted regions) in `app/components/SiteFooter.vue`.
- To add a page:
  1. Add `app/pages/<slug>.vue`. Call `usePageSeo({ title, description })` at the top.
  2. Add the slug to `shared/routes.ts`.
  3. Add a link to `NAV` in `app/utils/site.ts`.

## SEO and analytics

- `usePageSeo` sets the title, description, canonical URL, Open Graph and Twitter tags for each page.
- Structured data: organization (all pages), breadcrumbs (subpages) and FAQ (pages with a FAQ section).
- Google Analytics tag `G-6K5MFRNFYS` loads from `nuxt.config.ts`.

## Conventions

- Run every animation through `useMotion(root, fn)`. Show the final state with no movement when `prefers-reduced-motion` is set.
- Do not hard-code the accent color. Use the `accent` utilities or `var(--color-accent)`.
- Label simulated prices as indicative.
- Do not add a GitHub Actions deploy workflow.

## License

Private. All rights reserved by Artix Capital Ltd.
