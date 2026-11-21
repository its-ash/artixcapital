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
| `stand` | `mascot.webp` | `392 × 720` | Standalone hero / brand stance |
| `signup` | `mascot/signup.webp` | `314 × 457` | `StepsPath.vue` — Step 1 (Register / filling form) |
| `verify` | `mascot/verify.webp` | `313 × 459` | `StepsPath.vue` — Step 2 (Verify / KYC shield) |
| `trade` | `mascot/trade.webp` | `338 × 456` | `StepsPath.vue` — Step 3 (Trade / holographic chart) |
| `faq` | `mascot/faq.webp` | `344 × 449` | `FaqSection.vue` — FAQ support advisor |

## Wiring
- **Component**: `app/components/BearMascot.vue` (`pose?: 'stand' | 'signup' | 'verify' | 'trade' | 'faq'`)

## Prompt Template (New Poses)
```text
Stylized 3D commercial render of the Artix Capital polar bear mascot (matching ../mascots/final/artix-capital-mascot.jpg):
smooth matte snow-white fur, confident friendly expression, obsidian-black cyber-trimmed bomber jacket with glowing Crimson Red (#d6141c) piping and brushed silver/chrome cuffs and waist trim, dark carbon-hex sci-fi inner shirt featuring the exact Artix "X" logo (white diagonal slash with crimson-red and silver faceted triangles) centered on the chest, matte black pants, dark sneakers.
Pose: <DESCRIBE POSE AND CRIMSON/SILVER HOLOGRAPHIC PROP>.
Background: solid flat pure black (#0b0c0e) with soft crimson rim lighting, no text captions, no borders, generous margin for transparent cutout.
```
