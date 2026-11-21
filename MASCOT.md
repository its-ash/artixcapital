# Artix Capital — Mascot Specification

Canonical brand mascot specification for **Artix Capital** (`artixcapital.com`), part of the **Artix Group**. Use this file as the single source of truth when generating new poses, scenes, or marketing visuals.

## Character Identity
- **Species**: Stylized 3D polar bear (Arctic / Artix motif).
- **Art Style**: Commercial 3D collectible / Pixar-grade clean vinyl-matte render. Smooth matte snow-white fur, sharp friendly-confident expression, dark expressive eyes, rounded ears, black nose, sturdy athletic proportions.
- **Group Consistency**: Shares the exact base character model, face, and cyber-jacket silhouette with **Artix Prop** and **Artix Global**. Only the accent palette, chest `X` emblem colors, and holographic props change per firm.

## Color Palette
| Role | Hex | Usage |
| :--- | :--- | :--- |
| Canvas / Background | `#0b0c0e` | Pure matte obsidian studio stage for cutouts |
| Outfit Base | `#0b0c0e` / `#15171b` | Matte obsidian jacket, carbon-hex shirt, tailored pants, dark sneakers |
| Primary Accent | `#d6141c` | Glowing crimson-red cyber-jacket piping, holographic UI props, rim light |
| Secondary Accent | `#c4c6cc` / `#9a9ca3` | Brushed steel/silver cuff bands, pocket trim, hem accents |

## Outfit & Emblem
- **Jacket**: Open obsidian-black futuristic cyber-bomber jacket with glowing **Crimson Red (`#d6141c`)** geometric seam piping, structured collar, and **brushed silver/chrome** cuff and waist hardware.
- **Inner Shirt**: Fitted dark matte carbon-hex sci-fi tech-shirt with subtle crimson base accents.
- **Chest Logo**: Exact **Artix `X`** mark centered on the shirt chest:
  - Bold white diagonal slash (`\`, top-left to bottom-right)
  - Faceted origami downward triangle (top-right) in Crimson Red (`#d6141c`)
  - Faceted origami upward triangle (bottom-left) in Crimson Red & Brushed Silver
- **Lower Body**: Fitted matte obsidian-black pants and sleek dark sneakers.

## Existing Poses (`public/images/`)
| Pose | File | Dimensions | Usage |
| :--- | :--- | :--- | :--- |
| `stand` | `mascot.webp` | `522 × 972` | Standalone hero / brand stance |
| `signup` | `mascot/signup.webp` | `634 × 903` | `StepsPath.vue` — Step 1 (Register / filling form) |
| `verify` | `mascot/verify.webp` | `625 × 907` | `StepsPath.vue` — Step 2 (Verify / KYC shield) |
| `trade` | `mascot/trade.webp` | `687 × 900` | `StepsPath.vue` — Step 3 (Trade / holographic chart) |
| `faq` | `mascot/faq.webp` | `705 × 886` | `FaqSection.vue` — FAQ support advisor |
| `forex` | `mascot/forex.webp` | `730 × 906` | `forex-trading.vue` |
| `commodities` | `mascot/commodities.webp` | `662 × 906` | `commodities-trading.vue` |
| `stocks` | `mascot/stocks.webp` | `683 × 901` | `stocks-trading.vue` |
| `indices` | `mascot/indices.webp` | `763 × 887` | `indices-trading.vue` |
| `crypto` | `mascot/crypto.webp` | `726 × 911` | `crypto-trading.vue` |
| `futures` | `mascot/futures.webp` | `738 × 906` | `futures-trading.vue` |
| `core` | `mascot/core.webp` | `697 × 902` | `artix-core.vue` |
| `edge` | `mascot/edge.webp` | `647 × 895` | `artix-edge.vue` |
| `elite` | `mascot/elite.webp` | `705 × 909` | `artix-elite.vue` |
| `coverage` | `mascot/coverage.webp` | `619 × 908` | `artix-coverage-account.vue` |
| `demo` | `mascot/demo.webp` | `672 × 899` | `artix-demo-account.vue` |
| `ib` | `mascot/ib.webp` | `743 × 886` | `introducing-broker.vue` |
| `whitelabel` | `mascot/whitelabel.webp` | `691 × 938` | `white-label-solution.vue` |
| `ntrader-desktop` | `mascot/ntrader-desktop.webp` | `690 × 905` | `ntrader-for-windows.vue` |
| `ntrader-mobile` | `mascot/ntrader-mobile.webp` | `665 × 897` | `ntrader-for-mobile.vue` |
| `mt5-desktop` | `mascot/mt5-desktop.webp` | `751 × 886` | `meta-trader-5.vue` |
| `mt5-mobile` | `mascot/mt5-mobile.webp` | `666 × 884` | `meta-trader-5-mobile.vue` |
| `calendar` | `mascot/calendar.webp` | `759 × 913` | `economic-calendar.vue` |
| `spreads` | `mascot/spreads.webp` | `673 × 902` | `spread-table.vue` |
| `expiry` | `mascot/expiry.webp` | `775 × 890` | `expiry-dates-of-futures-contracts.vue` |
| `about` | `mascot/about.webp` | `586 × 903` | `about.vue` |
| `contact` | `mascot/contact.webp` | `728 × 924` | `contact-us.vue` |
| `promotion` | `mascot/promotion.webp` | `598 × 904` | `promotion/index.vue`, `promotion/[id].vue` |
| `pdf` | `mascot/pdf.webp` | `702 × 891` | `generate-pdf.vue` |

## Wiring
- **Component**: `app/components/BearMascot.vue` (`pose?: CapitalMascotPose`)
- **Subpage Hero**: `app/components/page/Hero.vue` (`mascot?: CapitalMascotPose`)

## Prompt Template (New Poses)
```text
Stylized 3D commercial render of the Artix Capital polar bear mascot (matching ../mascots/final/artix-capital-mascot.jpg):
smooth matte snow-white fur, confident friendly expression, obsidian-black cyber-trimmed bomber jacket with glowing Crimson Red (#d6141c) piping and brushed silver/chrome cuffs and waist trim, dark carbon-hex sci-fi inner shirt featuring the exact Artix "X" logo (white diagonal slash with crimson-red and silver faceted triangles) centered on the chest, matte black pants, dark sneakers.
Pose: <DESCRIBE POSE AND CRIMSON/SILVER HOLOGRAPHIC PROP>.
Background: solid flat pure black (#0b0c0e) with soft crimson rim lighting, no text captions, no borders, generous margin for transparent cutout.
```
